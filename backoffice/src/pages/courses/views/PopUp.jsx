import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { sendcourse, fetchCourses } from "../../../store/courses";
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";

export default function PopUp({ isOpen, setIsOpen }) {
  console.log(isOpen, "isopen ");
  const courses = useSelector((state) => state.coursesSlice.courses.items);

  const [deletedId, setDeletedId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // const deleteCourse = (id) => {
  //   dispatch(deletecourse(id));
  // };

  // const deletedIdfunc = (id) => {
  //   setDeletedId(id);
  // };
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
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
          <p>Are you sure you want to delete this course ?</p>
        </Modal.Body>
        <div className="d-flex justify-content-center gap-2 py-3">
          <Button onClick={() => setIsOpen(false)}>Cancle</Button>

          <Button
            className="btn btn-danger"
            onClick={() => {
              sendcourse();
              setIsOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
