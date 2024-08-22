import React, { useEffect, useState } from "react";
import Session from "../../pages/sessions/Sessions";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { useDispatch, useSelector } from "react-redux";
import { sendweek } from "../../store/weeks";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Chip, Dialog, MenuItem, Modal, OutlinedInput, Select, styled } from "@mui/material";
import { fetchlessoncontents } from "../../store/Lessoncontent";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function AddWeeks() {
  const dispatch = useDispatch();
   const [isOpen, setIsOpen] = useState(false);
  const { sessionId } = useParams();
  const [week, setweek] = useState({});
  const [weekcontents, setweekcontents] = useState([]);
  const lessoncontent = useSelector(
    (state) => state.lessoncontentSlice.lessoncontents.items
  );
  const session = useSelector((state) => state.sessionsSlice.session);
  // const [session, setsession] = useState({userIds: [],});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setweek({ ...week, [name]: name === "price" ? +value : value });
  };
  useEffect(() => {
    dispatch(fetchlessoncontents());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let auxweek = { ...week, sessionId: +sessionId, contentweek: weekcontents };

      console.log(auxweek);

      dispatch(sendweek(auxweek)).then((res) => {
        if (!res.error)
          window.location.href = `http://localhost:3000/sessions/${sessionId}`;
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
   <div></div>
  );
}
