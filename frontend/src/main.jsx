import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import Feeds from "./components/Feeds.jsx";
import Connections from "./components/Connections.jsx";
import RequsetRecieved from "./components/RequsetRecieved.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/feed",
        element: <Feeds />,
      },
      {
        path: "/connections",
        element: <Connections />,
      },
      {
        path: "/request-recieved",
        element: <RequsetRecieved />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </Provider>
);
