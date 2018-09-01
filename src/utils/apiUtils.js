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

export async function saveUserResponse(fromData) {
  console.log("Saving user data");
  try {
    const res = await axios.post(
      "http://localhost:3000/api/collaborators",
      fromData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log("Success ::", res);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
