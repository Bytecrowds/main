const isAuthorized = (bytecrowd, session) => {
  return (
    !bytecrowd.authorizedEmails ||
    bytecrowd.authorizedEmails.includes(session.user.email)
  );
};

export default isAuthorized;
