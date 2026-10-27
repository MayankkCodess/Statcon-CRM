import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import WorkPage from "./pages/WorkPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WorkPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;