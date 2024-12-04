import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import PublicRoute from "./components/PublicRoutes";
import ApplyWorker from "./pages/ApplyWorker";
import NotificationPage from "./pages/Notification";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  console.log("Loading state:", loading); // Debugging line

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/apply-worker"
            element={
              <ProtectedRoutes>
                <ApplyWorker/>
              </ProtectedRoutes>
            }
          />

<Route
            path="/notification"
            element={
              <ProtectedRoutes>
                <NotificationPage/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/test" element={<div>Test Page</div>} /> {/* Debugging */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
