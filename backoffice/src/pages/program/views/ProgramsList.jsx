import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteprogram,
  fetchprograms,
  sendprogram,
} from "../../../store/Program";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchCourses } from "../../../store/courses";
import axios from "axios";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import PopUp from "./PopUp";
 
import Modal from "react-bootstrap/Modal";
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

export default function ProgramsList() {
  const programs = useSelector((state) => state.ProgramSlice.programs.items);
  console.log(programs, "those are programs");
  const courses = useSelector((state) => state.coursesSlice.courses.items);
  console.log(courses, "those are courses");
  const programcreated = useSelector((state) => state.ProgramSlice.program);
  const [modalShow, setModalShow] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [program, setprogram] = useState({ courses: [] });
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();
 const user = useSelector((store) => store.auth.me);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setprogram({ ...program, [name]: name === "price" ? +value : value });
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let auxProgram = { ...program };
      if (imageUrl) {
        const formData = new FormData();
        formData.append("file", imageUrl);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxProgram = { ...auxProgram, imageURL: response.data.path };
      }

      dispatch(sendprogram(auxProgram)).then((res) => {
        if (!res.error)
          window.location.href = `http://localhost:3000/programs/details/${res.payload.id}`;
        else alert("you should fill the form");
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchprograms());
    dispatch(fetchCourses());
  }, [dispatch]);

  const deleteProgram = (id) => {
    dispatch(deleteprogram(id));
  };

  const navigate = useNavigate();
  const deletedIdfunc = (id) => {
    setDeletedId(id);
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3
          className="p-5"
          style={{
            fontFamily: "Segoe UI",
            color: "#11354D",
            textDecoration: "underline",
          }}
        >
          Welcome to programs page
        </h3>
        <div className=" p-5">
          <button
            className="btn"
            style={{ backgroundColor: "#ffc107" }}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            + Add new program
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center py-3 gap-5 ">
        {programs.map((card) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              style={{ objectFit: "cover" }}
              component="img"
              alt="green iguana"
              height="140"
              image={card.imageURL}
            />
            <CardContent style={{ height: "15rem" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="py-2"
              >
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  navigate(`details/${card.id}`);
                }}
                variant="outlined"
              >
                Learn More
              </Button>
              <Button
                size="small"
                onClick={() => {
                  navigate(`update/${card.id}`);
                }}
                variant="outlined"
                color="secondary"
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
              >
                Delete
              </Button>
            </CardActions>
          </Card>
          // <Card style={{ width: "21rem", height: "28rem" }}>
          //   <Card.Img
          //     variant="top"
          //     src={card.imageURL}
          //     style={{ height: "11rem" }}
          //     className="thumb-img"
          //   />
          //   <Card.Body>
          //     <Card.Title style={{ width: "18rem", height: "4rem" }}>
          //       {card.title}
          //     </Card.Title>
          //     <Card.Text style={{ width: "18rem", height: "7rem" }}>
          //       {card.description}
          //     </Card.Text>
          //     <div style={{height:"3rem"}}>

          //     <div className="d-flex gap-3" >
          //       <Link to={`details/${card.id}`}>
          //         <button className="btn btn-primary">See more</button>
          //       </Link>
          //       <button
          //         className="btn btn-warning"
          //         onClick={() => {
          //           navigate(`update/${card.id}`);
          //         }}
          //       >
          //         Update
          //       </button>
          //       <button
          //         className="btn btn-danger"
          //         onClick={() => {
          //           setModalShow(true);
          //          deletedIdfunc(card.id);
          //         }}
          //       >
          //         Delete
          //       </button>
          //     </div>
          //     </div>
          //   </Card.Body>
          // </Card>
        ))}
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete program
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this program ?</p>
        </Modal.Body>
        <div className="d-flex justify-content-center gap-2 py-3">
          <Button onClick={() => setModalShow(false)}>Cancle</Button>

          <Button
            className="btn btn-danger"
            onClick={() => {
              deleteProgram(deletedId);
              setModalShow(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>

      {/* add program */}

      {isOpen && (
        <div className="position-fixed w-100 h-100" style={{ zIndex: 99 }}>
          {/* <Modal
          show={isOpen}
          onHide={() => setIsOpen(false)}
          size="lg"
          
          aria-labelledby="contained-modal-title-vcenter"
          centered
        > */}
          <BootstrapDialog
            onClose={() => setIsOpen(false)}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <Modal.Header className="d-flex justify-content-center" >
              <Modal.Title
                className="py-3"
                style={{ fontFamily: "Brittany Signature" }}
                id="contained-modal-title-vcenter"
              >
                <h3>Add Program</h3>
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
                      required
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
                      required
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
                      required
                    />
                  </Form.Group>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Courses</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      name="ProgramCourse"
                      value={program.courses}
                      onChange={(e) => {
                        setprogram({
                          ...program,
                          courses: [...e.target.value],
                        });
                      }}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value.id} label={value.title} />
                          ))}
                        </Box>
                      )}
                      // MenuProps={MenuProps}
                    >
                      {courses.map((course) => (
                        <MenuItem key={course.id} value={course}>
                          {course.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      onSubmit={handleSubmit}
                    >
                      Add
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal.Body>
            {/* </Modal> */}
          </BootstrapDialog>
        </div>
      )}
    </div>
  );
}
