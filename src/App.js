import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/index";
import Ticket from "./pages/ticket";

function App() {
  return (
    <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/ticket/:id' element={<Ticket />} />
    </Routes>
  );
}

export default App;
