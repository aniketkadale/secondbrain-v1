import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin, Signup } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Tweets from "./pages/Tweets";
import Youtube from "./pages/Youtube";
// import MyBrains from "./pages/MyBrains";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route path="/youtube" element={<Youtube />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
