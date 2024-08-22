import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchcourse } from "../../../store/courses";
import { fetchlessoncontents, sendlessoncontent } from "../../../store/Lessoncontent";
import { IoIosAddCircle } from "react-icons/io";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import { CgMoreO } from "react-icons/cg";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCourse from "./AddCourse";
import PopUp from "./PopUp";
import axios from "axios";
import {
  fetchLessons,
  deletelesson,
  updatelesson,
} from "../../../store/lesson";
import { FaPen } from "react-icons/fa";
import Form from "react-bootstrap/Form";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import video1 from "../../../assets/videos/html css botstrap.mp4";
import Card from "react-bootstrap/Card";
import { MDBContainer } from "mdb-react-ui-kit";
import { FaTrashAlt } from "react-icons/fa";
import { Box, Button, ClickAwayListener, Grow, createTheme } from "@mui/material";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
export default function CourseDetails() {
  const [modalShow, setModalShow] = useState(false);
  const [modal, setModal] = useState(false);
  const { courseId } = useParams();
  const [lessonId, setlessonId] = useState(null);
  const [view, setView] = useState(null);
   const [typecontent, setTypeContent] = useState({});
   const [videoname, setvideoname] = useState(null);
   const [pdfname, setpdfname] = useState(null);
   const [exercicename, setexercicename] = useState(null);
  const [projectname, setprojectname] = useState(null);
  const [lessonIdContnet,setlessonIdContent]=useState(null);
console.log(lessonIdContnet, "lessonid content")
   const [videoUrl, setVideo] = useState(null);
   const [exercice, setExerciceUrl] = useState(null);
   const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [lessonContent, setlessonContent] = useState([]);
  const [lesson,setlesson] = useState({});
   const [PDF, setPDF] = useState(null);
   const [projectUrl, setProjectUrl] = useState(null);
  const course = useSelector((state) => state.coursesSlice.course);
    const user = useSelector((store) => store.auth.me);
    const navigate = useNavigate();

    const dispatch = useDispatch();

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  bgcolor: 'background.paper',
  p: 4,
};
   
 const handleClose = () => {
   setModal(false);
 };

    const handleVideoChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setVideo(e.target.files[0]);
      }
    };
    const handlePDFChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setPDF(e.target.files[0]);
      }
    };
    const handleExercicesChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setExerciceUrl(e.target.files[0]);
      }
    };
    const handleProjectChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setProjectUrl(e.target.files[0]);
      }
  };
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       let auxlessonContent = { ...lessonContent, lessonId:+ lessonIdContnet }
       if (videoUrl) {
         const formData = new FormData();
         formData.append("file", videoUrl);
         const response = await axios.post(
           "http://localhost:5000/upload",
           formData
         );
         auxlessonContent = {
           ...auxlessonContent,
           contentURL: response.data.path,
           type: "video",
           contentname: videoname,
         };
       }
         if (PDF) {
           const formData = new FormData();
           formData.append("file", PDF);
           const response = await axios.post(
             "http://localhost:5000/upload",
             formData
           );
           auxlessonContent = {
             ...auxlessonContent,
             contentURL: response.data.path,
             type: "pdf",
             contentname: pdfname,
           };
       }
       if (exercice) {
         const formData = new FormData();
         formData.append("file", exercice);
         const response = await axios.post(
           "http://localhost:5000/upload",
           formData
         );
         auxlessonContent = {
           ...auxlessonContent,
           contentURL: response.data.path,
           type: "exercice",
           contentname: exercicename,
         };
       }
       if (projectUrl) {
         const formData = new FormData();
         formData.append("file", projectUrl);
         const response = await axios.post(
           "http://localhost:5000/upload",
           formData
         );
         auxlessonContent = {
           ...auxlessonContent,
           contentURL: response.data.path,
           type: "project",
           contentname: projectname,
         };
       }
       console.log(auxlessonContent , "lessonContnet");

       dispatch(sendlessoncontent(auxlessonContent)).then((res) => {
         if (!res.error)
           window.location.href = `http://localhost:3000/courses/details/${courseId}`;
       });
     } catch (err) {
       console.log(err);
     }
   };

   useEffect(() => {
     dispatch(fetchcourse(courseId));
   }, [dispatch]);



  useEffect(() => {
    dispatch(fetchcourse(courseId));
    dispatch(fetchLessons());
    dispatch(fetchlessoncontents());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex flex-wrap">
          <p className="px-5 py-4" style={{ fontSize: "2rem" }}>
            {course?.title}
          </p>
          <p className=" py-4" style={{ fontSize: "2rem", color: "#42b1bc" }}>
            |
          </p>
          <p
            className=" py-4"
            style={{
              fontSize: "2rem",
              color: "#42b1bc",
              fontFamily: "Brittany Signature",
            }}
          >
            BY SFECTORIA
          </p>
        </div>
        <div className=" p-5">
          <button
            className="btn"
            style={{ backgroundColor: "#ffc107" }}
            onClick={() => {
              navigate(`/courses/${courseId}/lesson/add`);
            }}
          >
            + Add new lesson
          </button>
          {/* <AddCourse setIsOpen={setIsOpen} isOpen={isOpen} /> */}
        </div>
      </div>
      {course?.videoURL && (
        <video
          id="bannerVideo"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "40rem" }}
          className="px-5"
        >
          <source src={course?.videoURL} type="video/mp4" />
        </video>
      )}
      <div className="d-flex justify-content-center "></div>
      <p className="px-5 py-4">Description:{course?.description}</p>

      {course?.Lesson.map((lesson) => (
        <div className="px-3">
          <Accordion className=" d-flex justify-content-center">
            <Accordion.Item eventKey="0" className="w-100">
              <Accordion.Header className="w-100 ">
                <div className="d-flex gap-3 justify-content-between w-100 align-items-center">
                  <div className="d-flex gap-3">
                    <img
                      src={lesson.imageURL}
                      alt=""
                      style={{ width: "4rem" }}
                    />
                    <p>{lesson.title}</p>
                  </div>
                  <div className="px-4 d-flex gap-3">
                    <div>
                      <IoIosAddCircle
                        onClick={() => {
                          setModal(true);
                          setlessonIdContent(lesson.id);
                        }}
                      />
                    </div>
                    <div>
                      <FaTrashAlt
                        style={{ color: "red" }}
                        onClick={() => {
                          setModalShow(true);
                          setlessonId(lesson.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {lesson.LessonContent.map((content) => (
                  <div className="d-flex gap-3 py-3 flex-wrap">
                    <Card className="w-100">
                      <Link
                        to={
                          content.type === "checkpoint"
                            ? `/course/${courseId}/lesson/${lesson.id}/checkpoint/${content.id}`
                            : content.contentURL
                        }
                        underline="hover"
                        className="p-2"
                      >
                        {content.contentname}
                      </Link>
                    </Card>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <p className="text-center"></p>
        </div>
      ))}

      {/* <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this lesson ?</p>
        </Modal.Body>
        <div className="d-flex justify-content-center gap-2 py-3">
          <Button onClick={() => setModalShow(false)}>Cancle</Button>

          <Button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                updatelesson({
                  id: lessonId,
                  body: { archived: true },
                })
              ).then((res) => {
                dispatch(fetchcourse(courseId));
              });

              setModalShow(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal> */}

      {/* add lesson contnenet modal */}

      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Form onSubmit={handleSubmit}>
              <div class="container py-2 d-flex justify-content-center">
                <div class="col-lg-8">
                  <h3 className="text-center">Lesson content</h3>

                  <div
                    className="justify-content-center d-flex gap-5 py-5"
                    style={{ fontSize: "2rem" }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <lord-icon
                          onClick={() => {
                            setView(1);
                          }}
                          src="https://cdn.lordicon.com/tlvdupnp.json"
                          trigger="hover"
                          colors="primary:#16a9c7,secondary:#ebe6ef"
                          style={{ width: "100px", height: "100px" }}
                        ></lord-icon>
                        <span>Video</span>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/qwjfapmb.json"
                          trigger="hover"
                          colors="primary:#ebe6ef,secondary:#16a9c7,tertiary:#3a3347,quaternary:#e8e230,quinary:#e4e4e4"
                          style={{ width: "100px", height: "100px" }}
                          onClick={() => {
                            setView(2);
                          }}
                        ></lord-icon>
                        <span>PDF</span>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/hhclilyr.json"
                          trigger="hover"
                          colors="primary:#16a9c7"
                          style={{ width: "100px", height: "100px" }}
                          onClick={() => {
                            setView(3);
                          }}
                        ></lord-icon>
                        <span>Exercice</span>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/guqkthkk.json"
                          trigger="hover"
                          colors="primary:#16a9c7"
                          style={{ width: "100px", height: "100px" }}
                          onClick={() => {
                            setView(4);
                          }}
                        ></lord-icon>
                        <span>CheckPoint</span>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/pqrtuvvq.json"
                          trigger="hover"
                          colors="primary:#3a3347,secondary:#ebe6ef,tertiary:#16a9c7,quaternary:#f24c00,quinary:#ffc738"
                          style={{ width: "100px", height: "100px" }}
                          onClick={() => {
                            setView(5);
                          }}
                        ></lord-icon>
                        <span>Project</span>
                      </div>
                    </div>
                  </div>
                  {view === 1 ? (
                    <div class="card-body">
                      <FormGroup controlId="formBasicEmail">
                        <FormGroup
                          className="mb-3 d-flex justify-content-between"
                          controlId="formBasicEmail"
                        >
                          <Form.Label>video</Form.Label>
                          <p class="text-muted mb-0">
                            <Button
                              component="label"
                              role={undefined}
                              variant="contained"
                              tabIndex={-1}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload video
                              <input
                                type="file"
                                accept="video/*"
                                name="video"
                                required
                                onChange={handleVideoChange}
                              />
                            </Button>
                          </p>
                          <Form.Label>video Name</Form.Label>
                          <p class="text-muted mb-0">
                            <input
                              type="text"
                              name="pdfName"
                              placeholder="Video Name"
                              className="form-control  border border-info"
                              required
                              onChange={(e) => {
                                if (e.target.value) {
                                  setvideoname(e.target.value);
                                }
                              }}
                            />
                          </p>

                          <hr />
                        </FormGroup>
                      </FormGroup>
                    </div>
                  ) : (
                    ""
                  )}
                  {view === 2 ? (
                    <FormGroup
                      className="mb-3 d-flex justify-content-between"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>pdf</Form.Label>
                      <p class="text-muted mb-0">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload pdf
                          <input
                            accept="pdf/*"
                            type="file"
                            name="pdf"
                            required
                            onChange={handlePDFChange}
                          />
                        </Button>
                      </p>

                      <hr />
                      <Form.Label>pdf name</Form.Label>
                      <p class="text-muted mb-0">
                        <input
                          type="text"
                          name="pdfName"
                          placeholder="title of session"
                          className="form-control  border border-info"
                          required
                          onChange={(e) => {
                            if (e.target.value) {
                              setpdfname(e.target.value);
                            }
                          }}
                        />
                      </p>

                      <hr />
                    </FormGroup>
                  ) : (
                    ""
                  )}
                  {view === 3 ? (
                    <FormGroup
                      className="mb-3 d-flex justify-content-between"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Exercices</Form.Label>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload exercice
                        <input
                          accept="pdf/*"
                          type="file"
                          name="exercice"
                          onChange={handleExercicesChange}
                        />
                      </Button>
                      <p class="text-muted mb-0"></p>

                      <hr />
                      <Form.Label>exercice name</Form.Label>
                      <p class="text-muted mb-0">
                        <input
                          type="text"
                          name="exerciceName"
                          placeholder="title of session"
                          className="form-control  border border-info"
                          required
                          onChange={(e) => {
                            if (e.target.value) {
                              setexercicename(e.target.value);
                            }
                          }}
                        />
                      </p>

                      <hr />
                    </FormGroup>
                  ) : (
                    ""
                  )}
                  {view === 4
                    ? navigate(
                        `/courses/details/${courseId}/add/${lessonIdContnet}/checkpoint`
                      )
                    : ""}
                  {view === 5 ? (
                    <FormGroup
                      className="mb-3 d-flex justify-content-between"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>project</Form.Label>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload project
                        <input
                          accept="pdf/*"
                          type="file"
                          name="exercice"
                          onChange={handleProjectChange}
                        />
                      </Button>
                      <p class="text-muted mb-0"></p>

                      <hr />
                      <Form.Label>Project name</Form.Label>
                      <p class="text-muted mb-0">
                        <input
                          type="text"
                          name="exerciceName"
                          placeholder="title of session"
                          className="form-control  border border-info"
                          required
                          onChange={(e) => {
                            if (e.target.value) {
                              setprojectname(e.target.value);
                            }
                          }}
                        />
                      </p>

                      <hr />
                    </FormGroup>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">

              <button
                className="btn btn-warning"
                type="submit"
                onSubmit={handleSubmit}
              >
                save
              </button>
              </div>
            </Form>
          </div>
        </Box>
      </Modal>

      {/* <BootstrapDialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        style={{width: '100%'}}
      >
        
      </BootstrapDialog> */}
    </div>
  );
}
