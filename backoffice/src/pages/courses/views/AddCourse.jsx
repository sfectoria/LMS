

import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bg.jpg";
import addcourse from "../../../assets/open-book_7907682.png";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { Button } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendcourse } from "../../../store/courses";
import { showSuccessToast } from "../../../utils/toast";

export default function AddCourse() {
  const [course, setcourse] = useState({});
  const coursecreated = useSelector((state) => state.coursesSlice.course);
  console.log(coursecreated, "course created")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcourse({ ...course, [name]: name === "price" ? +value : value });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(sendcourse(course)).then((res) => {
  //     if (!res.error)
  //      window.location.href ="http://localhost:3000/courses/lesson";
  //     else
  //       alert("you should fill the form");
  //   });
  // };

  console.log(course);
  const [preview, setpreview] = useState(null);
  return (
    <div>
      <h1 className="text-center py-5" style={{ color: "#00184b" }}>Add New Course</h1>
      <div className="d-flex justify-content-center">
        <div className="px-5 " style={{ width: "70rem" }}>
          <div className="card " style={{ height: "33rem" }}>
            <div className=" d-flex">
              <div
                className="w-50 d-flex flex-column gap-5 mt-5 flex-wrap justify-content-center align-items-center"
                style={{ height: "27rem" }}
              >
                <img src={addcourse} alt="" style={{ width: "17rem" }} />
                <div className="d-flex px-5 gap-4">
                  <div>
                    <button className="btn btn-primary">back</button>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={() => {
                        dispatch(sendcourse(course)).then((res) => {
                          console.log(res, "response");
                          if (!res.error)
                            showSuccessToast('course created')
                            navigate(`/courses/${res.payload.id}/lesson`);

                        });
                      }}
                    >
                      next
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-50 py-3">
                <div className="py-2">
                  <Form>
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                      <Form.Label>image link</Form.Label>
                      <input
                        className="w-75 form-control"
                        type="text"
                        placeholder="please enter the image link"
                        name="imageURL"
                        onChange={handleChange}
                      />
                      <Form.Label>Course title</Form.Label>
                      <input
                        className="w-75 form-control"
                        type="text"
                        placeholder="please enter the course title"
                        name="title"
                        onChange={handleChange}
                      />
                      <Form.Label className="py-3 ">
                        Course description
                      </Form.Label>
                      <input
                        className="w-75 form-control"
                        style={{ height: "5rem" }}
                        type="text"
                        placeholder="please enter the Course description"
                        name="description"
                        onChange={handleChange}
                      />
                      <Form.Label className="py-1 ">Price</Form.Label>
                      <input
                        className="w-75 form-control"
                        type="number"
                        min={0}
                        onChange={handleChange}
                        name="price"
                        placeholder="please enter the course name"
                      />
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="px-5 py-3">
    //     <div className="d-flex justify-content-center">
    //       <input
    //         className="w-25 "
    //         type="image"
    //         style={{ top: "50%" }}
    //         src={
    //           preview
    //             ? URL.createObjectURL(preview)
    //             : "https://auphonic.com/media/blog/resumable_upload.png"
    //         }
    //         onClick={() => {
    //           document.getElementById("myfile").click();
    //         }}
    //       />
    //     </div>
    //     <input
    //       className="w-75"
    //       type="file"
    //       id="myfile"
    //       style={{ display: "none" }}
    //       onChange={(e) => setpreview(e.target.files[0])}
    //     />
    //     <ProgressBar now={0} />
    //     <div className="py-5">
    //       <Card className="py-3">
    //         <Form className="py-3 px-4">
    //           <Form.Group className="mb-3" controlId="formBasicEmail">
    //             <h3 className="text-warning">Add a new course</h3>
    //             <Form.Label className="py-3 ">Course cover</Form.Label>
    //             <div className="d-flex justify-content-center">
    //               <Card style={{ width: "50rem", height: "20rem" }}></Card>
    //             </div>
    //             <div className="py-3">
    //               <button className="btn btn-outline-primary"> Upload</button>
    //             </div>
    //             <Form.Label className="py-1 ">Course name</Form.Label>
    //             <input
    //               className="w-75"
    //               type="text"
    //               placeholder="please enter the course name"
    //             />
    //             <Form.Label className="py-3 ">Course description</Form.Label>
    //             <input
    //               className="w-75"
    //               style={{ height: "5rem" }}
    //               type="text"
    //               placeholder="please enter the Course description"
    //             />
    //             <Form.Label className="py-1 ">Price</Form.Label>
    //             <input
    //               className="w-75"
    //               type="number"
    //               min={0}
    //               placeholder="please enter the course name"
    //             />
    //           </Form.Group>
    //         </Form>
    //         <div className="d-flex justify-content-center gap-4">
    //           <button
    //             style={{ width: "9rem" }}
    //             className="btn btn-outline-primary"
    //             onClick={() => {
    //               navigate(-1);
    //             }}
    //           >
    //             Back
    //           </button>
    //           <button
    //             style={{ width: "9rem" }}
    //             className="btn btn-outline-primary"
    //           >
    //             Next
    //           </button>
    //         </div>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
  );
}
