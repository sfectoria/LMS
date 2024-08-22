
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchuser } from '../../../store/UserInfo';
import { useNavigate, useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, FormLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, cyan } from '@mui/material/colors';
import Button from '@mui/material/Button';
import '../../../css/user.css';
export default function UserDetails() {
    const user = useSelector((state) => state.userSlice.user);
const { id } = useParams();
const dispatch = useDispatch();
const theme = createTheme({
  palette: {
    primary: orange, 
    secondary: cyan,
   
  },
});
useEffect(() => {
  dispatch(fetchuser(id));
}, [dispatch]);
  return ( <div>
      <Box className=" d-flex justify-content-center align-items-center">
      <Card style={{ width: "50rem" }}>
        <Box sx={{ mb: 1 }}>
          <div className="d-flex justify-content-center py-3 align-items-center flex-wrap">
            <h1
              style={{
                fontFamily: "Brittany Signature",
              }}
            >
              Personal
            </h1>
            <h1
              style={{
                fontFamily: "Brittany Signature",
                color: "rgb(66, 177, 188)",
              }}
            >
              Informations 🧑‍💻
            </h1>
            <div
              style={{
                height: "5px",
                width: "80px",
                backgroundColor: "rgb(66, 177, 188)",
                marginRight: "42px",
              }}
            ></div>
          </div>
        </Box>
        <Divider />

        <div className="d-flex justify-content-around py-3 align-items-around">
          <img
            src={user?.image}
            loading="lazy"
            alt=""
            style={{ width: "20rem", borderRadius: "100%" }}
          />
        </div>

        <div>
          <div className="d-flex justify-content-around gap-5 px-5 align-items-around">
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Typography size="sm">{user?.firstName} </Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Prenom</FormLabel>
              <Typography size="sm">{user?.lastName}</Typography>
            </FormControl>
          </div>
          <div className="d-flex justify-content-around gap-5 px-5">
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Typography size="sm">{user?.role} </Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Typography>{user?.email}</Typography>
            </FormControl>
          </div>
          <div
            className="d-flex justify-content-around gap-5 px-5"
            spacing={50}
          >
            <FormControl>
              <FormLabel>Adresse</FormLabel>
              <Typography size="sm">{user?.address}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Numero</FormLabel>
              <Typography size="sm">{user?.phone}</Typography>
            </FormControl>
          </div>
        </div>
      </Card>
    </Box>
    </div>
  

   
    
  );
}
