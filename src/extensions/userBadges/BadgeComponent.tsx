import clsx from "clsx";
import { Badge } from "./services/UserBadgesReportReader";
import { BadgesDisplayOptions } from "./UsersBadges";
import { OverlayTrigger, Popover, PopoverProps, Tooltip, TooltipProps } from "react-bootstrap";
import styles from "./styles/BadgeComponent.module.scss"

const translationLabelCode = 'label';
const translationDescriptionCode = 'message_new';

interface BadgeProps {
    className?: string;
    badge: Badge;
    badgesTranslation: (key: string) => string;
    currentBadgeTranslation: (key: string) => string;
    displayOptions?: BadgesDisplayOptions;
}

/**
 * There's a dependency to react-bootstrap for the description tooltip
 * 
 * @param props 
 * @returns 
 */
const BadgeComponent: React.FC<BadgeProps> = (props) => {
    
    const badge = props.badge;
    const badgesTranslation = props.badgesTranslation;
    const currentBadgeTranslation = props.currentBadgeTranslation;

    const renderTooltipDescription = (props: PopoverProps) => (
        <Popover {...props} className="w-100">
            {/* <Popover.Header className="bg-primary text-white p-2">
                {currentBadgeTranslation(translationLabelCode)}
            </Popover.Header> */}
            <Popover.Body className="bg-primary text-white p-2">
            <div>
                {currentBadgeTranslation(translationDescriptionCode)}
            </div>
            </Popover.Body>
        </Popover>
    )

    const makeBadgeContent = () => (
        <div className={clsx(
            "badge-wrapper position-relative",
            // "flex",
            props.className,
            props.displayOptions?.badgeClassName,
        )}>
            {(badge.isNew || false) &&
                renderNewBadge(badgesTranslation)
            }
            {/* badge image */}
            <div className="text-center w-100">
                <img className={clsx(
                    // "justify-self-center",
                    styles['badge-image'],
                    props.displayOptions?.badgeImgClassName,
                    
                    )} 
                    style={props.displayOptions?.badgeImgStyle}
                    alt={"badge " + currentBadgeTranslation(translationLabelCode)}
                    src={badge.imgUrl}>
                </img>
            </div>
            <div className={clsx(
                "text-center fw-bold p-0 m-0"
                )}>
                {badge.gained 
                    ? currentBadgeTranslation(translationLabelCode)
                    : '' /* 'not gained (will never be showed because, so far, these badges are filtered in UserBadgesReportReader) ' + badge.keyFlag */ }
            </div>
            
        </div>
    )

    return (
        <OverlayTrigger 
            overlay={renderTooltipDescription} 
            placement="auto"
        >
            {makeBadgeContent()}
        </OverlayTrigger>
    )
}

export default BadgeComponent;


const renderNewBadge = (badgesTranslation: (key: string) => string) => (
    <div className={clsx(
            styles['new-badge_wrapper'],
    )}>
        <div className={clsx(
                styles['new-badge_icon-wrapper']
            )}>
                <i className={clsx(
                styles['new-badge_icon'],
                    "fas fa-certificate",
                )} ></i>
        </div>
        <div className={clsx(
                styles['new-badge_text-wrapper'],
            )} 
        >
            <span className={clsx(
                styles['new-badge_text']
            )}>
                {badgesTranslation('newBadgeLabel')}
            </span>
        </div>
    </div>)
