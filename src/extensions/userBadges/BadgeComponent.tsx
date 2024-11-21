import clsx from "clsx";
import { Badge } from "./services/UserBadgesReportReader";
import { BadgesDisplayOptions } from "./UsersBadges";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";


const translationLabelCode = 'label';
const translationDescriptionCode = 'message_new';

interface BadgeProps {
    className?: string;
    badge: Badge;
    badgeTranslator: (key: string) => string;
    displayOptions?: BadgesDisplayOptions;
}

/**
 * There's a dependency to react-bootstrap for the description tooltip
 * 
 * @param props 
 * @returns 
 */
const BadgeComponent: React.FC<BadgeProps> = (props) => {
    // console.log(props.displayOptions)
    const badge = props.badge;
    const t = props.badgeTranslator;

    const renderTooltipDescription = (props: TooltipProps) => (
        <Tooltip {...props}>
            {t(translationDescriptionCode)}
        </Tooltip>
    )
    
    return (
        <div className={clsx(
            props.className,
            props.displayOptions?.badgeClassName,
            badge.isNew ? 'border border-1 border-danger' : ''
          )}>
            <div className="">
                <OverlayTrigger overlay={renderTooltipDescription}>
                    <img className={clsx(
                        "w-100",
                        props.displayOptions?.badgeImgClassName
                        )} 
                        src={badge.imgUrl}>
                    </img>
                </OverlayTrigger>
            </div>
            <div className={clsx(
                "text-center fw-bold p-0 m-0",
                badge.isNew ? 'text-danger' : ''
                )} data-bs-toggle='tooltip' title={t(translationDescriptionCode)}>
                {badge.gained 
                    ? t(translationLabelCode)
                    : 'badge non obtenu ' + badge.keyFlag }
                    {badge.isNew ? ' nouveau ! ' : ''}
            </div>
            
        </div>
    )
}


export default BadgeComponent;