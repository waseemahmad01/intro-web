import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
// a testing comment
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // console.log(token)
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }
  return response;
});

// list of all the endpoints

// user apis
export const login = (data) => api.post("/api/login", data);
export const verify = (data) => api.post("/api/verify", data);
export const dob = (data) => api.patch("/api/dob", data);
export const username = (data) => api.patch("/api/username", data);
export const identify = (data) => api.patch("/api/identify", data);
export const bodyType = (data) => api.patch("/api/bodytype", data);
export const heightApi = (data) => api.patch("/api/height", data);
export const ethnicityApi = (data) => api.patch("/api/ethnicity", data);
export const religion = (data) => api.patch("/api/religion", data);
export const children = (data) => api.patch("/api/children", data);
export const datePreference = (data) => api.patch("/api/dp", data);
export const hometown = (data) => api.patch("/api/hometown", data);
export const education = (data) => api.patch("/api/education", data);
export const profession = (data) => api.patch("/api/profession", data);
export const vices = (data) => api.patch("/api/vices", data);
export const profileImage = (data) => api.patch("/api/profileImage", data);
export const step = (data) => api.patch("/api/step", data);
export const setLocation = (data) => api.patch("/api/location", data);

// users

export const getUser = () => api.get("/api/user");
export const getUserById = (id) => api.get(`/api/user/${id}`);

// matches

export const getMatchedUsers = () => api.get("/api/match");

// profile visited

export const iVisitedProfiles = () => api.get("/api/ivisited");
export const visitedMe = () => api.get("/api/visitedme");
export const visitedUser = (id) => api.post(`/api/visited/${id}`);

// liked me

export const likedMeApi = () => api.get("/api/likedMe");

// video apis

export const videos = () => api.get("/api/videos");
export const likeVideo = (data) => api.post("/api/video/like", data);
export const allVideos = (page, limit) =>
  api.get(`/api/allVideos?page=${page}&limit=${limit}`);
export const otherUserVideos = (id) => api.get(`/api/videos/${id}`);

// story

export const getStories = () => api.get("/api/story");

// profile apis

export const likedMe = () => api.get("/api/likedme");

// live users

export const getLiveUsers = () => api.get("api/onlineuser");

// live stream

export const liveStreamUsers = (filter) => api.get(`/api/liveuser${filter}`);
export const setLiveUser = (data) => api.post("/api/liveuser", data);
export const goLive = (data) => api.post("/api/liveuser", data);
export const deleteLiveUser = (data) => api.delete("/api/deleteliveuser", data);

// liveloop
export const createLiveloop = (data) => api.post("/api/liveloop", data);
// data ==> username, image,location, channelId,gender_identifier,age
export const getLiveLoopRequests = (query) => api.get(`/api/liveloop?${query}`);

//   data={} 'age=${ageRange[0]}&age=${ageRange[1]}&long=$lng&lat=$lat&distance=$distance&gender_identifier=$genderIdentifier'

export default api;
