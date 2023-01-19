import { useState } from "react";
import RandomChar from "../../components/randomChar/RandomChar";
import CharList from "../../components/charList/CharList";
import CharInfo from "../../components/charInfo/CharInfo";
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';

import decoration from './../../resources/img/vision.png';
import AppHeader from '../../components/appHeader/AppHeader';

const Characters = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }
   
    return (
        <main>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
    )
}

export default Characters;