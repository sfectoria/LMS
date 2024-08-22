import React from 'react'
import { ReactSortable } from "react-sortablejs";

export default function Sortable({id,title,tasks,list,setList}) {
  return (
    <div
      key={id}
      className="col-5 bg-light"
      data-group={id}
      style={{ height: "100%" }}
    >
      <div className="p-2 ">
        <h4 className="text-center">{title}</h4>
      </div>
      <ReactSortable
        list={tasks}
        setList={(newState, sortable) => {
          if (sortable) {
            const groupId =
              sortable.el.closest("[data-group]")?.getAttribute("data-group") ||
              0;
            const newList = list.map((task) => {
              if (parseInt(task.id) === parseInt(groupId)) {
                task.tasks = newState;
              }

              return task;
            });
            setList(newList);
          }
        }}
        animation={200}
        group={{ name: "shared", pull: true, put: true }}
        ghostClass="sortable-ghost"
        dragClass="sortable-drag"
        style={{ minHeight: 150 }}
        className="bg-light"
      >
        {tasks.map((task) => {
          return (
            <div key={id + "" + task.id} style={{ cursor: "move" }}>
              <div className="shadow  p-3 m-3 rounded d-flex gap-2 ">
                <img alt={task.title} src={task.imageURL} width={70} />
                <h6>{task.title}</h6>
              </div>
            </div>
          );
        })}
      </ReactSortable>
    </div>
  );
}
