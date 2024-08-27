import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletecourse, fetchCourses, sendcourse } from "../../../store/courses";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import { Box} from '@mui/material';
import { Link, NavLink, useNavigate } from "react-router-dom";
// import PopUp from "./PopUp";
import Modal from "react-bootstrap/Modal";
import AddCourse from "./AddCourse";
import PopUp from "./PopUp";
import axios from "axios";
import { showSuccessToast } from "../../../utils/toast";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function CourseList() {

 
  const courses = useSelector((state) => state.coursesSlice.courses.items);
  const coursecreated = useSelector((state) => state.coursesSlice.course);
  console.log(coursecreated, "course created");
  const [modalShow, setModalShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [course, setcourse] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  console.log(course);
 const user = useSelector((store) => store.auth.me);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcourse({ ...course, [name]: name === "price" ? +value : value });
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(e.target.files[0]);
    }
  };
  const handleFileChangeVideo = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoUrl(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let auxCourse = { ...course };
      if (imageUrl) {
        const formData = new FormData();
        formData.append("file", imageUrl);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxCourse = { ...auxCourse, imageURL: response.data.path };
      }
      if (videoUrl) {
        const formData = new FormData();
        formData.append("file", videoUrl);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxCourse = { ...auxCourse, videoURL: response.data.path };
      }

      dispatch(sendcourse(auxCourse)).then((res) => {
        if (!res.error) {
          showSuccessToast(' course created')
          window.location.href =
            `http://localhost:3000/courses/details/${res.payload.id}`;
        }
        else {
          
        showSuccessToast("error creating course")
          alert("you should fill the form");
        }

      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const deleteCourse = (id) => {
    dispatch(deletecourse(id));
  };

  const deletedIdfunc = (id) => {
    setDeletedId(id);
  };
  const navigate = useNavigate();


  
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3
          className="p-5"
          style={{
            fontFamily: "Poppins",
            color: "#11354D",
            textDecoration: "underline",
          }}
        >
          Welcome to courses page
        </h3>
        {user.role === "Manager" && (
          <div className=" p-5">
            <button
              className="btn"
              style={{ backgroundColor: "#ffc107" }}
              onClick={() => {
                setIsOpen(true);
                
              }}
            >
              + Add new course
            </button>
          </div>
        )}
      </div>

      <div className="d-flex flex-wrap justify-content-center py-3 gap-5 ">
        {courses.map((card) => (
          <Card sx={{ maxWidth: 345,
            
            borderRadius: 2, 
            boxShadow: 3, 
            transition: "transform 0.3s ease", 
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
               
            },
            //  background: 'linear-gradient(145deg, #f0f0f0, #dcdcdc)'
            
            }} 
          >
            <CardMedia
              style={{ objectFit: "cover" ,position: 'relative'}}
              component="img"
              alt="green iguana"
              height="140"
              image={card.imageURL}
            ></CardMedia>
            <CardContent style={{ height: "12rem" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="truncate py-2"                
              >
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardActions>
  <Box  sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingBottom:'3px' }}>
    <Button
    sx={{
    transition: "background-color 0.3s ease",
    '&:hover': {
      backgroundColor: '#CCE6FF', 
     
    },
  }}
      size="small"
      onClick={() => {
        navigate(`details/${card.id}`);
      }}
      variant="outlined" 
      startIcon={<InfoOutlinedIcon />}
    >
      Learn More
    </Button>
    {user.role === "Manager" && (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          size="small"
          onClick={() => {
            navigate(`update/${card.id}`);
          }}
          variant="outlined"
          color="success"
          startIcon={<EditOutlinedIcon />}
        >
          Update
        </Button>
        <Button
          size="small"

          onClick={() => {
            setModalShow(true);
            deletedIdfunc(card.id);
          }}
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlineIcon />} 
        >
          Delete
        </Button>
      </Box>
    )}
  </Box>
</CardActions>
          </Card>
        ))}
      </div>

      {/* delete pop up */}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="l"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton className="d-flex justify-content-center" 
          style={{ backgroundColor: '#B30000', color: 'white' }}>
          <Modal.Title  id="contained-modal-title-vcenter"  style={{ color: 'white' }}>
            Delete course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" >
          <p>Are you sure you want to delete this course ?</p>
        </Modal.Body>
        <div className="d-flex justify-content-center gap-3 py-3">
          <Button onClick={() => setModalShow(false)}>Cancel</Button>

          <Button
                 variant="danger" 

            onClick={() => {
              deleteCourse(deletedId);
              setModalShow(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>

      {/* add course */}

      <div style={{ zIndex: "9" }}>
        <BootstrapDialog
          onClose={() => setIsOpen(false)}
          aria-labelledby="contained-dialog-title-vcenter"
          open={isOpen}
        >
          <Modal.Header className="d-flex justify-content-center py-3" >
            <Modal.Title
              style={{ fontFamily: "Brittany Signature" }}
              id="contained-modal-title-vcenter"
            >
              <h3>Add Course</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="card px-4"
              style={{ width: "100%", height: "100%" }}
            >
              <Form className="py-5 px-3 " onSubmit={handleSubmit}>
                <Form.Group
                  accept="image/*"
                  className="mb-3 d-flex p-2 gap-5 "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    accept="image/*"
                    type="file"
                    name="imageURL"
                    className="px-3 border border-info"
                    placeholder="image URL"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group
                  accept="video/*"
                  className="mb-3 d-flex p-2 gap-5 "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    accept="video/*"
                    type="file"
                    name="imageURL"
                    className="px-3 border border-info"
                    placeholder="image URL"
                    onChange={handleFileChangeVideo}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex p-2 gap-5"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    className="px-3 border border-info"
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                  />
                  <Form.Control
                    name="description"
                    className="border border-info"
                    placeholder="description"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex p-2 gap-5 "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="price"
                    type="number"
                    min={0}
                    className="px-3 border border-info"
                    placeholder="Price"
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center gap-2 py-3">
                  <Button
                    type="button"
                    className="btn btn-primary"
                    style={{ color: "black" }}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancle
                  </Button>

                  <Button
                    className="btn"
                    type="submit"
                    style={{ backgroundColor: "#ffc107", color: "black" }}
                    onSubmit={
                      //   () => {
                      //   dispatch(sendcourse(course)).then((res) => {
                      //     console.log(res, "response");
                      //     if (!res.error) {
                      //       navigate(`/courses/${res.payload.id}/lesson`);
                      //       setIsOpen(false);
                      //     }
                      //   });
                      // }
                      handleSubmit
                    }
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </div>
          </Modal.Body>
        </BootstrapDialog>
      </div>
    </div>
  );
}
