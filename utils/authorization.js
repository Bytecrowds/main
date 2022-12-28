export default function isAuthorized(authorizedEmails, session) {
  return !authorizedEmails || authorizedEmails.includes(session.user.email);
}

export const failAuthorization = (reason, res) => {
  let message = ["login", "authorization"].includes(reason)
    ? proces.env.AUTHORIZATION_FAILED_MESSAGE.replace("<reason>", reason)
    : reason;

  res.status(401).send(message);
};