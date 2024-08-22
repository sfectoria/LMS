import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editsession , fetchsession } from '../../../store/sessions';
import { fetchprograms } from "../../../store/Program";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';


export default function UpdateSession() {
  const [updatedsession, setUpdatedsession] = useState({});
  const session = useSelector((state) => state.sessionsSlice.session);
  const programs = useSelector((state) => state.ProgramSlice.programs.items);
    console.log(editsession)
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [videoURL , setvideoUrl] = useState(null);

    let { id } = useParams();
  console.log(id, "Update session");
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(e.target.files[0]);
    }
  };
 const handleVideoChange = (e) => {
   if (e.target.files && e.target.files.length > 0) {
     setvideoUrl(e.target.files[0]);
   }
 };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedsession({
        ...updatedsession,
        [name]: name === "price" ? +value : value,
      });
    };


     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
      let auxSession = { ...updatedsession };
      if (imageUrl) {
        const formData = new FormData();
        formData.append("file", imageUrl);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxSession = { ...auxSession, imageURL: response.data.path };
      }
      if (videoURL) {
        const formData = new FormData();
        formData.append("file", videoURL);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxSession  = { ...auxSession, videoURL: response.data.path };
      }
       


    dispatch(editsession({ body: auxSession, id: +id })).then((res) => {
      if (!res.error) navigate("/sessionsManager");
      else alert("you should fill the form");
    });
         }
    catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
   dispatch(fetchsession(id));
   window.scrollTo(0, 0);
 }, [dispatch]);
  return (
    <div className="d-flex justify-content-center">
      <section>
        <div class="container py-5">
          <div class="row">
            <div  class="col-lg-8">
              <div class="card mb-4 " style={{width:"50rem"}}>
                <div class="card-body">
                  <div className="d-flex justify-content-center py-3 align-items-center flex-wrap">
                    <h1
                      style={{
                        fontFamily: "Brittany Signature",
                      }}
                    >
                      Sfectoria
                    </h1>
                    <h1
                      style={{
                        fontFamily: "Brittany Signature",
                        color: "rgb(66, 177, 188)",
                      }}
                    >
                      Sessions 🧑‍💻
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
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Session Image</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        <Form.Control
                          type="file"
                          name="imageURL"
                          placeholder="program photo"
                          onChange={handleFileChange}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Session Video</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        <Form.Control
                          type="file"
                          name="imageURL"
                          placeholder="program photo"
                          onChange={handleVideoChange}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Session Title</p>
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
                      <p class="mb-0">Session description</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        <Form.Control
                          onChange={handleChange}
                          name="description"
                          as="textarea"
                          rows={3}
                          placeholder="please enter the session description"
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
                      Update Program
                    </h3>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">program </p>
                    </div>
                    <div class="col-sm-9">
                      <Form.Select
                        name="programId"
                        onChange={handleChange}
                        aria-label="Default select example"
                        required
                      >
                        <option>Open this select menu</option>
                        {programs.map((item, i) => (
                          <option value={item.id}>{item.title}</option>
                        ))}
                      </Form.Select>
                    </div>
                    <div class="d-flex justify-content-center py-4">
                      <Button
                        style={{ width: "7rem" }}
                        variant="warning"
                        onClick={handleSubmit}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
