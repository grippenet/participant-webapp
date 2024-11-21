import BadgeComponent from "./BadgeComponent";
import { Badge, ProfilesBadges } from "./services/UserBadgesReportReader";


import { useSelector } from "react-redux";
import { Profile } from "@influenzanet/case-web-app-core/build/api/types/user";
import { RootState} from "@influenzanet/case-web-app-core/build/store/rootReducer";
import { config } from "../../config";
import { badgesDefinition2024 } from "./config/BadgesDefinition";
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
                <div key={idx} className="row">
                    <div>
                        <div className="p-2 fw-bold" style={{
                                'borderTop': '0.5rem white solid', 
                                'borderBottom': '1px #005265 solid'
                            }} >
                            <img className={"d-inline-block text-body overflow-hidden me-1"} width={24} src={avatarsImgMap[profile.avatarId]}></img>
                            <span className="fs-5">
                                {profile.alias} {profile.mainProfile ? ' (Moi)' : ''}
                            </span>
                        </div>
                        <div className={clsx(
                            'px-2',
                            props.displayOptions?.ProfileBadgesGridClassName
                        )}>
                            { (profilesBadges[profile.id] && profilesBadges[profile.id].length > 0) ? 
                            '' : <div className="pt-2 fs-5">Aucun badge pour le moment !</div>
                            }
                            {profilesBadges[profile.id] && (
                                profilesBadges[profile.id].map((profileBadge, idx) => 
                                    profileBadge.gained && (
                                        <BadgeComponent 
                                            key={idx} 
                                            badge={profileBadge} 
                                            badgeTranslator={makeBadgeTranslator(profileBadge)}
                                            displayOptions={props.displayOptions}
                                        ></BadgeComponent>
                                    )
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProfileBadgesComponent;