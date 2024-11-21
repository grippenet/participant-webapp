
import { studyAPI } from '@influenzanet/case-web-app-core/';
import { Report } from '@influenzanet/case-web-app-core/build/api/types/studyAPI';
import { Badge } from 'react-bootstrap';
import { BadgesDefinition } from '../config/BadgesDefinition';
import { UserBadgesConfig } from '../UsersBadges';

const typeBadgeReportCode = "badge";

type ReportRequestParameters = Parameters<typeof studyAPI.getReportsForUser>;

export interface Badge {
    keyFlag: string;
    code: string;
    gained: boolean;
    imgUrl: string;
    isNew: boolean;
}

/**
 * @type {Record<profile_id: string, Badge[]>}
 */
export type ProfilesBadges = Record<string, Badge[]>

export interface ResultProfilesBadges {
    all: ProfilesBadges;
    news: ProfilesBadges;
    hasNewBadges: boolean;
}

// type of elements of the Report.data array # PICK<Report, "data">
type RawBadgeData = {
    key: string;
    value: string;
    dtype?: string;
}


export class UserBadgesReportReader {

    studyId: string;

    /**
     * used to limit getReportsForUser() to fetch only the reports newer than the ones already fetched, when it is not a the first fetch 
     */
    lastReportDate: number | undefined; 

    /**
     * the first getReportsForUser() fetches all the badge report, the subsequents fetches only badges that could have been gained newly
     */
    isFirstFetch: boolean = true;

    /**
     * will be set to true when any reports fetching except the first one, will have got a least one result.
     */
    hasNewBadges = false; 
    
    /**
     * the seasonal badges are considered only if they are newer than the beginning of the current season
     */
    startSeasonDate: number;

    badgesRootUrl: string;

    // todo?: could be stored in localstore instead of property ? (it would allow the badges to not be fetched again when the
    // user reload the page of the participant-web-app application) 
    newProfilesBadges: ProfilesBadges = {}; // only the new badges
    allProfilesBadges: ProfilesBadges = {}; // all the badges (including the new ones)

    badgesDefinitions: Record<string, BadgesDefinition>; 

    public constructor(config: UserBadgesConfig) {
        this.studyId = config.badgeStudy;
        this.startSeasonDate = Date.parse(config.startSeasonDate) / 1000; // as report timestamp are in seconds
        this.badgesDefinitions = config.badgesDefinition;
        this.badgesRootUrl = '/assets/badges/';
    }

    public getProfilesBadges = async(): Promise<ResultProfilesBadges> => {
        
        const requestParameters: ReportRequestParameters = [
            [this.studyId],
            undefined, 
            typeBadgeReportCode,
            this.lastReportDate,
            undefined,
        ]

        try {
            const response = await studyAPI.getReportsForUser(
                ...requestParameters
            )
            const reports: Report[] = response?.data?.reports ?? [];
            
            this.handleReports(reports);

        } catch (error) {
            this.allProfilesBadges = {}
            console.error(
                "UserBadgesReportReader: error fetching reports: ",
                error
            );
        }

        return {
            all: this.allProfilesBadges, 
            news: this.newProfilesBadges,
            hasNewBadges: this.hasNewBadges
        };
    }

    /**
     * manage the storage of Badges from the report fetched.
     * 
     * @param reports 
     */
    private handleReports = (reports: Report[]) => {
        
        let profilesBadgesResults = this.parseReports(reports);

        if (this.isFirstFetch) {
            this.allProfilesBadges = profilesBadgesResults;
            this.isFirstFetch = false;
        }
        else if (reports.length > 0) {
            this.hasNewBadges = true; // this property is sent by the client component. We want it to remain true.
            this.storeNewProfilesBadges(profilesBadgesResults);
        }
        // ...else no new badges have just been gained, so there's nothing to store.
    }
    
    /**
     * used only when new badges just have been gained
     * 
     * @param profilesBadges 
     */
    private storeNewProfilesBadges = (profilesBadges: ProfilesBadges) => {
        for (const [profileId, badges] of Object.entries(profilesBadges)) {
            if (! this.allProfilesBadges[profileId]) {
                this.allProfilesBadges[profileId] = [];
            }
            if (! this.newProfilesBadges[profileId]) {
                this.newProfilesBadges[profileId] = [];
            }
            badges.forEach(badge => {
                this.allProfilesBadges[profileId].push(badge)
                this.newProfilesBadges[profileId].push(badge)
            })
        }
    }


    private parseReports(reports: Report[]): ProfilesBadges {
        const result: ProfilesBadges = {};

        reports.reduce((result: ProfilesBadges, report: Report) => {
            const profileId = report.profileId;

            if (! result[profileId]) {
                result[profileId] = []
            }

            report.data.forEach(badgeData => {
                let badge = this.makeBadgeFromRecordData(badgeData, report.timestamp);
                if (badge)
                    result[profileId].push(badge);
            })

            if (! this.lastReportDate || report.timestamp > this.lastReportDate) {
                this.lastReportDate = report.timestamp;
            }

            return result;
        }, result) 

        return result;
    }

    private makeBadgeFromRecordData(badgeData: RawBadgeData, report_timestamp: number): Badge | false {

        if (! this.badgesDefinitions[badgeData.key]) {
            console.error('unknown badge flag',  badgeData)
            return false;
        }
        const def = this.badgesDefinitions[badgeData.key] ;

        const seasonal = def.seasonal;
        let gained = false;
        if (seasonal) {
            gained = report_timestamp > this.startSeasonDate; 
        } else {
            gained = badgeData.value === '1' // BEWARE : we don't manage anywhere the case of a lost badge, and potential other types of badge. 
        }

        if (! gained) {
            return false; // so the badge won't be stored
        }

        return {
            keyFlag: badgeData.key, 
            code: this.badgesDefinitions[badgeData.key].code,
            gained: gained, // BEWARE : temporary code, to be fixed according to the badges creation on the server side. 
                            // For now, gained is always true because of the previous return, but we could hide the badge in the BadgeComponent instead of not storing it as we do now
            imgUrl: def.fileName ? this.badgesRootUrl + def.fileName : '',
            isNew: ! this.isFirstFetch
        }
    }

}