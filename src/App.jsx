import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartingPage from "./components/StartingPage.jsx";
import AddPhotoPage from "./components/AddPhotoPage.jsx";
import ShowPhotos from "./components/ShowPhotos.jsx";

const router = createBrowserRouter([
  { path: '/', element: <StartingPage /> },
  {path: 'photo/add/:userCode', element: <AddPhotoPage />},
  {path: 'photo/show/:userCode', element: <ShowPhotos />}
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
