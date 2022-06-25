import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { UserType } from "../utilities/enum";
import { AppState } from "./store";

// Define the initial state using that type
const initialState: any = {
  userType: undefined,
  authData: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAllAuthData: (state, action: PayloadAction<any>) => {
      // state.currentCondition = action.payload.currentCondition;
      // state.location = action.payload.location;
      // state.forecast = action.payload.forecast;

      //eg: {
      //     "userType": 1,
      //     "authData": {
      //         "_id": "62ab1ec523d4d3d8fde9ad52",
      //         "email": "a2@b.com",
      //         "password": "fsdfsdf",
      //         "shopname"/"fullname": "sdfsdf",
      //         "address": "sdfsdfsdf",
      //         "mobile": "888888",
      //         "__v": 0
      //     }
      // }

      return action.payload;
    },
  },
  extraReducers: {
    // Each time when pages that have getStaticProps or getServerSideProps are opened by user the HYDRATE action will be dispatched. This may happen during initial page load and during regular page navigation. The payload of this action will contain the state at the moment of static generation or server side rendering, so your reducer must merge it with existing client state properly.
    [HYDRATE]: (state, action) => {
      // state.currentCondition = action.payload.weather.currentCondition;
      // state.location = action.payload.weather.location;
      // state.forecast = action.payload.weather.forecast;

      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAllAuthData } = authSlice.actions;
export default authSlice.reducer;
