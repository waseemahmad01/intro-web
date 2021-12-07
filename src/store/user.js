import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      data: {
        phonenumber: "",
        socialMedia_id: "",
        step: "/dob",
        date_of_birth: { dob: "", age: 0 },
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        identify: { gender: "", visible: false },
        date_preference: { interested_gender: "", interested_audience: "" },
        height: { height: 0.0, visible: false },
        body_type: { type: "", visible: false },
        ethnicity: {
          country_list: [],
          c_visible: false,
          race: "",
          r_visible: false,
        },
        location: { lat: "", lon: "", geoHash: "", visible: false },
        home_town: {
          live_with: "",
          home_town: "",
          live_with_visible: false,
          visible: false,
        },
        education: {
          school: "",
          s_visible: false,
          degree: "",
          d_visible: false,
        },
        profession: {
          company: { company: "", c_visible: false },
          job_title: { job_title: "", j_visible: false },
          occupation: { occupation: "", o_visible: false },
        },
        religion: { religion: "", visible: false },
        vices: {
          drink: { drink: "", d_visible: false },
          smoke: { smoke: "", s_visible: false },
          weed: { weed: "", w_visible: false },
          drugs: { drugs: "", dr_visible: false },
        },
        profile_image: "",
        children: { have_children: "", want_children: "", visible: false },
        prompt: [{ question: "", url: "" }],
      },
      accessToken: "",
      onlineUsers: [],
    },
  },

  reducers: {
    submit: (state, action) => {
      state.user.data = action.payload.data;
      if (action.payload.accessToken) {
        state.user.accessToken = action.payload.access_token;
      } else {
        state.user.accessToken = localStorage.getItem("token");
      }
    },
    setOnlineUsers: (state, action) => {
      state.user.onlineUsers = action.payload;
    },
  },
});

export const { submit, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
