const updateDB = (payload) => {
  fetch(process.env.NEXT_PUBLIC_DATABASE_SERVER + "/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export default updateDB;
