import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchsession = createAsyncThunk("fetchsession", async (id) => {
    try {
      const response = await axios.get("http://localhost:5000/sessions/" + id);
      return response.data;
    } catch (error) {
      console.error("Error fetching session:", error);
      throw error;
    }
  });


export const sessionusersSlice = createSlice({
    name: "sessionusers",
    initialState: {
      sessionu: null,
      sessions: {
        items: [],
        count: 0,
      },
    },
  
    reducers: {},
    extraReducers(builder) {
    
  
      builder.addCase(fetchsession.fulfilled, (state, action) => {
        state.sessionu = action.payload;
      });
    
 
    },
  });

  export default sessionusersSlice.reducer;