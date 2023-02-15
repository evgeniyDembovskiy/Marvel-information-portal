import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from './../spinner/Spinner';



const Page404 = lazy(() => import('./../../pages/Page404/Page404'));
const Characters = lazy(() => import("../../pages/Characters/Characters"));
const Comics = lazy(() => import("../../pages/Comics/Comics"));
const SingleComicPage = lazy(() => import("./../../pages/SingleComicPage/SingleComicPage"));
const SingleCharacterPage = lazy(() => import("./../../pages/SingleCharacterPage/SingleCharacterPage"));

const App = () => {
    return (
        <Router>
            <div className="app">
                <Suspense fallback={<Spinner/>}>
                    <AppHeader/>
                    <Routes>
                        <Route path="/" element={<Characters/>}/>
                        <Route path="/characters/:charName" element={<SingleCharacterPage/>}/>
                        <Route path="/comics" element={<Comics/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App;