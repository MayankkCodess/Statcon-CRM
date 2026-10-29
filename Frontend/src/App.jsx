import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import ComplaintForm from "./pages/ComplaintForm.jsx";

const router = createBrowserRouter([
  {
    path: "/complaint/addComplaint",
    element: <ComplaintForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;