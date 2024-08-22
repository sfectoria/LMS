import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCheckpointWithResponseOfCurrentUser,
  fetchlessoncontent,
} from "../../store/Lessoncontent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
export default function Result() {
  const { CourseDetails, lessonId, contentId } = useParams();

  const dispatch = useDispatch();
  const checkpoint = useSelector(
    (state) => state.lessoncontentSlice.lessoncontent
  );
  useEffect(() => {
    dispatch(fetchCheckpointWithResponseOfCurrentUser(contentId));
  }, [dispatch]);
  return (
    <div>
      <div className="card w-100">
        <div>
          <div className="d-flex gap-2 justify-content-center py-3 ">
            <h3 style={{ color: "#42b1bc" }}>{"Lesson"}</h3> <h3>:</h3>{" "}
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
                        border: "3px solid",
                        borderColor: proposal.isCorrect ? "green" : "red",
                        backgroundColor: "background.paper",
                      }}
                      className="d-flex px-2"
                    >
                      <ListItem>
                        <ListItemText primary={proposal.label} />
                      </ListItem>
                      <Divider component="li" />

                      <Checkbox
                        // color="success"
                        checked={proposal?.userResponses.some(
                          (response) => response.propositionanswerId
                        )}
                      />
                    </List>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
