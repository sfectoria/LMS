import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "react-bootstrap/Form";
import { sendlesson, fetchLessons } from "../../store/lesson";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { fetchcourse } from "../../store/courses";
import { MdVideoLibrary } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { PiProjectorScreenChartDuotone } from "react-icons/pi";
import { MdQuiz } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import axios from "axios";
export default function AddLessons() {
  const { courseId } = useParams();
  const [typecontent, setTypeContent] = useState({});
  const [videoname, setvideoname] = useState(null);
  const [pdfname, setpdfname] = useState(null);
  const [exercicename, setexercicename] = useState(null);
  const [projectname, setprojectname] = useState(null);
  const [checkpointname, setcheckpointname] = useState(null);
  console.log(videoname, "video");
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideo] = useState(null);
  const [exercice, setExerciceUrl] = useState(null);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [lesson, setlesson] = useState({ });
  const [PDF, setPDF] = useState(null);
  const [projectUrl, setProjectUrl] = useState(null);
  const [view, setView] = useState(null);
  const course = useSelector((state) => state.coursesSlice.course);
  const [questions, setQuestions] = useState([]);
  // const [question, setQuestion] = useState({
  //   label: "",
  //   scale: 1,
  //   propositions: [
  //     { label: "", isCorrect: false },
  //     { label: "", isCorrect: false },
  //     { label: "", isCorrect: false },
  //     { label: "", isCorrect: false },
  //   ],
  // });
  // const handleChangePoposition = (e, index) => {
  //   const { value } = e.target;
  //   let aux = Object.assign({}, question);
  //   aux.propositions[index].label = value;
  //   setQuestion(aux);
  // };
  // const handleChangeCheckBox = (e, index) => {
  //   const { checked } = e.target;
  //   let aux = Object.assign({}, question);

  //   aux.propositions[index].isCorrect = checked;
  //   console.log(aux.propositions[index].isCorrect);
  //   setQuestion(aux);
  // };
  // const handleAddQuestion = () => {
  //   let aux = [...questions];
  //   aux.push(question);
  //   console.log(aux);
  //   setQuestions(aux);
  //   setQuestion({
  //     label: "",
  //     scale: 0,
  //     propositions: [
  //       { label: "", isCorrect: false },
  //       { label: "", isCorrect: false },
  //       { label: "", isCorrect: false },
  //       { label: "", isCorrect: false },
  //     ],
  //   });
  // };

  // //upload file buttom
  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setlesson({ ...lesson, [name]: name === "price" ? +value : value });
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(e.target.files[0]);
    }
  };
  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let auxlesson = { ...lesson, courseId: +courseId };
      if (imageUrl) {
        const formData = new FormData();
        formData.append("file", imageUrl);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxlesson = { ...auxlesson, imageURL: response.data.path };
      }
     
      console.log(auxlesson);

      dispatch(sendlesson(auxlesson)).then((res) => {
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

  return (
    <div>
      <div className="d-flex justify-content-center py-4">
        <h3
          style={{
            fontFamily: "Segoe UI",
            color: "#11354D",

            textAlign: "center",
          }}
        >
          Add a lesson to
        </h3>
        <h3
          style={{
            fontFamily: "Segoe UI",
            color: "#ffc107",
            textDecoration: "underline",
            textAlign: "center",
          }}
        >
          {course?.title}
        </h3>{" "}
        <h3
          style={{
            fontFamily: "Segoe UI",
            color: "#11354D",

            textAlign: "center",
          }}
        >
          course
        </h3>
      </div>

      <div class="container py-3 d-flex justify-content-center">
        <div style={{ width: "65rem" }} class="col-lg-8">
          <div class="card mb-4">
            <Form onSubmit={handleSubmit}>
              <div class="card-body">
                <p class="text- text-center">{course?.title} 🧑‍💻 </p>
                <div className="d-flex gap-5 justify-content-center py-4">
                  <div>
                    <FormGroup
                      className="mb-3 d-flex gap-4 "
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Image</Form.Label>
                      <p class="text-muted mb-0">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            name="imageURL"
                            onChange={handleImageChange}
                          />
                        </Button>
                      </p>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup
                      className="mb-3 d-flex gap-4 "
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Title</Form.Label>
                      <p class="text-muted mb-0">
                        <input
                          type="text"
                          name="title"
                          placeholder="title of session"
                          className="form-control"
                          required
                          onChange={handleChange}
                        />
                      </p>

                      <hr />
                    </FormGroup>
                  </div>
                </div>
              </div>
              {/* <div class="container py-2 d-flex justify-content-center">
                <div style={{ width: "65rem" }} class="col-lg-8">
                  <h3 className="text-center">Lesson content</h3>

                  <div
                    className="justify-content-center d-flex gap-5 py-5"
                    style={{ fontSize: "2rem" }}
                  >
                    <div>
                      <button
                        type="button"
                        style={{ all: "unset" }}
                        onClick={() => {
                          setView(1);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/tlvdupnp.json"
                            trigger="hover"
                            colors="primary:#16a9c7,secondary:#ebe6ef"
                            style={{ width: "100px", height: "100px" }}
                          ></lord-icon>
                          <span>Video</span>
                        </div>
                      </button>
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
                      <FormGroup className="mb-3" controlId="formBasicEmail">
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

                        {/* <div class="d-flex justify-content-center">
              <Button style={{ width: "7rem" }} variant="warning" type="submit">
                Save
              </Button>
             </div> */}
                      {/* </FormGroup>
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
                  {view === 4 ? (
                    <div className="px-4">
                      <div className="text-center py-4">
                        <h5>checkpoint name</h5>

                        <input
                          type="text"
                          onChange={(e) => {
                            if (e.target.value) {
                              setcheckpointname(e.target.value);
                            }
                          }}
                        />
                      </div>
                      <Accordion className="px-4">
                        <AccordionSummary
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="d-flex justify-content-center align-items-center gap-3">
                            <h3 style={{ fontFamily: "-apple-system" }}>
                              Add your question
                            </h3>
                            <lord-icon
                              src="https://cdn.lordicon.com/ftndcppj.json"
                              trigger="hover"
                              colors="primary:#30c9e8,secondary:#ebe6ef"
                            ></lord-icon>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div>
                            {questions.map((question, i) => (
                              <div>
                                <div className="d-flex gap-3 justity-conent-between">
                                  <h5>{question.label}</h5>

                                  <p>{question.scale}</p>
                                </div>
                                {question.propositions.map((proposal, i) => (
                                  <div className="d-flex align-items-center">
                                    {proposal.isCorrect}
                                    <p>{proposal.label}</p>

                                    <Checkbox
                                      {...label}
                                      color="success"
                                      onChange={(e) =>
                                        handleChangeCheckBox(e, i)
                                      }
                                      checked={proposal.isCorrect}
                                    />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                          <Typography className="d-flex gap-4 align-items-center ">
                            <div>Question</div>
                            <div className="d-flex align-items-center gap-3">
                              <Form.Label>Scale:</Form.Label>
                              <p class="text-muted mb-0">
                                <input
                                  className="w-50 form-control  border border-info"
                                  type="text"
                                  name="exerciceName"
                                  placeholder="question scale"
                                  value={question.scale}
                                  onChange={(e) => {
                                    setQuestion({
                                      ...question,
                                      scale:+ e.target.value,
                                    });
                                  }}
                                />
                              </p>
                            </div>
                          </Typography>
                          <Typography>
                            <FormGroup controlId="formBasicEmail">
                              <div className="d-flex justify-content-center gap-4 py-4 ">
                                <Form.Label>Question:</Form.Label>
                                <p class="text-muted mb-0">
                                  <textarea
                                    style={{ width: "30rem" }}
                                    class="form-control"
                                    className="px-3  border border-info "
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    name="question"
                                    placeholder="question"
                                    value={question.label}
                                    onChange={(e) => {
                                      setQuestion({
                                        ...question,
                                        label: e.target.value,
                                      });
                                    }}
                                  ></textarea>
                                </p>
                              </div>
                              <div className="d-flex flex-wrap gap-4 py-3 justify-content-center">
                                <div className="d-flex align-items-center">
                                  <Form.Label className="px-4 w-75">
                                    Answer 1 :
                                  </Form.Label>

                                  <input
                                    style={{ height: "3rem" }}
                                    type="text"
                                    name="exerciceName"
                                    placeholder="answer 1"
                                    className="form-control  border border-info"
                                    onChange={(e) =>
                                      handleChangePoposition(e, 0)
                                    }
                                    value={question.propositions[0].label}
                                  />
                                  <Checkbox
                                    {...label}
                                    color="success"
                                    onChange={(e) => handleChangeCheckBox(e, 0)}
                                    checked={question.propositions[0].isCorrect}
                                  />
                                </div>
                                <div className="d-flex align-items-center">
                                  <Form.Label className="px-4 w-75">
                                    Answer 2 :
                                  </Form.Label>

                                  <div></div>
                                  <input
                                    style={{ height: "3rem" }}
                                    type="text"
                                    name="exerciceName"
                                    placeholder="Answer 2"
                                    className="form-control  border border-info"
                                    onChange={(e) =>
                                      handleChangePoposition(e, 1)
                                    }
                                    value={question.propositions[1].label}
                                  />
                                  <Checkbox
                                    {...label}
                                    color="success"
                                    onChange={(e) => handleChangeCheckBox(e, 1)}
                                    checked={question.propositions[1].isCorrect}
                                  />
                                </div>
                              </div>

                              <div className="d-flex flex-wrap gap-4 py-3 justify-content-center">
                                <div className="d-flex align-items-center">
                                  <Form.Label className="px-4 w-75">
                                    Answer 3 :
                                  </Form.Label>

                                  <input
                                    style={{ height: "3rem" }}
                                    type="text"
                                    name="exerciceName"
                                    placeholder="Answer 3"
                                    className="form-control  border border-info"
                                    onChange={(e) =>
                                      handleChangePoposition(e, 2)
                                    }
                                    value={question.propositions[2].label}
                                  />
                                  <Checkbox
                                    {...label}
                                    color="success"
                                    onChange={(e) => handleChangeCheckBox(e, 2)}
                                    checked={question.propositions[2].isCorrect}
                                  />
                                </div>
                                <div className="d-flex align-items-center">
                                  <Form.Label className="px-4 w-75">
                                    Answer 4 :
                                  </Form.Label>

                                  <input
                                    type="text"
                                    name="exerciceName"
                                    placeholder="Answer 4"
                                    className="form-control  border border-info"
                                    onChange={(e) =>
                                      handleChangePoposition(e, 3)
                                    }
                                    value={question.propositions[3].label}
                                  />
                                  <Checkbox
                                    {...label}
                                    color="success"
                                    onChange={(e) => handleChangeCheckBox(e, 3)}
                                    checked={question.propositions[3].isCorrect}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-center gap-3">
                                <button
                                  className="btn btn-warning"
                                  type="button"
                                  onClick={handleAddQuestion}
                                >
                                  Add
                                </button>
                              </div>
                            </FormGroup>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ) : (
                    ""
                  )}
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
                </div> */}
              {/* </div> */} 
              <div class="d-flex justify-content-center gap-4 py-3">
                <Button
                  style={{ width: "7rem", backgroundColor: "#ffc107" }}
                  className="btn"
                  variant="warning"
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
