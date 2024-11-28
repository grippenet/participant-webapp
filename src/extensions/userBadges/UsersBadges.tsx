import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ProfilesBadges, UserBadgesReportReader } from './services/UserBadgesReportReader';
import { Dialog, LoadingPlaceholder } from '@influenzanet/case-web-ui';
import ProfileBadgesComponent from './ProfileBadgesComponent';
import { GenericPageItemProps } from '@influenzanet/case-web-app-core/build/types/extensionComponents';
import { BadgesDefinition } from './config/BadgesDefinition';

// import styles from './styles/UserBadges.module.scss';

// COMPONENT BUILDING SECTION
/* 
  the component UserBadges is not directly exported but built with the exported function createUserBadgesComponent.
  This one will use the userBadgeReader which is outside of the component function. (TODO ?: a better builder?)
  The userBadgeReader is the service that fetches the badge report, constructs the badges objects from the flags 
  report and store them in a property
*/

export interface UserBadgesConfig {
  badgeStudy: string;
  typeBadgeReportCode: string;
  startSeasonDate: string;
  badgesDefinition: Record<string, BadgesDefinition>;
  badgesImgRootUrl: string;
}

let userBadgeReader: UserBadgesReportReader;
export const createUserBadgesComponent = (config: UserBadgesConfig) => {
  userBadgeReader = new UserBadgesReportReader(config);
  return UserBadges
}

/**
 * to be specified in the src/configs/pages/home.json
 * manage number of badges per row and size of badges' images :
 */
export interface BadgesDisplayOptions {
  profileBadgesGridClassName?: string,
  badgeClassName?: string,
  badgeImgClassName?: string,
  badgeImgStyle?: CSSProperties,
}

const defaultDisplayOptions: BadgesDisplayOptions = {
  profileBadgesGridClassName: 'row',
  badgeClassName: 'col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2',
  badgeImgClassName: 'w-75',
  badgeImgStyle: {maxWidth: '7rem'},
}

interface UserBadgesProps extends GenericPageItemProps {
  displayOptions?: BadgesDisplayOptions,
  translationPath?: string
}


// closure-like component function : need variable "userBadgeReader"
const UserBadges: React.FC<UserBadgesProps> = (props) => {
  
  const [badgeReader] = useState<UserBadgesReportReader>(userBadgeReader);
  
  const displayOptions = {...defaultDisplayOptions, ...props.displayOptions ?? {}}
  
  const { t } = useTranslation([props.translationPath ?? 'badges/default']);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [profilesBadges, setProfilesBadges] = useState<ProfilesBadges>({});
  const [_newProfilesBadges, setNewProfilesBadges] = useState<ProfilesBadges>();
  const [hasNewProfilesBadges, setHasNewProfilesBadges] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const isMounted = useRef(true);

  const title = t('title');
  
  useEffect(() => {
    
    async function init() {
      try {
        const results = await badgeReader.getProfilesBadges();

        setProfilesBadges(results.all);
        setNewProfilesBadges(results.news);
        setHasNewProfilesBadges(results.hasNewBadges);

        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    }

    init();

    return () => {
      isMounted.current = false;
    }
  }, [ isMounted, badgeReader ])

  // always null
  const errorContent = null;

  const loadingContent = (
    <div className={clsx(props.className)}>
      <LoadingPlaceholder color='secondary' minHeight={"45px"} height={"45px"}/>
    </div>
  );

  const toggleBadgesDisplay = () => {
    setShow(! show);
  }

  const badgeUsersContent = 
  <div 
    className={clsx(
      props.className
    )}
  >
    <h5 className={clsx(
      'ps-1 pe-2 py-1a m-0 fw-bold fs-btn bg-secondary',
    )}  onClick={toggleBadgesDisplay}>
      <div className='d-inline-block'><i className="fas fa-trophy ms-0 me-1 fs-4" style={{color: "#ed9f3f"}} />{title}</div>
      <div className='d-inline-block float-end'>
      {hasNewProfilesBadges || false
        ? <span className='me-0 bg-secondary px-1 text-danger'> {t('newBadgeMessage')}</span>
        : '' }
          <i className="fas fa-plus ms-0 fs-4" />
      </div>
    </h5>

    <span id="aria-label-badge-dialog" className='visually-hidden'>Badges</span>

    <Dialog
        open={show}
        title={title}
        ariaLabelledBy="aria-label-badge-dialog"
        onClose={toggleBadgesDisplay}
        size="xl"
      >
      <ProfileBadgesComponent 
        profilesBadges={profilesBadges} 
        displayOptions={displayOptions}
        badgesTranslation={t} 
        className='m-2'
        />
    </Dialog>
    
  </div>;

    
  return isError
    ? errorContent
    : isLoading
    ? loadingContent
    : badgeUsersContent;
}



