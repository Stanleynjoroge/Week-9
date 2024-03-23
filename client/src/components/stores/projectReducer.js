// projectReducer.js
import { ADD_PROJECT,DELETE_PROJECT } from './actions';
import { ADD_TICKET, DELETE_TICKET } from "./actions";
const initialState = {
  projects: [],
  tickets :[]
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
        case DELETE_PROJECT:
          return {
            ...state,
            projects: state.projects.filter(project => project.id !== action.payload),
          };
          case ADD_TICKET:
            return {
              ...state,
              tickets: [...state.tickets, action.payload],
            };
          case DELETE_TICKET:
            return {
              ...state,
              tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
            };

          default:
            return state;

  }
};
export default projectReducer;
