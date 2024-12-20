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
import Users from "./pages/admin/Users";
import Workers from "./pages/admin/Workers"
import Profile from "./pages/worker/Profile";
import BookingPage from "./pages/BookingPage";
import Appointment from "./pages/Appointment";
import WorkerAppointments from "./pages/worker/WorkerAppointments";
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
                        path="/admin/users"
                        element={
                          <ProtectedRoutes>
                            <Users/>
                          </ProtectedRoutes>
                        }
                      />

          <Route
            path="/admin/workers"
            element={
              <ProtectedRoutes>
               <Workers/>
              </ProtectedRoutes>
            }
          />
          <Route
              path="/worker/profile/:id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

<Route
              path="/worker/book-appointment/:workerId"
              element={
                <ProtectedRoutes>
                  <BookingPage/>
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

<Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Appointment />
              </ProtectedRoutes>
            }
          />

        
<Route
            path="/worker-appointments"
            element={
              <ProtectedRoutes>
                <WorkerAppointments />
              </ProtectedRoutes>
            }
          />
          <Route path="/test" element={<div>Test Page</div>} /> {/* Debugging */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
