const fs = require("fs");
const https = require("https");
const axios = require("axios");

const sslOpts = new https.Agent({
  ca: fs.readFileSync(
    "/var/run/secrets/kubernetes.io/serviceaccount/service-ca.crt"
  )
});

export async function getQuestions() {
  try {
    const url =
      process.env.VUE_APP_QUESTIONS_API_URL ||
      "http://myapi.example.com/api/questions";
    const res = await axios.get(url, { httpsAgent: sslOpts });
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
    const res = await axios.get(url, { httpsAgent: sslOpts });
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
    const res = await axios.get(url, { httpsAgent: sslOpts });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function saveUserResponse(fromData) {
  try {
    const res = await axios.post(
      `${process.env.VUE_APP_COLLABORATORS_API_URL}`,
      fromData,
      {
        httpsAgent: sslOpts,
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAvatars() {
  try {
    const res = await axios.get(
      `${process.env.VUE_APP_COLLABORATORS_API_URL}/avatars`,
      { httpsAgent: sslOpts }
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
