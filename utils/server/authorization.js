export const isAuthorized = (authorizedEmails, session) => {
  return !authorizedEmails || authorizedEmails.includes(session?.user.email);
};
