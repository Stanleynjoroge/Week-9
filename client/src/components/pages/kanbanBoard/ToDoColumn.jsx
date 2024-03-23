// // ToDoColumn.js
// import React from "react";
// import { Droppable } from "react-beautiful-dnd";
// import TaskItem from "./TaskItem";
// import "./task.css";

// const ToDoColumn = ({ tasks }) => {
//   return (
//     <div >
//       <h2>To Do</h2>
//       <br />
//       <Droppable droppableId="TO_DO" type="group" className="column">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             {todo.map((ticket, index) => (
//               <TaskItem key={ticket.id} ticket={ticket} index={index} />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// export default ToDoColumn;
