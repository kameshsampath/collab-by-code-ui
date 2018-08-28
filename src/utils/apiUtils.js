const axios = require("axios");

export async function getQuestions() {
  try {
    // TODO fix this url via env
    const url =
      process.env.API_URL ||
      "http://event-api-rhcollab-myproject.192.168.64.105.nip.io/api/questions";
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function saveUserResponse(userResponse) {
  console.log("Saving...");
  //TODO call to API to save the user response
  //Need to get the userEmail and Twitter handle
  return new Promise((resolve, reject) => {
    try {
      console.log("Saving User Response", JSON.stringify(userResponse));
      resolve("saved");
    } catch (error) {
      //console.error(error);
      reject(error);
    }
  });
}
