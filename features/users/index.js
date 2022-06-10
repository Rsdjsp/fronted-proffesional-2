import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPeopleForUser = createAsyncThunk(
  "users/getForUser",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const idUser = state.auth.user.id;

    const users = await axios.get("/api/users/all/" + idUser);

    return users.data;
  }
);

export const sendFriendRequest = createAsyncThunk(
  "users/sendFriendShip",
  async (data, thunkAPI) => {
    const { idFriend } = data;
    const state = thunkAPI.getState();
    const idUser = state.auth.user.id;

    const users = await axios.post("/api/users/firendshipRequest", {
      idUser,
      idFriend,
    });

    return users.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    people: [],
    recivedRequests: [],
    sendedRequests: [],
    loading: false,
  },
  extraReducers(builder) {
    builder.addCase(getPeopleForUser.fulfilled, (state, action) => {
      state.people = action.payload.people;
      state.recivedRequests = action.payload.recivedRequests;
      state.sendedRequests = action.payload.sendFriendRequest;
      state.loading = false;
    });
    builder.addCase(getPeopleForUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPeopleForUser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.people = action.payload.people;
      state.recivedRequests = action.payload.recivedRequests;
      state.sendedRequests = action.payload.sendFriendRequest;
      state.loading = false;
    });
    builder.addCase(sendFriendRequest.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
