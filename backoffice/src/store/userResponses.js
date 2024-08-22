import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  axiosGetWithHeaders,
  axiosPostWithHeaders,
} from "../helpers/axiosWithHeaders";
//all responses
export const fetchResponses = createAsyncThunk("fetchResonses", async () => {
  try {
    const response = await axios.get("http://localhost:5000/user-responses");

    return response.data;
  } catch (error) {
    console.error("Error fetching responses:", error);
    throw error;
  }
});

//one course
export const fetchresponse = createAsyncThunk("fetchresponse", async (id) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/user-responses/" + id
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching response:", error);
    throw error;
  }
});

//create response
export const sendresponse = createAsyncThunk("addresponse", async (body) => {
  const response = await axiosPostWithHeaders("user-responses", body);
  console.log(response.data, " this is response data");
  return response.data;
});
export const myresponsesByCheckpoint = createAsyncThunk(
  "myresponsesByCheckpoint",
  async (body) => {
    const response = await axiosGetWithHeaders(
      "user-responses/mine/" + body.checkpointId
    );
    console.log(response.data, " this is response data");
    return response.data;
  }
);

//slice
export const responsesSlice = createSlice({
  name: "responses",
  initialState: {
    response: null,
    responses: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchResponses.fulfilled, (state, action) => {
      state.responses.items = action.payload;
    });
    builder.addCase(myresponsesByCheckpoint.fulfilled, (state, action) => {
      state.responses.items = action.payload;
    });

    builder.addCase(fetchresponse.fulfilled, (state, action) => {
      state.response = action.payload;
    });
    builder.addCase(sendresponse.fulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
});

export default responsesSlice.reducer;
