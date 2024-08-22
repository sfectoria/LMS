import React from "react";
import { useDrag } from "react-dnd";

export default function Mobile({ lesson }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "lesson",
   
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      id={lesson.id}
      ref={drag}
      className={`card d-flex justify-content-center ${
        isDragging ? "opacity-25" : "opacity-100"
      } `}
      style={{ width: "20rem" }}
    >
      <p className="text-center">{lesson.title}</p>
    </div>
  );
}
