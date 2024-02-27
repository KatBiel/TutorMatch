import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";

const App = () => {
    return (
        <Routes>
          <Route path='/' element={<LandingPage navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;
