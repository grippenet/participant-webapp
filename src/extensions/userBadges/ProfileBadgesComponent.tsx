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
            'bg-secondary',
            props.className
          )}>
            {profiles.map((profile, idx) => (
                <div key={idx} className="">
                    {/* profile */}
                    <div className="p-2 fw-bold" style={{
                            'borderTop': '0.5rem white solid', 
                            'borderBottom': '1px #005265 solid',
                        }} >
                        <img className={"d-inline-block text-body overflow-hidden me-1"} width={24} src={avatarsImgMap[profile.avatarId]}></img>
                        <span className="fs-5">
                            {profile.alias} {profile.mainProfile ? ' (Moi)' : ''}
                        </span>
                    </div>
                    {/* badges */}
                    <div className={clsx(
                        'py-2 px-4 ',
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
            ))}
            <div className="py-2 px-4 fs-5" style={{
                            'borderTop': '0.5rem white solid',
                        }} >
                <i className="fas fa-question-circle"></i> {t('badgesExplanations')}
            
            </div>
        </div>
    )
}

export default ProfileBadgesComponent;