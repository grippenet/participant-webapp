// copied from case-webapp-core/src/components/dialogs/GlobalDialogs/signup.tsx (partial copy)


export const emailFormatRegexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const checkEmailFormat = (email: string): boolean => {
  return emailFormatRegexp.test(email);
}

