import React from "react";
import * as ReactDOM from "react-dom/client";
import RegisterUser from "./components/auth/RegisterUser.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "./components/auth/LoginUser.jsx";
import Root from "./Routes/Root.jsx";
import Error from "./Routes/Error.jsx";
import  Dashboard  from "./components/pages/Dashboard.jsx";
import Tasks from "./components/pages/Tasks.jsx";
import Tickets from "./components/pages/Tickets.jsx";
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./components/stores/store.js";
const router = createBrowserRouter([
  { 
  path: "/", 
  element: <LoginUser /> },
  {
    path: "/Register",
    element: <RegisterUser />,
  },
  {
    path: "/*",
    element: <Error />, // Not Found Page
  },
  {
    
    path: "/Home",
    element: <Root />,
    children: [
      {
       path:"Dashboard",
        element:<Dashboard/>
      },
      {
        path: 'Tasks',
        element: <Tasks/>
      },
      {
        path:"Tickets",
        element: <Tickets/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={<h1>lodinding...</h1>} persistor={persistor}>
    <RouterProvider router={router} /> 
    </PersistGate>
    </Provider>
    
  </React.StrictMode>
);
