const axios = require("axios");

const apiUrl = "http://localhost:3000/contactGroup";

// Example: Fetch all contacts

axios
  .get(apiUrl)

  .then((response) => {
    console.log("Contacts:", response.data);
  })

  .catch((error) => {
    console.error("Error fetching contacts:", error);
  });