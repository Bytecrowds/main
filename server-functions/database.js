export const updateBytecrowd = (payload) => {
  fetch("/api/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
