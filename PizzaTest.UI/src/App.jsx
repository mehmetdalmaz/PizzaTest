import { RouterProvider } from "react-router";
import "./App.css";
import { route } from "./routes/route";

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
