import Characters from "../../pages/Characters/Characters";
import Comics from "../../pages/Comics/Comics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Page404 from "../../pages/Page404/Page404";
import SingleComicPage from './../../pages/SingleComicPage/SingleComicPage';

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<Characters/>}/>
                    <Route path="/comics" element={<Comics/>}/>
                    <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;