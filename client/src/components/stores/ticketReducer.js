import { ADD_TICKET, DELETE_TICKET } from "./actions";

const initialState = {
  tickets: [],
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
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

export default ticketReducer;
