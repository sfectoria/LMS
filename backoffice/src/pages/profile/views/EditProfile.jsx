import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../../router/Router";
import { useNavigate } from "react-router-dom";

import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import { useDispatch, useSelector } from "react-redux";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";

import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { edituser } from "../../../store/UserInfo";
import { updateProfile } from "../../../store/auth";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myInfo = useSelector((state) => state.auth.me);
  const [user, updateuser] = useState({});
  const [image, setimage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateuser({ ...user, [name]: name === "phone" ? +value : value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setimage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let auxUser = { ...user };
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      auxUser = { ...auxUser, image: response.data.path };
    }
    dispatch(updateProfile(auxUser)).then((res) => {
      if (!res.error) window.location.pathname="/profile";
      else alert("you should fill the form");
    });
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Edit Profile</Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img src={myInfo.image} loading="lazy" alt="" />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1} >
                <Form.Label>Image</Form.Label>
                <p class="text-muted mb-1">
                  <Form.Control
                    accept="image/*"
                    type="file"
                    name="image"
                    placeholder="User photo"
                    onChange={handleFileChange}
                  />
                </p>
                <FormLabel>firstName</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    type="text"
                    name="firstName"
                    placeholder=" first name"
                    onChange={handleChange}
                    defaultValue={myInfo.firstName}
                  />
                </FormControl>
                <FormLabel>lastName</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    onChange={handleChange}
                    defaultValue={myInfo.lastName}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Adress</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    type="text"
                    name="address"
                    placeholder="adress"
                    onChange={handleChange}
                    defaultValue={myInfo.address}
                  />
                </FormControl>
                <FormLabel>Phone</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    type="tel"
                    name="phone"
                    placeholder="phone"
                    onChange={handleChange}
                    defaultValue={myInfo.phone}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    startDecorator={<EmailRoundedIcon />}
                    defaultValue={myInfo.email}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>password</FormLabel>
                  <Input
                    size="sm"
                    type="password"
                    // type="text"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>Confirm your password</FormLabel>
                  <Input
                    size="sm"
                    type="password"
                    placeholder="confirm your password"
                    name="password"
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </div>
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                type="submit"
                onSubmit={handleSubmit}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
