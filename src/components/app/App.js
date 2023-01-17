import Characters from "../../pages/Characters";
import Comics from "../../pages/Comics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<Characters/>}/>
                    <Route path="/comics" element={<Comics/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;