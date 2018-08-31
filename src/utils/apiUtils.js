const axios = require("axios");

export async function getQuestions() {
  try {
    const url =
      process.env.VUE_APP_QUESTIONS_API_URL ||
      "http://myapi.example.com/api/questions";
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getFrames() {
  try {
    const url =
      process.env.VUE_APP_FRAMES_API_URL ||
      "http://myapi.example.com/api/frames";
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getFrame(id) {
  try {
    const url =
      `${process.env.VUE_APP_FRAMES_API_URL}/${id}` ||
      `http://myapi.example.com/api/frames/${id}`;
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
