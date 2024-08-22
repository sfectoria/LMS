import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessons } from "../../store/lesson";
import Sortable from "./component/Sortable";
import { useNavigate, useParams } from "react-router-dom";

export default function LessonsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { courseId } = useParams();

  const lessons = useSelector((state) => state.lessonSlice.lessons);
  const user = useSelector((store) => store.auth.me);
  const [lessonList, setlessonList] = useState([
    {
      id: 1,
      title: "Choosen",
      tasks: [],
    },
    {
      id: 2,
      title: "exesting lessons",
      tasks: [],
    },
  ]);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  useEffect(() => {
    setlessonList([
      { id: 0, title: "choosen", tasks: [] },
      {
        id: 1,
        title: "Exesting Lessons",
        tasks: [...JSON.parse(JSON.stringify(lessons.items))],
      },
    ]);
  }, [lessons]);

  return (
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
         Add lesson to your course
        </h3>
        {user.role === "manager" && (
          <div className=" p-5">
            <button
              className="btn"
              style={{ backgroundColor: "#ffc107" }}
              onClick={() => {
                navigate(`/courses/${courseId}/lesson/add`);
              }}
            
            >
              + Add new lesson
            </button>
            {/* <AddCourse setIsOpen={setIsOpen} isOpen={isOpen} /> */}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between p-3">
        <Sortable
          id={lessonList[0].id}
          title={lessonList[0].title}
          tasks={lessonList[0].tasks}
          list={lessonList}
          setList={setlessonList}
        />
        <Sortable
          id={lessonList[1].id}
          title={lessonList[1].title}
          tasks={lessonList[1].tasks}
          list={lessonList}
          setList={setlessonList}
        />
      </div>
    </div>
  );
}
