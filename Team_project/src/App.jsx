import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
