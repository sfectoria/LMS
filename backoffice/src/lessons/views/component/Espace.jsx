import React from "react";
import { useDrop } from "react-dnd";

export default function Espace({ dropList, setSelectedItem }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "lesson",
    drop: (item) => addItemToSection(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const addItemToSection = (elem) => {
    setSelectedItem(elem);
    console.log(elem, "drop");
  };

  return (
    <div
      className={`card rounded-md  ${isOver ? "bg-secondary" : ""}`}
      style={{ width: "50rem" }}
      ref={drop}
    >
      {dropList.map((lesson,i) => (
        <div
          key={i}
          className={`card d-flex justify-content-center  `}
          style={{ width: "20rem" }}
        >
          <p className="text-center">{lesson.title}</p>
        </div>
      ))}
    </div>
  );
}
