import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//all courses
export const fetchCourses = createAsyncThunk("fetchCourses", async () => {
  try {
    const response = await axios.get("http://localhost:5000/courses");

    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
});

//one course
export const fetchcourse = createAsyncThunk("fetchcourse", async (id) => {
  try {
    const response = await axios.get("http://localhost:5000/courses/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
});

//delete course

export const deletecourse = createAsyncThunk("deletecourse", async (id, {dispatch}) => {
  try {
    const response = await axios.delete("http://localhost:5000/courses/" + id);
    dispatch(fetchCourses());
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
});

// Action types
export const COURSE_ADDED = "COURSE_ADDED";
export const COURSE_ADD_FAILED = "COURSE_ADD_FAILED";

// Action creators
export const courseAdded = (course) => ({
  type: COURSE_ADDED,
  payload: course,
});

export const updateCourse = createAsyncThunk(
  "updateCourse",
  async (args, { dispatch }) => {
    const { id, body } = args;
    try {
      const response = await axios.patch(
        "http://localhost:5000/courses/" + id,
        body
      );

      dispatch(fetchcourse(id));
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  }
);

export const courseAddFailed = (error) => ({
  type: COURSE_ADD_FAILED,
  payload: error,
});
export const sendcourse = createAsyncThunk("addcourse", async (body) => {
  const response = await axios.post("http://localhost:5000/courses", body);
  console.log(response.data, " this is course data");
  return response.data;
});

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    course: null,
    courses: {
      items: [],
      count: 0,
    },
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses.items = action.payload;
    });

    builder.addCase(fetchcourse.fulfilled, (state, action) => {
      state.course = action.payload;
    });
    builder.addCase(sendcourse.fulfilled, (state, action) => {
      state.course = action.payload;
    });
  },
});
// console.log(counterSlice.actions);

// export const { courses } = counterSlice.actions;
export default coursesSlice.reducer;
