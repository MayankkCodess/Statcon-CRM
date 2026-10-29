import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Complaints from "./pages/Complaints.jsx";

const router = createBrowserRouter([
  {
    path: "/complaint/allComplaints",
    element: <Complaints />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;