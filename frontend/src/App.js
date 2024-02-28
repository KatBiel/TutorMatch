import { useNavigate, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path = "/" element = { <Layout></Layout> }>
        <Route index element = { <Login></Login> }></Route>
        <Route path = "/signup" element = { <Signup></Signup> } ></Route>
        <Route path = "/profile" element = { <Profile></Profile> }></Route>
      </Route>
      <Route path='/landing' element={<LandingPage  navigate={useNavigate()} />}/>
    </Routes>
// New routes go here
);
}

export default App;

