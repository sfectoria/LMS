import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchWeeks = createAsyncThunk("fetchweeks", async () => {
    try {
      const response = await axios.get("http://localhost:5000/weeks");
      return response.data;
    } catch (error) {
      console.error("Error fetching weeks:", error);
      throw error;
    }
  });



  export const sendweek = createAsyncThunk("addweek", async (body) => {
    const response = await axios.post("http://localhost:5000/weeks", body);
    console.log(response.data, " this is week data");
    return response.data;
  });



  export const deleteweek = createAsyncThunk(
    "deleteweek",
    async (id, { dispatch }) => {
      try {
        const response = await axios.delete(
          "http://localhost:5000/weeks/" + id
        );
        dispatch(fetchWeeks());
        return response.data;
      } catch (error) {
        console.error("Error deleting weeks :", error);
        throw error;
      }
    }
  );


  export const  weekSlice = createSlice({
    name: "weeks",
    initialState: {
      week: null,
       weeks: {
        items: [],
        count: 0,
      },
    },
  
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchWeeks.fulfilled, (state, action) => {
        state.weeks.items = action.payload;
      });
       builder.addCase(sendweek.fulfilled, (state, action) => {
         state.week = action.payload;
       });
       builder.addCase(deleteweek.fulfilled, (state, action) => {
         state.week = action.payload;
       });
      
    },
  });

  export default  weekSlice.reducer;
  