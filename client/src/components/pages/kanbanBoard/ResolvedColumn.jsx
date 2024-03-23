// // ResolvedColumn.js
// import React from "react";
// import { Droppable } from "react-beautiful-dnd";
// import TaskItem from "./TaskItem";
// import './task.css'

// const ResolvedColumn = ({ tasks }) => {
//   return (
//     <div >
//       <h2>Resolved</h2>
//       <br />
//       <Droppable droppableId="RESOLVED" type="group" className="column">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             {resolved.map((ticket, index) => (
//               <TaskItem key={ticket.id} ticket={ticket} index={index} />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// export default ResolvedColumn;
