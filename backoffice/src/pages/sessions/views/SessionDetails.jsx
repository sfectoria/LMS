import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchsession } from "../../../store/sessions";
import { Button, CardActionArea, Chip, Dialog, MenuItem, Modal, OutlinedInput, Select } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Accordion from "react-bootstrap/Accordion";
import video1 from "../../../assets/videos/html css botstrap.mp4";
import Card from "react-bootstrap/Card";
import ChatSession from "../components/ChatSession";
import chatchat from "../../../assets/images/icons8-facebook-messenger.gif";
import Typography from "@mui/material/Typography";
import Cardmui from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { orange, cyan } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BiSolidMessageDetail } from "react-icons/bi";
import chat from "../../../assets/images/AnimationChat.json";
import { IoIosAddCircle } from "react-icons/io";

import { fetchlessoncontents } from "../../../store/Lessoncontent";
import { sendweek } from "../../../store/weeks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  p: 4,
};
function SessionDetails() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { sessionId } = useParams();
  const [week, setweek] = useState({});
  const [weekcontents, setweekcontents] = useState([]);
  const lessoncontent = useSelector(
    (state) => state.lessoncontentSlice.lessoncontents.items
  );
  const session = useSelector((state) => state.sessionsSlice.session);

  //chat
  const [state, setState] = React.useState({
    bottom: false,
  });
  console.log(state, "state");
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 700 }}
      // role="presentation"
    >
      <ChatSession setState={setState} state={state} />
    </Box>
  );

  const theme = createTheme({
    palette: {
      primary: orange,
      secondary: cyan,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const [rows, setRows] = useState([]);
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Adresse email",
      type: "number",
      width: 200,
      editable: false,
    },
  ];
  console.log(session?.SessionUser.image, "session users");
  const users = useSelector((state) => state.userSlice.users.items);
  console.log(session, "this is session");
const handleChange = (e) => {
  const { name, value } = e.target;
  setweek({ ...week, [name]: name === "price" ? +value : value });
};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchsession(sessionId));
  }, [dispatch]);

  useEffect(() => {
    if (session) {
      setRows(session.SessionUser.map((elem) => elem.user));
    }
    dispatch(fetchlessoncontents());
  }, [session]);

  //CARDMUI
  const user = useSelector((store) => store.auth.me);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let auxweek = { ...week, sessionId: +sessionId, contentweek: weekcontents };

    console.log(auxweek);

    dispatch(sendweek(auxweek)).then((res) => {
      if (!res.error)
        window.location.href = `http://localhost:3000/sessions/${sessionId}/session`;
    });
  } catch (err) {
    console.log(err);
  }
};
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="position-fixed" style={{ top: "50%", right: 0 }}>
        <Button onClick={toggleDrawer("right", true)} className="flex-column">
          <dotlottie-player
            src="https://lottie.host/56e0ab0c-f410-4968-b238-6df338baa93f/DSBPk1wbsI.json"
            background="transparent"
            speed="1"
            style={{ width: 50, height: 50 }}
            loop
            autoplay
          ></dotlottie-player>
          {/* <span>Chat</span> */}
        </Button>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex flex-wrap">
          <p className="px-5 py-4" style={{ fontSize: "2rem" }}>
            {session?.title}
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
        {(user.role === "Manager" || user.role === "Teacher") && (
          <div className=" p-5">
            <button
              className="btn"
              style={{ backgroundColor: "#ffc107" }}
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              + Add new week
            </button>
            {/* <AddCourse setIsOpen={setIsOpen} isOpen={isOpen} /> */}
          </div>
        )}
      </div>

      {session?.videoURL && (
        <video
          id="bannerVideo"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "40rem" }}
          className="px-5"
        >
          <source src={session?.videoURL} type="video/mp4" />
        </video>
      )}
      <div className="d-flex justify-content-center "></div>
      <p className="px-5 py-3">
        Program description: {session?.program.description}
      </p>
      <p className="px-5 ">Duration: {session?.duration}</p>

      <h1
        style={{ fontFamily: "Fathers", color: "#42b1bc" }}
        className="text-center"
      >
        Students:
      </h1>
      <div
        style={{ display: "flex" }}
        className=" justify-content-center gap-5 py-3 align-items-center flex-wrap"
      >
        {session?.SessionUser.map((elem) => (
          <div>
            {elem.user.role === "Student" && elem.user.archived === false && (
              <div>
                <Avatar
                  alt="Avatar"
                  src={elem.user.image}
                  sx={{ width: 70, height: 70 }}
                  style={{ objectFit: "fill" }}
                />
                <div className="d-flex gap-2 py-2 text-center">
                  <p>{elem.user.firstName}</p>
                  <p>{elem.user.lastName}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <h1
        style={{ fontFamily: "Fathers", color: "#42b1bc" }}
        className="text-center"
      >
        Teachers:
      </h1>
      <div className=" d-flex justify-content-center align-items-center flex-wrap ">
        {session?.SessionUser.map((elem) => (
          <div>
            {elem.user.role === "Teacher" && (
              <div className="d-flex justify-content-center gap-3 align-items-center">
                <div className=" p-3   ">
                  {/* <Image src={this.props.src} roundedCircle   /> */}
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={elem.user.image}
                      alt=""
                      style={{
                        width: "7rem",
                        height: "7rem",
                        borderRadius: "70%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <p className="d-flex justify-content-center">
                      {elem.user.firstName}
                    </p>
                    <p className="d-flex justify-content-center">
                      {elem.user.lastName}
                    </p>
                  </div>
                  <span
                    className=" text-muted d-flex justify-content-center "
                    style={{ color: "#11354D" }}
                  >
                    {elem.user.role}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end ">
        <Drawer
          sx={{ zIndex: 1202 }}
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </div>
      {/* <img
        className=" py-1"
        src={chatchat}
        data-bs-toggle="collapse"
        data-bs-target="#multiCollapseExample2"
        aria-expanded="false"
        aria-controls="multiCollapseExample2"
        style={{ width: "3rem", height: "3rem", float: "right" }}
      /> */}
      {/* <div class="col">
        <div class="collapse multi-collapse" id="multiCollapseExample2">
          <div
            style={{
              width: "30rem",
              height: "1rem",
              float: "right",
              zIndex: 10,
            }}
          >
            <ChatSession />
          </div>
        </div>
      </div> */}
      <div className=" d-flex justify-content-center">
        {/* <Cardmui sx={{ maxWidth: 900 }}>
          <CardHeader /> */}

        {/* <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div className="d-flex flex-wrap justify-content-center py-5 gap-5 ">
                <ThemeProvider theme={theme}>
                  <Button variant="contained">Membres</Button>
                </ThemeProvider>
              </div>
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box> */}
        {/* {session?.SessionUser.map((elem) => (
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {elem.user.firstName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {elem.user.lastName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))} */}
      </div>
      <div className="px-3 py-2" style={{ zIndex: 5 }}>
        {session?.Week.map((week) => (
          <div className="px-3">
            <Accordion className=" d-flex justify-content-center">
              <Accordion.Item eventKey="0" className="w-100">
                <Accordion.Header className="w-100 ">
                  <div className="d-flex gap-3 justify-content-between w-100 align-items-center">
                    <div>
                      <p>{week.title}</p>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {week?.WeekContent.map((contentweek) => (
                    <div className="d-flex gap-3 py-3 flex-wrap">
                      <Card className="w-100  ">
                        <div className="d-flex justify-content-between px-3">
                          <div>
                            <Link
                              to={
                                contentweek?.LessonContent?.type ===
                                "checkpoint"
                                  ? `/checkpoint/${contentweek.id}`
                                  : contentweek.LessonContent.contentURL
                              }
                              underline="hover"
                              className="p-2"
                            >
                              {contentweek.LessonContent.contentname}
                            </Link>
                          </div>
                          {(user.role === "Manager" ||
                            user.role === "Teacher") && (
                            <div>
                              <lord-icon
                                src="https://cdn.lordicon.com/fmjvulyw.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <p className="text-center"></p>
          </div>
        ))}

        {/* <Accordion className=" d-flex justify-content-center">
          <Accordion.Item eventKey="0" className="w-100">
            <Accordion.Header>week 2</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex justify-content-center">
              content of week 2
              </div>
              <Card style={{ width: "19rem", height: "15rem" }}>
              
                <Card.Body>
                 
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>


        <Accordion className=" d-flex justify-content-center">
          <Accordion.Item eventKey="0" className="w-100">
            <Accordion.Header>week 3</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex justify-content-center">
              content of week 3
              </div>
              <Card style={{ width: "19rem", height: "15rem" }}>
              
                <Card.Body>
                 
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion className=" d-flex justify-content-center">
          <Accordion.Item eventKey="0" className="w-100">
            <Accordion.Header>week 4</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex justify-content-center">
              content of week 4
              </div>
              <Card style={{ width: "19rem", height: "15rem" }}>
              
                <Card.Body>
                 
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}
      </div>

      <div>
        <Modal
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ width: "100%" }}
        >
          <Box sx={style}>
            <h3
              className="p-1 text-center"
              style={{
                fontSize: "2rem",
                color: "#42b1bc",
                fontFamily: "Brittany Signature",
              }}
            >
              Add a week to session
            </h3>

            <div class="container py-3 d-flex justify-content-center">
              <div style={{ width: "65rem" }} class="col-lg-8">
                <div class="card mb-4">
                  <Form onSubmit={handleSubmit}>
                    <div class="card-body">
                      <p class="text- text-center">{session?.title} 🧑‍💻 </p>

                      <FormGroup
                        className="mb-3 d-flex justify-content-between"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Title</Form.Label>
                        <p class="text-muted mb-0">
                          <input
                            type="text"
                            name="title"
                            placeholder="title of week"
                            className="form-control"
                            required
                            onChange={handleChange}
                          />
                        </p>

                        <hr />
                      </FormGroup>
                    </div>
                    <div class="container py-2 d-flex justify-content-center">
                      <div style={{ width: "65rem" }} class="col-lg-8">
                        <h3 className="text-center py-2">Week content</h3>

                        <Select
                          labelId="demo-multiple-chip-label"
                          className="px-3 border border-info form-control "
                          id="demo-multiple-chip"
                          multiple
                          value={weekcontents}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setweekcontents(e.target.value);
                          }}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  key={value.id}
                                  label={
                                    lessoncontent.find(
                                      (elem) => value === elem.id
                                    ).contentname
                                  }
                                />
                              ))}
                            </Box>
                          )}
                          // MenuProps={MenuProps}
                        >
                          {lessoncontent.map((LessonContent) => (
                            <MenuItem
                              key={LessonContent.id}
                              value={LessonContent.id}
                            >
                              {LessonContent.contentname}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center gap-4 py-3">
                      <button
                        className="btn"
                        style={{ backgroundColor: "#ffc107" }}
                        type="submit"
                        onSubmit={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default SessionDetails;
