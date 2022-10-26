import React, { useEffect, useState } from 'react';
//import AlertBox from '../displays/AlertBox';
//import TextField from '../inputs/TextField';
import { AlertBox, TextField, ConsentDialog, DialogBtn } from 'case-web-ui';

import { Trans, useTranslation } from 'react-i18next';


import { useTranslatedMarkdown } from '../copied_tools/useTranslatedMarkdown';
import { checkPasswordRules } from '../copied_tools/checkPasswordRules';
import { checkEmailFormat } from '../copied_tools/checkPassword';



interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  infoCheck: string;
  captchaToken?: string;
}


interface SignupCardProps {
  key: string;
  pageKey: string; ///////////
  itemKey: string;
  title: string;
  //renderGenericItemFunc: object; // la fonction render !
  //onNavigate: // fonction de base onNavigate (push dans l'history)

  // ... le reste = propriétés dans le config imbriqué
  className?: string;
  emailInputLabel: string;
  emailInputPlaceholder: string;
  passwordInputLabel: string;
  passwordInputPlaceholder: string;
  rememberMeLabel: string;
  loginBtn: string;
  passwordForgottenBtn: string;
  isLoading?: boolean;
  signupBtn: string;
  infoText?: string;
  persistState: boolean;
  initialSignupData?: SignupFormData;
  onSubmit: (data: SignupFormData) => void;
  onOpenDialog: (dialog: 'passwordForgotten' | 'signup') => void;
}



