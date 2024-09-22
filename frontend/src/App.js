import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductList from './features/product-list/ProductList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signin",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/",
    element: <Home/>,
  },
]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );


function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}

      <RouterProvider router={router} />



    </div>
  );
}

export default App;

