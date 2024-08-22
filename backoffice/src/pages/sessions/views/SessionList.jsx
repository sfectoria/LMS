import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { deletesession} from "../../../store/courses";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";

import { Link, NavLink, useNavigate } from "react-router-dom";
// import PopUp from "./PopUp";
import Modal from "react-bootstrap/Modal";
import { fetchSessions, deletesession, fetchMine } from "../../../store/sessions";

export default function CourseList() {
  const sessions = useSelector((state) => state.sessionsSlice.sessions.items);
  const [modalShow, setModalShow] = useState(false);

  const [deletedId, setDeletedId] = useState("");
  console.log(deletedId,"session id")

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchMine());
  }, [dispatch]);

  //   const deleteCourse=(id)=>{
  //     dispatch(deletecourse(id));
  //     window.location.reload();
  // }

  const navigate = useNavigate();
  return (
    <div>
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
            Welcome to sessions page
          </h3>

          <div className=" p-5">
            {/* <button
              className="btn"
              style={{ backgroundColor: "#ffc107" }}
              onClick={() => navigate("add")}
            >
              + Add new session
            </button> */}
            {/* <AddCourse setIsOpen={setIsOpen} isOpen={isOpen} /> */}
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center py-3 gap-5">
        {sessions?.map((card) => (
          <Card style={{ width: "23rem" }}>
            <CardMedia
              style={{ objectFit: "cover" }}
              component="img"
              alt="green iguana"
              height="140"
              image={card.imageURL}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="py-2"
                style={{ height: "4rem" }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ height: "6rem" }}
              >
                {card.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.duration}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  navigate(`${card.id}`);
                }}
                variant="outlined"
              >
                Learn more
              </Button>
              {/* <Button
                size="small"
                onClick={() => {
                  navigate(`update/${card.id}`);
                }}
                variant="outlined"
                color="secondary"
              >
                Update
              </Button> */}
              {/* <Button
                size="small"
                onClick={() => {
                  setModalShow(true);
                  setDeletedId(card.id);
                }}
                variant="outlined"
                color="error"
              >
                Delete
              </Button> */}
            </CardActions>
          </Card>
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
            Delete session
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this session ?</p>
        </Modal.Body>
        <div className="d-flex justify-content-center gap-2 py-3">
          <Button onClick={() => setModalShow(false)}>Cancle</Button>

          <Button
            className="btn btn-danger"
            onClick={() => {
              dispatch(deletesession(deletedId));
              setModalShow(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
