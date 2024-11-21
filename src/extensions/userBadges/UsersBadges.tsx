import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ProfilesBadges, UserBadgesReportReader } from './services/UserBadgesReportReader';
import { LoadingPlaceholder } from '@influenzanet/case-web-ui';
import ProfileBadgesComponent from './ProfileBadgesComponent';
import { GenericPageItemProps } from '@influenzanet/case-web-app-core/build/types/extensionComponents';
import { BadgesDefinition } from './config/BadgesDefinition';



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

export interface BadgesDisplayOptions {
  ProfileBadgesGridClassName?: string,
  badgeClassName?: string,
  badgeImgClassName?: string,
}

interface UserBadgesProps extends GenericPageItemProps {
  displayOptions?: BadgesDisplayOptions
}

const defaultDisplayOptions: BadgesDisplayOptions = {
  ProfileBadgesGridClassName: 'row pb-2',
  badgeClassName: 'col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2',
  badgeImgClassName: 'd-inline-block text-body overflow-hidden me-1',
}


// closure-like component function : need variable "userBadgeReader"
const UserBadges: React.FC<UserBadgesProps> = (props) => {
  
  const [badgeReader] = useState<UserBadgesReportReader>(userBadgeReader);
  
  const displayOptions = {...defaultDisplayOptions, ...props.displayOptions ?? {}}
  
  const { t } = useTranslation(['badges']);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [profilesBadges, setProfilesBadges] = useState<ProfilesBadges>({});
  const [_newProfilesBadges, setNewProfilesBadges] = useState<ProfilesBadges>();
  const [hasNewProfilesBadges, setHasNewProfilesBadges] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const isMounted = useRef(true);

  const title = t('title');

  let reports;
  
  useEffect(() => {
    
    async function init() {
      try {
        const results = await badgeReader.getProfilesBadges();

        setProfilesBadges(results.all);
        setNewProfilesBadges(results.news);
        setHasNewProfilesBadges(results.hasNewBadges);

        setIsLoading(false);

        // console.log('RESULTS : ', results);
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
  }, [reports, isMounted])

  const errorContent = null;

  const loadingContent = (
    <LoadingPlaceholder color='secondary' minHeight={200} />
  );

  const displayBadges = () => {
    setShow(! show);
  }

  const badgeUsersContent = (
  <div 
    className={clsx(
      props.className
    )}
  >
    {title ? 
      <h5 className={clsx(
        'px-2 py-1a text-white m-0 fw-bold fs-btn bg-primary',
      )}  onClick={displayBadges}>
        <div className='d-inline-block'>{title}</div>
        <div className='d-inline-block float-end text-danger'>
        {hasNewProfilesBadges 
          ? <span className='me-1 bg-secondary px-1'> Nouveau(x) badge(s) !</span>
          : '' }
          <button className='btn btn-xs bg-secondary text-black m-0 p-0 pe-1'>
            <i className={clsx(
              'ms-1',
              show ? 'fas fa-chevron-up': 'fas fa-chevron-down'
            )}></i>
          </button>
        </div>
      </h5>
      : null}
    {badgeReader && show && (
      <ProfileBadgesComponent 
        className='' 
        profilesBadges={profilesBadges} 
        displayOptions={displayOptions}
        badgesTranslation={t} />
    )} 
  </div>
  );

    
  return isError
    ? errorContent
    : isLoading
    ? loadingContent
    : badgeUsersContent;
}
