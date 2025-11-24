import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/*Protected Routes */}
        {/* <Route path="/dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <Route path="/editor/:bookId"
          element={<ProtectedRoute><EditorPage /></ProtectedRoute>}
        />
        <Route path="/view-book/:bookId"
          element={<ProtectedRoute><ViewBookPage /></ProtectedRoute>}
        />
        <Route path="/profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        /> */}
      </Routes>
    </div>
  )
}

export default App
