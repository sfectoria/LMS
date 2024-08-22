import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchlessoncontent } from "../../store/Lessoncontent";
import { fetchlesson } from "../../store/lesson";
import { sendresponse } from "../../store/userResponses";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Form from "react-bootstrap/Form";
export default function Checkpoint() {
  const { CourseDetails, lessonId, contentId } = useParams();
  const [responses, setResponses] = useState([]);
  const dispatch = useDispatch();
  const checkpoint = useSelector(
    (state) => state.lessoncontentSlice.lessoncontent
  );
  const navigate = useNavigate()

  const lesson = useSelector((state) => state.lessonSlice.lesson);
  const user = useSelector((store) => store.auth.me);
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(sendresponse({ responses: responses })).then((res) => {
      if (!res.error) {
        alert("your response has been sent");
        navigate ('/checkpoint/'+contentId+'/result')
      }
        
    
      else alert("you should fill the form");
    });
  };
  useEffect(() => {
    dispatch(fetchlessoncontent(contentId));
    dispatch(fetchlesson(lessonId));
  }, [dispatch]);

  console.log(responses);
  return (
    <div className="card w-100">
      <Form onSubmit={handleSubmit}>
        <div className="d-flex gap-2 justify-content-center py-3 ">
          <h3 style={{ color: "#42b1bc" }}>{lesson?.title}</h3> <h3>:</h3>{" "}
          <h3>{checkpoint?.contentname}</h3>
        </div>
        {checkpoint?.questions.map((question) => (
          <div className="p-3">
            <h4>Question:</h4>
            <h5 className="py-3">{question.label}</h5>
            <div className="d-flex justify-content-between">
              {question.propositions.map((proposal) => (
                <div>
                  <List
                    sx={{
                      py: 0,
                      width: "8rem",
                      maxWidth: 360,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      backgroundColor: "background.paper",
                    }}
                    className="d-flex px-2"
                  >
                    <ListItem>
                      <ListItemText primary={proposal.label} />
                    </ListItem>
                    <Divider component="li" />

                    <Checkbox
                      color="success"
                      checked={
                        responses.find(
                          (elem) => elem?.questionId === question.id
                        )?.propositionId === proposal.id
                      }
                      onChange={() => {
                        setResponses([
                          ...responses.filter(
                            (elem) => elem?.questionId !== question.id
                          ),
                          {
                            questionId: question.id,
                            propositionId: proposal.id,
                          },
                        ]);
                      }}
                    />
                  </List>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-center py-4">
          <button
            type="submit "
            className="btn btn-warning"
            onSubmit={handleSubmit}
          >
            save
          </button>
        </div>
      </Form>
    </div>
  );
}
