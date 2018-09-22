import { store } from "../store/store";

const https = require("https");
const axios = require("axios");

let instance;

if ("development" === process.env.NODE_ENV) {
  instance = axios.create();
} else {
  instance = axios.create({ httpsAgent: new https.Agent() });
}

//TODO set it globally

function showError(title, message) {
  //console.error(JSON.stringify(errMsg));
  store.dispatch("messages", { title, message });
}

export async function getQuestions() {
  try {
    const url =
      process.env.VUE_APP_QUESTIONS_API_URL ||
      "http://myapi.example.com/api/questions";
    await store.dispatch("refreshToken");
    const res = await instance.get(url, {
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`
      }
    });
    return res.data;
  } catch (error) {
    //console.log(error);
    const errMsg = {
      statusCode: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data
    };
    showError("Questions", errMsg);
  }
}

export async function getFrames() {
  try {
    const url =
      process.env.VUE_APP_FRAMES_API_URL ||
      "http://myapi.example.com/api/frames";
    await store.dispatch("refreshToken");
    const res = await instance.get(url, {
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`
      }
    });
    return res.data;
  } catch (error) {
    //console.log(error);
    const errMsg = {
      statusCode: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data
    };
    showError("Frames", errMsg);
  }
}

export async function getFrame(id) {
  try {
    const url =
      `${process.env.VUE_APP_FRAMES_API_URL}/${id}` ||
      `http://myapi.example.com/api/frames/${id}`;
    await store.dispatch("refreshToken");
    const res = await instance.get(url, {
      headers: {
        Authorization: `Bearer ${store.getters.accessToken}`
      }
    });
    return res.data;
  } catch (error) {
    //console.log(error);
    const errMsg = {
      statusCode: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data
    };
    showError("Frames", errMsg);
  }
}

export async function saveUserResponse(fromData) {
  try {
    await store.dispatch("refreshToken");
    const res = await instance.post(
      `${process.env.VUE_APP_COLLABORATORS_API_URL}`,
      fromData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${store.getters.accessToken}`
        }
      }
    );
    return res;
  } catch (error) {
    //console.log(error);
    const errMsg = {
      statusCode: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data
    };
    showError("Save Avatar", errMsg);
  }
}

export async function getAvatars() {
  try {
    await store.dispatch("refreshToken");
    const res = await instance.get(
      `${process.env.VUE_APP_COLLABORATORS_API_URL}/avatars`,
      {
        headers: {
          Authorization: `Bearer ${store.getters.accessToken}`
        }
      }
    );
    return res;
  } catch (error) {
    //console.log(error);
    const errMsg = {
      statusCode: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data
    };
    showError("Avatars", errMsg);
  }
}
