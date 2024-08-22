import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosGetWithHeaders } from "../helpers/axiosWithHeaders";

//all sessions
export const fetchSessions = createAsyncThunk("fetchSessions", async () => {
  try {
    const response = await axios.get("http://localhost:5000/sessions");
   
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
});

//one session
export const fetchsession = createAsyncThunk("fetchsession", async (id) => {
  try {
    const response = await axios.get("http://localhost:5000/sessions/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
});
export const fetchMine = createAsyncThunk("fetchMine", async (id) => {
  try {
    const response = await axiosGetWithHeaders("sessions/mine");
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
});



export const deletesession = createAsyncThunk("deletesession", async (id ,  { dispatch }) => {
  try {
    const response = await axios.delete("http://localhost:5000/sessions/" + id);
    dispatch(fetchSessions());
    return response.data;
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
});

// Action types
export const SESSION_ADDED = "SESSION_ADDED";
export const SESSION_ADD_FAILED = "SESSION_ADD_FAILED";

// Action creators
export const sessionAdded = (session) => ({
  type: SESSION_ADDED,
  payload: session,
});

export const editsession = createAsyncThunk("editsession", async (args,{dispatch}) => {
  const {id , body} = args
  try {
    const response = await axios.patch("http://localhost:5000/sessions/" + id, body);
  
dispatch(fetchsession(id))
    return response.data;
  } catch (error) {
    console.error("Error editing session:", error);
    throw error;
  }
});




export const sessionAddFailed = (error) => ({
  type: SESSION_ADD_FAILED,
  payload: error,
});
export const sendsession = createAsyncThunk("addsession", async (body) => {
  const response = await axios.post("http://localhost:5000/sessions", body);
  console.log(response.data," this is session data");
  return response.data;
  
});

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState: {
    session: null,
    sessions: {
      items: [],
      count: 0,
    },
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.sessions.items = action.payload;
    });
    builder.addCase(fetchMine.fulfilled, (state, action) => {
      state.sessions.items = action.payload;
    });

    builder.addCase(fetchsession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
    builder.addCase(sendsession.fulfilled, (state, action) => {
      state.session = action.payload;
    })
    builder.addCase(editsession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
  },
});
// console.log(counterSlice.actions);

// export const { courses } = counterSlice.actions;
export default sessionsSlice.reducer;