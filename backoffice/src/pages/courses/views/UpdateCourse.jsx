import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../../router/Router";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchcourse, updateCourse } from "../../../store/courses";
import axios from "axios";

export default function UpdateCourse() {
  const [updatedcourse, setUpdatedcourse] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageURL, setimageURL] = useState(null);
  const [videoURL, setvideoURL] = useState(null);
  const course = useSelector((state) => state.coursesSlice.course);
  let { courseId } = useParams();
  console.log(courseId, "Update Course");
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setimageURL(e.target.files[0]);
    }
  };
  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setvideoURL(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedcourse({ ...updatedcourse, [name]: name === "price" ? +value : value });
  };
  console.log(updatedcourse)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let auxCourse = { ...updatedcourse };
      if (imageURL) {
        const formData = new FormData();
        formData.append("file", imageURL);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxCourse = { ...auxCourse, imageURL: response.data.path };
      }
      if (videoURL) {
        const formData = new FormData();
        formData.append("file", videoURL);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxCourse = { ...auxCourse, videoURL: response.data.path};
      }
      console.log(auxCourse, "auxCourse");
      
      dispatch(updateCourse({ body: auxCourse, id: +courseId })).then((res) => {
        if (!res.error) navigate(`/courses/details/${courseId}`);
        else alert("you should fill the form");
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    dispatch(fetchcourse(courseId));
    window.scrollTo(0, 0);
  }, []);
  
    return (
      <div>
        
          <div class="container py-5">
            <div class="row">
              <div class="col-lg-4">
                <div class="card mb-4">
                  <div
                    class="card-body text-center"
                    style={{ height: "34rem" }}
                  >
                    <img
                      src={course?.imageURL}
                      alt="avatar"
                      class="rounded-circle img-fluid"
                      style={{ width: "17rem" }}
                    />
                    <p class="text-muted mb-4 py-3">Course Image</p>
                    <Form>
                      <p class="text-muted mb-1">
                        <Form.Control
                          accept="image/*"
                          type="file"
                          name="imageURL"
                          placeholder="Course photo"
                          onChange={handleImageChange}
                        />
                      </p>
                      <p class="text-muted mb-4 py-3">Course Video</p>
                      <p class="text-muted mb-1">
                        <Form.Control
                          accept="video/*"
                          type="file"
                          name="videoURL"
                          placeholder="Course video"
                          onChange={handleVideoChange}
                        />
                      </p>

                      <div class="d-flex justify-content-center py-4">
                        <Button
                          style={{ width: "7rem" }}
                          variant="warning"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Save
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
              <div style={{ width: "48rem" }} class="col-lg-8">
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Course Title</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          <Form.Control
                            type="text"
                            name="title"
                            placeholder="name"
                            onChange={handleChange}
                          
                          />
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Course description</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          <Form.Control
                            onChange={handleChange}
                            name="description"
                            as="textarea"
                            rows={3}
                            placeholder="please enter the course description"
                          />
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">price</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          <input
                            className="w-75 form-control"
                            type="number"
                            min={0}
                            name="price"
                            placeholder="please enter the course price"
                            onChange={handleChange}
                          />
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <h3
                        className="text-center py-3"
                        style={{ color: "#ffca2c" }}
                      >
                        Add gallery
                      </h3>
                      <div class="col-sm-3">
                        <p class="mb-0">photo 1</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          <Form.Control
                            type="tel"
                            name="src"
                            onChange={handleChange}
                          />
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Photo 2</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          <Form.Control
                            type="tel"
                            name="src1"
                            onChange={handleChange}
                          />
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="mb-0">Photo 3</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {" "}
                          <Form.Control
                            type="text"
                            name="src2"
                            onChange={handleChange}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
     
      </div>
    );
  

}
