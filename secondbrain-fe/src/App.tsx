import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin, Signup } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
// import MyBrains from "./pages/MyBrains";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/mybrains" element={<MyBrains />} /> */}
        {/* <Route path="/brain/:shareLink" element={<GetBrain />} /> */}
      </Routes>
    </BrowserRouter>
  );
  }

export default App;