const SignupCard: React.FC<SignupCardProps> = (props) => {
  const marginBottomClass = "mb-2";

  // use Translation
  const { t } = useTranslation([props.pageKey, 'global']);
  const ctxT = (key : string) => {return t(`${props.itemKey}.${key}`)}

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    infoCheck: '',
  });
  
  const privacyConsentText = useTranslatedMarkdown('consent/privacy.md');
  // const recaptchaConsentText = useTranslatedMarkdown('consent/recaptcha.md');

  const [openPrivacyConsent, setOpenPrivacyConsent] = useState(false);
  const [openRecaptchaConsent, setOpenRecaptchaConsent] = useState(false);
  // const [openRecaptchaConsent, setOpenRecaptchaConsent] = useState(false);

  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  // const [reCaptchaAccepted] = useState(false);
  // const [reCaptchaAccepted, setReCaptchaAccepted] = useState(false);

  // const [showEmailError, setShowEmailError] = useState(false);
  // const [showPasswordError, setShowPasswordError] = useState(false);
  // const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

  // const reCaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITEKEY ? process.env.REACT_APP_RECAPTCHA_SITEKEY : '';
  const useRecaptcha = process.env.REACT_APP_USE_RECAPTCHA === 'true';
  //const recaptchaRef = useRef<ReCAPTCHA>(null);

  
  // const isDisabled = (): boolean => {
  //   const emailOk = checkEmailFormat(signupData.email);
  //   const passwordRuleOk = checkPasswordRules(signupData.password);
  //   return !(!props.isLoading && (!useRecaptcha || reCaptchaAccepted) && acceptedPrivacyPolicy && emailOk && passwordRuleOk && passwordsMatch());
  // }
  const submitIsDisabled = (): boolean => {
    const emailOk = checkEmailFormat(signupData.email);
    const passwordRuleOk = checkPasswordRules(signupData.password);
    return !(emailOk && passwordRuleOk && acceptedPrivacyPolicy);
  }
  
  // const passwordsMatch = () => {
  //   return signupData.password === signupData.confirmPassword;
  // }
  

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (useRecaptcha /*&& !recaptchaRef.current*/) {
      console.error('issue with recaptcha');
      // props.onFormError('issue with recaptcha');
      return;
    }

    try {
      // let reCaptchaToken = '';
      if (useRecaptcha) {
        // recaptchaRef.current?.reset();
        // const captchaResponse = await recaptchaRef.current?.executeAsync();
        // reCaptchaToken = captchaResponse ? captchaResponse : '';
      }
      props.onSubmit({ ...signupData, captchaToken: '' });
    } catch (err) {
      // props.onFormError("unexpected error with recaptcha");
    }
  }


  useEffect(() => {
    setSignupData(prev => {
      return {
        ...prev,
        email: '',
      }
    })
  }, [])

  return (
    <div className={props.className}>
      <div className="bg-primary text-white px-3 py-2a">
        <h4 className="fw-bold m-0">{ ctxT('title') }</h4>
      </div>
      <div className="bg-grey-1 px-3 py-3">
        {props.infoText && props.infoText.length > 0 ?
          <AlertBox
            type="info"
            className={marginBottomClass}
            content={props.infoText}
          /> : null}

        <form
          onSubmit={submit}
        >
          <TextField
            id="signupCardEmail"
            label={ ctxT('emailInputLabel') }
            placeholder={ ctxT('emailInputPlaceholder') }
            type="email"
            name="email"
            className={marginBottomClass}
            value={signupData.email}
            required={true}
            autoComplete="email"
            disabled={false}
            onChange={(event) => {
              const value = event.target.value;
              setSignupData(prev => { return { ...prev, email: value } })
            }}
          />
          <TextField
            id="signupCardPassword"
            label={ ctxT('passwordInputLabel') }
            placeholder={ ctxT('passwordInputPlaceholder') }
            type="password"
            name="password"
            className={marginBottomClass}
            value={signupData.password}
            required={true}
            autoComplete="off"
            onChange={(event) => {
              const value = event.target.value;
              setSignupData(prev => { return { ...prev, password: value } })
            }}
          />
          
          <TextField
            id="passwordConfirmInputLabel"
            label={ ctxT('passwordConfirmInputLabel') }
            placeholder={ ctxT('passwordConfirmInputPlaceholder') }
            type="password"
            name="password"
            className={marginBottomClass}
            value={signupData.confirmPassword}
            required={true}
            autoComplete="off"
            onChange={(event) => {
              const value = event.target.value;
              setSignupData(prev => { return { ...prev, confirmPassword: value } })
            }}
          />
          
          <input
            type="checkbox"
            className={marginBottomClass}
            id="acceptPrivacyConsent"
            name="privacyConsent"
            checked={acceptedPrivacyPolicy}
            onClick={() => {
              if (!acceptedPrivacyPolicy) {
                setOpenPrivacyConsent(true);
              }
            }}
            onChange={(checked) => {
              if (!checked) {
                setAcceptedPrivacyPolicy(checked);
              }
            }}
          />

            
            <Trans t={ctxT} i18nKey="privacyConsentLink">
              {'...'}<span
                onClick={() => setOpenRecaptchaConsent(true)}
                className="text-primary text-decoration-none">{'...'}</span>{'...'}
            </Trans>




            <div className={marginBottomClass}>
              <DialogBtn
                className={marginBottomClass}
                type="submit"
                label={ctxT('signupBtn')}
                disabled={submitIsDisabled()}
                loading={props.isLoading}
                loadingLabel={t('loadingMsg')}
              />
            </div>

            <div className={marginBottomClass}>
            <button
              className="btn btn-primary"
              disabled={signupData.email.length < 3 || signupData.password.length < 6}
            >{ ctxT('signupBtn') }</button>
          </div>




        </form>
        


        <ConsentDialog
          open={openPrivacyConsent}
          fullScreenFrom='sm-down'
          size='xl'
          title={ctxT("privacyConsentTitle")}
          content={privacyConsentText.content}
          cancelBtn={t("privacyConsent.cancelBtn")+'48'}
          acceptBtn={t("privacyConsent.acceptBtn")}
          onCancelled={() => {
            setAcceptedPrivacyPolicy(false)
            setOpenPrivacyConsent(false)
          }}
          onConfirmed={() => {
            setAcceptedPrivacyPolicy(true)
            setOpenPrivacyConsent(false)
          }}
        />

      </div>
    </div>
  );
};

export default SignupCard;

// pour voir dans pages.json
            // ,
            // {
            //   "key": "customSignupCardCol",
            //   "className": "col-12 col-lg-4 mb-lg-0 mt-3",
            //   "items": [
            //     {
            //       "itemKey": "customSignupCard",
            //       "className": "h-100",
            //       "config": {
            //         "type": "extension",
            //         "config": {
            //             "type": "customSignupCard"
            //         },
            //         "showInfoText": false
            //       }
            //     }
            //   ]
            // }

// traductions associées landing.json : 

// "customSignupCard": {
//   "title": "Inscrivez-vous",
//   "info": "",
//   "emailInputLabel": "E-mail",
//   "emailInputPlaceholder": "E-mail",
//   "passwordInputLabel": "Mot de passe",
//   "passwordInputPlaceholder": "Mot de passe",
//   "passwordConfirmInputLabel": "Confirmer le Mot de passe",
//   "passwordConfirmInputPlaceholder": "Confirmer le Mot de passe",
//   "signupBtn": "S'enregistrer",
//   "consentBtn": "Consentement",
//   "privacyConsentTitle": "Déclaration de consentement",
//   "privacyConsentLink": " Accéder à la <1>déclaration de consentement</1>.*"
// },