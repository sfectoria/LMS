
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import addcourse from "../../../assets/open-book_7907682.png";
import { sendprogram } from '../../../store/Program';
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";

export default function AddProgram() {
  const [program, setprogram] = useState({});
  console.log(program);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [programid, setProgramid] = useState(null);
  console.log(programid);
   const handleChange = (e) => {
     const { name, value } = e.target;
     setprogram({ ...program, [name]: name === "price" ? +value : value });
   };

  return (
    <div>
      <h1 className='text-center py-4' style={{ color: "#00184b" }}>Add New program</h1>
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
                      onClick={(programid) => {
                        dispatch(sendprogram(program)).then((res) => {
                          setProgramid(program.id);
                          if (!res.error) navigate(-1);
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
  );
}
