import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLessons = createAsyncThunk("fetchlessons", async () => {
  try {
    const response = await axios.get("http://localhost:5000/lessons");
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
});
export const fetchlesson = createAsyncThunk("fetchlesson", async (id) => {
  try {
    const response = await axios.get("http://localhost:5000/lessons/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw error;
  }
});

export const updatelesson = createAsyncThunk(
  "updatelesson",
  async (args, { dispatch }) => {
    const { id, body } = args;
    try {
      const response = await axios.patch(
        "http://localhost:5000/lessons/" + id,
        body
      );

      dispatch(fetchLessons(id));
      return response.data;
    } catch (error) {
      console.error("Error updating lessons:", error);
      throw error;
    }
  }
);



export const sendlesson = createAsyncThunk("addlesson", async (body) => {
  const response = await axios.post("http://localhost:5000/lessons", body);
  console.log(response.data, " this is course data");
  return response.data;
});

export const deletelesson = createAsyncThunk(
  "deletelesson",
  async (id, { dispatch }) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/lessons/" + id
      );
      dispatch(fetchLessons());
      return response.data;
    } catch (error) {
      console.error("Error deleting lessons:", error);
      throw error;
    }
  }
);
export const  lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    lesson: null,
     lessons: {
      items: [],
      count: 0,
    },
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLessons.fulfilled, (state, action) => {
      state.lessons.items = action.payload;
    });
     builder.addCase(sendlesson.fulfilled, (state, action) => {
       state.lesson = action.payload;
     });
     builder.addCase(deletelesson.fulfilled, (state, action) => {
       state.lesson = action.payload;
     });
     builder.addCase(fetchlesson.fulfilled, (state, action) => {
       state.lesson = action.payload;
     });
    
  },
});
// console.log(counterSlice.actions);

// export const { courses } = counterSlice.actions;
export default  lessonSlice.reducer;
