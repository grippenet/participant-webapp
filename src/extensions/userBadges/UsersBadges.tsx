import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ProfilesBadges, UserBadgesReportReader } from './services/UserBadgesReportReader';
import { Dialog, DialogBtn, LoadingPlaceholder } from '@influenzanet/case-web-ui';
import ProfileBadgesComponent from './ProfileBadgesComponent';
import { GenericPageItemProps } from '@influenzanet/case-web-app-core/build/types/extensionComponents';
import { BadgesDefinition } from './config/BadgesDefinition';

import styles from './styles/UserBadges.module.scss';

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
 * to be specified in the src/configs/pages/home.json :
 */
export interface BadgesDisplayOptions {
  profileBadgesGridClassName?: string,
  badgeClassName?: string,
  badgeImgClassName?: string,
}

const defaultDisplayOptions: BadgesDisplayOptions = {
  profileBadgesGridClassName: 'row pb-2 pt-1',
  badgeClassName: 'col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2',
  badgeImgClassName: '',
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
  }, [ isMounted ])

  // always null
  const errorContent = null;

  const loadingContent = (
    <LoadingPlaceholder color='secondary' minHeight={200} />
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
      'px-2 py-1a text-whiteXX m-0 fw-bold fs-btn bg-secondary',
    )}  onClick={toggleBadgesDisplay}>
      <div className='d-inline-block'>{title}</div>
      <div className='d-inline-block float-end'>
      {hasNewProfilesBadges || false
        ? <span className='me-1 bg-secondary px-1 text-danger'> {t('newBadgeMessage')}</span>
        : '' }
        <button className='btn btn-xs bg-secondary text-black m-0 p-0 pe-1'>
          <i className="fas ms-1 fa-plus" />
        </button>
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
        className='' 
        profilesBadges={profilesBadges} 
        displayOptions={displayOptions}
        badgesTranslation={t} />
    </Dialog>
    
  </div>;

    
  return isError
    ? errorContent
    : isLoading
    ? loadingContent
    : badgeUsersContent;
}



