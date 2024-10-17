import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartingPage from "./components/StartingPage.jsx";
import TokenStore from "./components/TokenStore.jsx";
import GamePage from "./components/GamePage.jsx";

const router = createBrowserRouter([
  { path: '/', element: <StartingPage /> },
  {path: '/store', element: <TokenStore />},
  {path: 'group/:groupName/:groupCode', element: <GamePage />}

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
