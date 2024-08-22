import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  fetchprogram } from "../../../store/Program";
import { Link, useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import { IoIosAddCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";


export default function ProgramDetails() {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((store) => store.auth.me);
  const program = useSelector((state) => state.ProgramSlice.program);
 console.log(program,"this is programe")
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchprogram(id));
    // dispatch(fetchCourses())
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex flex-wrap">
          <p
            className="px-5 py-4 d-flex flex-wrap "
            style={{ fontSize: "2rem", fontFamily: "Dancing Script " }}
          >
            {program?.title}
          </p>
          {/* <div>

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
          </div> */}
        </div>
      </div>

      <div className="d-flex justify-content-center py-1">
        <img src={program?.imageURL} alt="" style={{ width: "40rem" }} />
      </div>

      <div className="d-flex justify-content-center "></div>
      <p className="px-5 py-4">Description:{program?.description}</p>

      {program?.ProgramCourse?.map((pm, i) => (
        <div className="px-3" key={i}>
          <div className="d-flex gap-3 justify-content-between w-100 align-items-center">
            <div className="d-flex gap-3">
              <img src={pm.course.imageURL} alt="" style={{ width: "4rem" }} />
              <Link to={`/courses/details/${pm.course.id}`}>
                <p>{pm.course.title} </p>
              </Link>
            </div>
           
          </div>

          <p className="text-center"></p>
        </div>
      ))}
    </div>
  );
}
