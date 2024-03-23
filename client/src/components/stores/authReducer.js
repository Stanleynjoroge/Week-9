


const initialState = {
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('user'),
    user: JSON.parse(localStorage.getItem('user')),
  };
  
export default function reducer(state=initialState, action) {
    switch (action.type) {  
      case 'LOGIN_START':
        return { ...state, isLoading: true, error: null};
      case 'LOGIN_SUCCESS':
        localStorage.setItem("user",JSON.stringify(action.payload));
        return {...state,  
                isAuthenticated:true, 
                isLoading:false,  
                user:action.payload,  
                error:null,
               };
      case "LOGOUT":
        localStorage.removeItem("user");
        return{...state}}}
    //   case "ADD_PROJECT":
    //       let newProjects = [...state.projects];
    //       newProjects.push(action.project);
    //       return {...state, projects :newProjects}
    //   case "LOADING_PROJECTS":
    //      return {...state,isLoading:true}
    //   case "FETCH_PROJECTS_SUCCESS":
    //        return {...state, projects:action.payload, isLoading:false}
    //    case "UPDATE_CURRENT_PROJECT":
    //         return {...state, project:action.payload}
    //    case "ERROR_OCCURRED":
    //          return {...state,error:action.payload}
    //  //   case "CLEAR_ERROR":
    //  //        return {...state,error:null}
    //         }}