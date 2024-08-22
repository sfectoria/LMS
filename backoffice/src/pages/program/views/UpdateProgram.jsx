import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProgram , fetchprogram ,   fetchprograms } from '../../../store/Program';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { fetchCourses } from '../../../store/courses';
import axios from 'axios';



export default function UpdateProgram() {

  const program = useSelector((state) => state.ProgramSlice.program);
 
    const courses = useSelector((state) => state.coursesSlice.courses.items);
   
   
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedprogram, setUpdatedprogram] = useState({ courses : []});
  console.log(updatedprogram)
   const [imageURL, setImageUrl] = useState(null);
   

    let { id } = useParams();
  console.log(id, "Update program");
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(e.target.files[0]);
    }
  };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedprogram({
        ...updatedprogram,
        [name]: name === "price" ? +value : value,
      });
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let auxProgram = { ...updatedprogram };
      if (imageURL) {
        const formData = new FormData();
        formData.append("file", imageURL);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxProgram = { ...auxProgram, imageURL: response.data.path };
      }
      dispatch(updateProgram({ body: auxProgram, id: +id })).then((res) => {
        if (!res.error) navigate("/programs");
        else alert("you should fill the form");
      })
    }
    catch (err) {
      console.log(err);
    }
  }
       
  useEffect(() => {
   dispatch(fetchprogram(id));
   dispatch(fetchCourses());
   window.scrollTo(0, 0);
 }, [dispatch]);
  return (
    <div>
      <section>
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body text-center" style={{ height: "30rem" }}>
                  <img
                    src={program?.imageURL}
                    alt="programimg"
                    class="img-fluid"
                    style={{ height: "15rem" }}
                  />
                  <h5 class="my-3"></h5>
                  <p class="text-muted mb-1">
                    <div className="py-5">
                      <Form.Control
                        type="file"
                        name="imageURL"
                        placeholder="program photo"
                        onChange={handleFileChange}
                      />
                    </div>
                  </p>

                  <div class="d-flex justify-content-center">
                    <Button
                      type="submit"
                      style={{ width: "7rem" }}
                      variant="warning"
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "48rem" , height:"100%" }} class="col-lg-8">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">program Title</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        <Form.Control
                          type="text"
                          name="title"
                          placeholder="name"
                          onChange={handleChange}
                          //   onChange={(e) => setUpdatedUser(e.target.value)}
                        />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">program description</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        <Form.Control
                          onChange={handleChange}
                          name="description"
                          as="textarea"
                          rows={3}
                          placeholder="please enter the program description"
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
                          placeholder="please enter the program price"
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
                      Update Courses
                    </h3>

                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-chip-label">
                       courses
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        // multiple
                        name="ProgramCourse"
                        value={program?.ProgramCourse.course}
                        onChange={(e) => {
                          setUpdatedprogram({
                            ...updatedprogram,
                            courses: [...e.target.value],
                          });
                        }}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} >
                            {selected.map((value) => (
                              <Chip key={value.id} label={value.title} />
                            ))}
                          </Box>
                        )}
                   
                      >
                        {courses?.map((course) => (
                          <MenuItem key={course.id} value={course}>
                            {course.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
