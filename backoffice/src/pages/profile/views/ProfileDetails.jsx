
import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../router/Router";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";

export default function ProfileDetails() {
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);
  const myInfo=useSelector(state=>state.auth.me)
  const user = useSelector((state) => state.userSlice.user);
  console.log(myInfo,"infooooooo");
  return (
      <Box sx={{ flex: 1, width: '100%' }}>
        <Stack
          spacing={4}
          sx={{
            display: 'flex',
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Card>
            <Box sx={{ mb: 1 }}>
            <p class="text-muted mb-4">SFECTORIAN ✌️</p>
              <Typography level="title-md"> Personal Information</Typography>
              
            </Box>
            <Divider />
  
            <Stack
              direction="column"
              
              spacing={3}
              sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
            >
              <Stack direction="column"  alignItems="center" justifyContent="center" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={200}
                  sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                >
                  <img
                    src={myInfo.image}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </Stack>
              
              
              <Stack spacing={2} sx={{ flexGrow: 1}}>
              <Stack direction="row" spacing={15} >
                  <FormControl>
                    <FormLabel>Firstname</FormLabel>
                    <Typography size="sm">{myInfo.firstName} </Typography>  
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>LastName</FormLabel>
                    <Typography size="sm" sx={{ flexGrow: 1 }}>{myInfo.lastName}</Typography>
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={15}>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Typography size="sm">{myInfo.role}  </Typography>  
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Typography size="sm" sx={{ flexGrow: 1 }}>{myInfo.email}</Typography>
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={15}>
                  <FormControl>
                    <FormLabel>Adress</FormLabel>
                    <Typography size="sm">{myInfo.address}</Typography>  
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Phone</FormLabel>
                    <Typography size="sm" sx={{ flexGrow: 1 }}>{myInfo.phone}</Typography>
                  </FormControl>
                </Stack>
                
              </Stack>
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
            >
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1}>
                  <AspectRatio
                    ratio="1"
                    maxHeight={108}
                    sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                  >
                    <img
                      src={myInfo.image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </Stack>
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl
                    sx={{
                      display: {
                        sm: 'flex-column',
                        md: 'flex-row',
                      },
                      gap: 2,
                    }}
                  >
                    <Typography size="sm">{myInfo.firstName}</Typography> 
                    </FormControl>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl
                    sx={{
                      display: {
                        sm: 'flex-column',
                        md: 'flex-row',
                      },
                      gap: 2,
                    }}
                  >
                    <Typography size="sm">{myInfo.lastName}</Typography>
                  </FormControl>
                </Stack>
              </Stack>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Typography size="sm">{myInfo.role} </Typography> 
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <Typography
                  size="sm" sx={{ flexGrow: 1 }}>{myInfo.email}</Typography>
              </FormControl>
              <div>
                <FormControl sx={{ display: { sm: 'contents' } }}>
                  <FormLabel>Adress</FormLabel>
                  <Typography size="sm">{myInfo.address}</Typography>
                </FormControl>
              </div>
              <div>
              <FormControl sx={{ display: { sm: 'contents' } }}>
                  <FormLabel>phone</FormLabel>
                  <Typography size="sm">{myInfo.phone}</Typography>
                </FormControl>
              </div>
            </Stack>
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Link className="text-reset text-decoration-none" to={"/profile/edit" }>
                <MdEdit size={25} variant="solid"/>
                </Link>
              </CardActions>
            </CardOverflow>
          </Card>
        </Stack>
      </Box>
    );
  
  //   <section style={{ backgroundColor: "#eee" }}>
  //     <div class="container py-5">
  //       <div class="row">
  //         <div class="col-lg-4">
  //           <div class="card mb-4">
  //             <div class="card-body text-center">
  //               <img
  //                 src={user.image}
  //                 alt="avatar"
  //                 class="rounded-circle img-fluid"
  //                 style={{ width: "150px" }}
  //               />
  //               <h5 class="my-3">{user.firstName}</h5>
  //               <p class="text-muted mb-1">Full Stack Developer</p>
  //               <p class="text-muted mb-4">SFECTORIAN ✌️</p>
  //               <div class="d-flex justify-content-center">
  //                 <button
  //                   className="btn btn-warning"
  //                   onClick={() => navigate("edit")}
  //                   style={{ width: "7rem" }}
  //                 >
  //                   Edit
  //                 </button>
  //               </div>
  //             </div>
  //           </div>

  //           <div class="card mb-4 mb-lg-0">
  //             <div class="card-body p-0">
  //               <ul class="list-group list-group-flush rounded-3">
  //                 <li class="list-group-item d-flex justify-content-between align-items-center p-3">
  //                   <div class="text-warning" style={{ fontSize: "30px" }}>
  //                     <FaLinkedin />
  //                   </div>

  //                   <a href="#" style={{ all: "unset" }} class="mb-0">
  //                     https://mdbootstrap.com
  //                   </a>
  //                 </li>
  //                 <li class="list-group-item d-flex justify-content-between align-items-center p-3">
  //                   <div style={{ fontSize: "30px", color: "#333333" }}>
  //                     <FaGithub />
  //                   </div>
  //                   <a href="#" style={{ all: "unset" }} class="mb-0">
  //                     mdbootstrap
  //                   </a>
  //                 </li>
  //                 <li class="list-group-item d-flex justify-content-between align-items-center p-3">
  //                   <div style={{ fontSize: "30px", color: "#00BAC7" }}>
  //                     <SiDiscord />
  //                   </div>
  //                   <a href="#" style={{ all: "unset" }} class="mb-0">
  //                     @mdbootstrap
  //                   </a>
  //                 </li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //         <div style={{ width: "48rem" }} class="col-lg-8">
  //           <div class="card mb-4">
  //             <div class="card-body">
  //               <div class="row">
  //                 <div class="col-sm-3">
  //                   <p class="mb-0">First Name</p>
  //                 </div>
  //                 <div class="col-sm-9">
  //                   <p class="text-muted mb-0">{user.firstName}</p>
  //                 </div>
  //               </div>
  //               <hr />
  //               <div class="row">
  //                 <div class="col-sm-3">
  //                   <p class="mb-0">Last Name</p>
  //                 </div>
  //                 <div class="col-sm-9">
  //                   <p class="text-muted mb-0">{user.lastName}</p>
  //                 </div>
  //               </div>
  //               <hr />
  //               <div class="row">
  //                 <div class="col-sm-3">
  //                   <p class="mb-0">Email</p>
  //                 </div>
  //                 <div class="col-sm-9">
  //                   <p class="text-muted mb-0">{user.Email}</p>
  //                 </div>
  //               </div>
  //               <hr />
  //               <div class="row">
  //                 <div class="col-sm-3">
  //                   <p class="mb-0">Phone</p>
  //                 </div>
  //                 <div class="col-sm-9">
  //                   <p class="text-muted mb-0">{user.Phone}</p>
  //                 </div>
  //               </div>
  //               <hr />
  //               <div class="row">
  //                 <div class="col-sm-3">
  //                   <p class="mb-0">Date of birth</p>
  //                 </div>
  //                 <div class="col-sm-9">
  //                   <p class="text-muted mb-0">{user.dateOfBirth}</p>
  //                 </div>
  //               </div>
  //               <hr />
  //               <div class="row">
  //                 <div class="col-sm-3">
  //                   <p class="mb-0">Address</p>
  //                 </div>
  //                 <div class="col-sm-9">
  //                   <p class="text-muted mb-0">{user.adress}</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="py-3">
  //             <div class="card mb-4 ">
  //               <div class="card-body">
  //                 <div class="row">
  //                   <div class="col-sm-3">
  //                     <p class="mb-0">Occupation</p>
  //                   </div>
  //                   <div class="col-sm-9">
  //                     <p class="text-muted mb-0">{user.occupation}</p>
  //                   </div>
  //                 </div>
  //                 <hr />
  //                 <div class="row">
  //                   <div class="col-sm-3">
  //                     <p class="mb-0">Studies</p>
  //                   </div>
  //                   <div class="col-sm-9">
  //                     <p class="text-muted mb-0">{user.studies}</p>
  //                   </div>
  //                 </div>
  //                 <hr />
  //                 <div class="row">
  //                   <div class="col-sm-3">
  //                     <p class="mb-0">College</p>
  //                   </div>
  //                   <div class="col-sm-9">
  //                     <p class="text-muted mb-0">{user.college}</p>
  //                   </div>
  //                 </div>
  //                 <hr />
  //                 <div class="row">
  //                   <div class="col-sm-3">
  //                     <p class="mb-0">Degree</p>
  //                   </div>
  //                   <div class="col-sm-9">
  //                     <p class="text-muted mb-0">{user.degree}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  
}
