// import React, { useEffect, useState } from "react";
// import { DragDropContext } from "react-beautiful-dnd";
// import axios from "axios";
// import "./task.css";
// import ToDoColumn from "./ToDoColumn";
// import OngoingColumn from "./OngoingColumn";
// import ResolvedColumn from "./ResolvedColumn";
// import {updateTicketData} from '../stores/actions'
// import { useDispatch } from "react-redux";

// const Tasks = () => {
//   const [tasks,setTasks] = useState([]);
//   const [error, setError] = useState(null);
//  const dispatch=useDispatch()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/ticket");
//         setTasks(response.data);
//         console.log({tasks})
//       } catch (error) {
//         setError("Error fetching data");
//         console.log(error);
//       }
//     };

//     fetchData();

//     return () => {
//       setTasks([])
//       setError(null);
//     };
//   }, []);

//   const handleDragAndDrop = (results) => {
//     const { source, destination, type } = results;
//   console.log(results)
//     if (!destination) return;

//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) return;

//     if (type === "group") {

//       const reorderedTasks = [...tasks];

//       const taskSourceIndex = source.index;
//       const taskDestinationIndex = destination.index;
//       const [removedTask] = reorderedTasks.splice(taskSourceIndex, 1);
//       reorderedTasks.splice(taskDestinationIndex, 0, removedTask);
//        setTasks(reorderedTasks);
//     }

//     if (source.droppableId !== destination.droppableId) {
//       const updatedTasks = [...tasks];
//       const sourceTaskIndex = updatedTasks.findIndex(
//         (task) => task.id === source.droppableId
//       );
//       const destinationTaskIndex = updatedTasks.findIndex(
//         (task) => task.id === destination.droppableId
//       );
//       const itemIndex = source.index;
//       const [movedItem] = updatedTasks[sourceTaskIndex].tasks.splice(itemIndex, 1);
//       updatedTasks[destinationTaskIndex].tasks.splice(destination.index, 0, movedItem);
//       const movedTicket = movedItem; // Assuming movedItem contains ticket data
//       setTasks(updatedTasks);
//       movedTicket.status = destination.droppableId; // Assuming destination.droppableId contains the new status
//       dispatch(updateTicketData(movedTicket)); // Dispatch updateTicketData function with updated ticket data

//     }
//   };

//   return (
//     <>
//       <div id="task">
//         <DragDropContext onDragEnd={handleDragAndDrop}>
//           <ToDoColumn tasks={tasks.filter(ticket => ticket.status === "TO_DO")} />
//           <OngoingColumn tasks={tasks.filter(ticket => ticket.status === "ONGOING")} />
//           <ResolvedColumn tasks={tasks.filter(ticket => ticket.status === "RESOLVED")} />
//         </DragDropContext>
//       </div>
//     </>
//   );
// };

// export default Tasks;

import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { updateTicketData } from "../stores/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./task.css";

const Tasks = () => {
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const API = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,})
      try {
        const response = await API.get("http://localhost:5000/ticket");
        const data = response.data;
        setTodo(data.filter((ticket) => ticket.status === "TO_DO"));
        setOngoing(data.filter((ticket) => ticket.status === "ONGOING"));
        setResolved(data.filter((ticket) => ticket.status === "RESOLVED"));
      } catch (error) {
        setError("Error fetching data");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

      if (source.droppableId === destination.droppableId) {
      // Reorder items inside the same column
      switch (source.droppableId) {
        case "TO_DO":
          const updatedTodo = [...todo];
          const todoSourceIndex = source.index;
          const todoDestinatonIndex = destination.index;
          const [removedTodo] = updatedTodo.splice(todoSourceIndex, 1);
          updatedTodo.splice(todoDestinatonIndex, 0, removedTodo);
          console.log({ updatedTodo });
          setTodo([...updatedTodo]);
          break;
        case "ONGOING":
          const updatedOngoing = [...ongoing];
          const ongoingSourceIndex = source.index;
          const ongoingDestinatonIndex = destination.index;
          const [removedOngoing] = updatedOngoing.splice(ongoingSourceIndex, 1);
          updatedOngoing.splice(ongoingDestinatonIndex, 0, removedOngoing);
          setOngoing(updatedOngoing);
          break;
        case "RESOLVED":
          const updatedResolved = [...resolved];
          const resolvedSourceIndex = source.index;
          const resolvedDestinatonIndex = destination.index;
          const [removedResolved] = updatedResolved.splice(
            resolvedSourceIndex,
            1
          );
          updatedResolved.splice(resolvedDestinatonIndex, 0, removedResolved);
          setResolved(updatedResolved);
          break;
        default:
          break;
      }
    }else{
        // moving items across kanban board.
    let sourceList, destList;
    switch (source.droppableId) {
      case "TO_DO":
        sourceList = [...todo];
        break;
      case "ONGOING":
        sourceList = [...ongoing];
        break;
      case "RESOLVED":
        sourceList = [...resolved];
        break;
      default:
        break;
    }

    switch (destination.droppableId) {
      case "TO_DO":
        destList = [...todo];
        break;
      case "ONGOING":
        destList = [...ongoing];
        break;
      case "RESOLVED":
        destList = [...resolved];
        break;
      default:
        break;
    }

    const [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    switch (source.droppableId) {
      case "TO_DO":
        setTodo(sourceList);
        break;
      case "ONGOING":
        setOngoing(sourceList);
        break;
      case "RESOLVED":
        setResolved(sourceList);
        break;
      default:
        break;
    }

    switch (destination.droppableId) {
      case "TO_DO":
        setTodo(destList);
        break;
      case "ONGOING":
        setOngoing(destList);
        break;
      case "RESOLVED":
        setResolved(destList);
        break;
      default:
        break;
    }

    dispatch(
      updateTicketData({ ...movedItem, status: destination.droppableId })
    );

    }
   

    // Dispatch updateTicketData to update ticket status
  };




  return (
    <div id="task">
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div className="slot">
          <h3>To Do</h3>
          <Droppable droppableId="TO_DO" type="group">
            {(provided) => (
              <div
                className="task-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todo.map((ticket, index) => (
                  <Draggable
                    key={ticket.id}
                    draggableId={ticket.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cards"
                      >
                        <h4>{ticket.title}</h4>
                        <p>{ticket.description}</p>
                        <img src={`https://robohash.org/${ticket.UserId}.png`}  alt="" />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="slot">
          <h3>Ongoing</h3>
          <Droppable droppableId="ONGOING" type="group">
            {(provided) => (
              <div
                className="task-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {ongoing.map((ticket, index) => (
                  <Draggable
                    key={ticket.id}
                    draggableId={ticket.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cards"
                      >
                        <h4>{ticket.title}</h4>
                        <p>{ticket.description}</p>
                        <img src={`https://robohash.org/${ticket.UserId}.png`}  alt="" />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="slot">
          <h3>Resolved</h3>
          <Droppable droppableId="RESOLVED" type="group">
            {(provided) => (
              <div
                className="task-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {resolved.map((ticket, index) => (
                  <Draggable
                    key={ticket.id}
                    draggableId={ticket.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cards"
                      >
                        <h4>{ticket.title}</h4>
                        <p>{ticket.description}</p>
                        <img src={`https://robohash.org/${ticket.UserId}.png`}  alt="" />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
