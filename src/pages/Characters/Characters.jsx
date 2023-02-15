import { useState } from "react";
import { Helmet } from "react-helmet"
import RandomChar from "../../components/randomChar/RandomChar";
import CharList from "../../components/charList/CharList";
import CharInfo from "../../components/charInfo/CharInfo";
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';

import decoration from './../../resources/img/vision.png';
import AppHeader from '../../components/appHeader/AppHeader';
import FindForm from "../../components/findForm/FindForm";

const Characters = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }
   
    return (
        <main>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                
                <ErrorBoundary>
                    <div style={{position:"sticky", top: 15}}>
                        <CharInfo charId={selectedChar}/>
                        <FindForm/>
                    </div>

                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
    )
}

export default Characters;