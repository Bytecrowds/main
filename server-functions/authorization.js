export const authorize = async (id, emails) => {
  return await fetch("/api/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: id,
      emails: emails,
    }),
  });
};
