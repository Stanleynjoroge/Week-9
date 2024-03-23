// // OngoingColumn.js
// import React from "react";
// import { Droppable } from "react-beautiful-dnd";
// import TaskItem from "./TaskItem";
// import "./task.css";

// const OngoingColumn = ({ tasks }) => {
//   return (
//     <div >
//       <h2>Ongoing</h2>
//       <br />
//       <Droppable droppableId="ONGOING" type="group" className="column">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             {ongoing.map((ticket, index) => (
//               <TaskItem key={ticket.id} ticket={ticket} index={index} />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// export default OngoingColumn;
