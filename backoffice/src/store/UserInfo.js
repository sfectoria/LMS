import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

//users lkol 
export const fetchusers = createAsyncThunk("fetchusers", async () => {
  try {
    const response = await axios.get("http://localhost:5000/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

//user wehed 

export const fetchuser = createAsyncThunk("fetchuser", async (id) => {
  try {
    const response = await axios.get("http://localhost:5000/users/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
});


// Action types
export const USER_ADDED = 'USER_ADDED';
export const USER_ADD_FAILED = 'USER_ADD_FAILED';

// Action creators
export const userAdded = (user) => ({
  type: USER_ADDED,
  payload: user,
});

export const userAddFailed = (error) => ({
  type: USER_ADD_FAILED,
  payload: error,
});

export const senduser = createAsyncThunk("adduser", async (body) =>{
  const response = await axios.post("http://localhost:5000/users", body);
  return response.data;
});

export const deleteuser = createAsyncThunk("deleteuser", async (id) => {
  try {
    const response = await axios.delete("http://localhost:5000/users/" + id);
  

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
});

export const edituser = createAsyncThunk("edituser", async (args,{dispatch}) => {
  const {id , body} = args 
  try {
    const response = await axios.patch("http://localhost:5000/users/" + id, body);
  
dispatch(fetchuser(id))
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
});



export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    users: {
      items: [],
      count: 0,
    },
    },
  
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchusers.fulfilled, (state, action) => {
        state.users.items = action.payload;
    });

    builder.addCase(fetchuser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(senduser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(deleteuser.fulfilled, (state, action) => {
      state.user = action.payload;
       });
     
  },
});
// console.log(counterSlice.actions);

// export const { courses } = counterSlice.actions;
export const {addUser} = userSlice.actions;
export default userSlice.reducer;