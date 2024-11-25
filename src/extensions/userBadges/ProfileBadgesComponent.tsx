import BadgeComponent from "./BadgeComponent";
import { Badge, ProfilesBadges } from "./services/UserBadgesReportReader";


import { useSelector } from "react-redux";
import { Profile } from "@influenzanet/case-web-app-core/build/api/types/user";
import { RootState} from "@influenzanet/case-web-app-core/build/store/rootReducer";
import { config } from "../../config";
import clsx from "clsx";
import { BadgesDisplayOptions } from "./UsersBadges";


interface BadgeProps {
    className?: string;
    profilesBadges: ProfilesBadges
    badgesTranslation: (key: string) => string;
    displayOptions?: BadgesDisplayOptions;
}
  
const ProfileBadgesComponent: React.FC<BadgeProps> = (props) => {
    const profilesBadges = props.profilesBadges;

    const profiles: Profile[] = useSelector(
        (state: RootState) => state.user.currentUser.profiles
    );
    
    const t = props.badgesTranslation;
    const makeBadgeTranslator = (badge: Badge) => {
        return (codeTranslation: string) => t(`badges.${badge.code}.${codeTranslation}`)
    }

    const avatarsImgMap: Record<string, string> = config.appConfig.avatars.reduce((avMap: Record<string, string>, curAvatar) => {
        avMap[curAvatar.avatarId] = "/assets/" +  curAvatar.url
        return avMap;
    }, {});

    return (
        <div className={clsx(
            '',
            props.className
          )}>
            {profiles.map((profile, idx) => (
                <div key={idx} className="mx-1 my-2 row border-grey-2 border-bottom-2">
                    {/* profile */}
                    <div className="p-2 fw-bold bg-grey-2">
                        <img className={"d-inline-block text-body overflow-hidden me-1"} width={24} src={avatarsImgMap[profile.avatarId]}></img>
                        <span className="fs-5">
                            {profile.alias}
                        </span>
                    </div>
                    {/* badges */}
                    <div className="container-fluid m-0 p-0">
                        <div className={clsx(
                            'mx-0 py-2 px-2 p-2 bg-white',
                            // make it possible to change display from row to flex (must be tested !): 
                            props.displayOptions?.profileBadgesGridClassName
                        )}>

                            {/* FOR TESTING NO BADGE */}
                            {/* <div className="pt-2 fs-5">
                                <img className="me-1" src="https://img.freepik.com/vecteurs-premium/est-dessin-anime-drole-excrements-caca_53500-4600.jpg" width="130"/>
                                {t('noBadgeMessage')}
                            </div> */}
                            { (profilesBadges[profile.id] && profilesBadges[profile.id].length > 0) ? 
                            '' : <div className="pt-2 fs-5">{t('noBadgeMessage')}</div>
                            }

                            {profilesBadges[profile.id] && (
                                profilesBadges[profile.id].map((profileBadge, idx) => 
                                    profileBadge.gained && (
                                        <BadgeComponent 
                                            key={idx} 
                                            badge={profileBadge} 
                                            badgesTranslation={t}
                                            currentBadgeTranslation={makeBadgeTranslator(profileBadge)}
                                            displayOptions={props.displayOptions}
                                        ></BadgeComponent>
                                    )
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <div className="py-2 px-2 fs-5" style={{
                            // 'borderTop': '0.5rem white solid',
                        }} >
                <i className="fas fa-question-circle"></i> {t('badgesExplanations')}
            </div>
        </div>
    )
}

export default ProfileBadgesComponent;