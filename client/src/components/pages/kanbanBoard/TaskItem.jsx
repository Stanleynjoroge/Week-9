import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./task.css";

const TaskItem = ({ ticket, index }) => {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-item"
        >
          <h4>{ticket.title}</h4>
          <p>{ticket.description}</p>
        </div>
        
      )}
       
    </Draggable>
  );
};

export default TaskItem;
