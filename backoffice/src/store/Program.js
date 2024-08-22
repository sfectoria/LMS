import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchprograms = createAsyncThunk("fetchprograms", async () => {
  try {
    const response = await axios.get("http://localhost:5000/programs");
    return response.data;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
});
export const fetchprogram = createAsyncThunk("fetchprogram", async (id) => {
  try {
    const response = await axios.get("http://localhost:5000/programs/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching program:", error);
    throw error;
  }
});
//addprogram
// Action types
export const PROGRAM_ADDED = "PROGRAM_ADDED";
export const PROGRAM_ADD_FAILED = "PROGRAM_ADD_FAILED";

// Action creators
export const programAdded = (program) => ({
  type: PROGRAM_ADDED,
  payload: program,
});

export const programAddFailed = (error) => ({
  type: PROGRAM_ADD_FAILED,
  payload: error,
});

export const sendprogram = createAsyncThunk("addprogram", async (body) => {
  const response = await axios.post("http://localhost:5000/programs", body);
  console.log(response.data, " this is prohgram data");
  return response.data;
});

export const updateProgram = createAsyncThunk(
  "updateProgram",
  async (args, { dispatch }) => {
    const { id, body } = args;
    try {
      const response = await axios.patch(
        "http://localhost:5000/programs/" + id,
        body
      );

      dispatch(fetchprogram(id));
      return response.data;
    } catch (error) {
      console.error("Error updating program:", error);
      throw error;
    }
  }
);

export const deleteprogram = createAsyncThunk(
  "deleteprogram",
  async (id, { dispatch }) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/programs/" + id
      );

      dispatch(fetchprograms());
      return response.data;
    } catch (error) {
      console.error("Error deleting program:", error);
      throw error;
    }
  }
);

 const ProgramSlice = createSlice({
  name: "programs",
  initialState: {
    program: null,
    programs: {
      items: [],
      count: 0,
    },
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchprograms.fulfilled, (state, action) => {
      state.programs.items = action.payload;
    });
    builder.addCase(fetchprogram.fulfilled, (state, action) => {
      state.program = action.payload;
    });
     builder.addCase(sendprogram.fulfilled, (state, action) => {
       state.program = action.payload;
     });
  },
});
// console.log(counterSlice.actions);

// export const { courses } = counterSlice.actions;
export default ProgramSlice.reducer;
