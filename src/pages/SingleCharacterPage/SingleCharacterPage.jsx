import React from 'react';
import './singleCharacterPage.scss';
import { useParams, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarverService';
import Spinner from './../../components/spinner/Spinner';
import ErrorMessage from './../../components/errorMessage/ErrorMessage';
import AppBanner from '../../components/appBanner/AppBanner';

const SingleCharacterPage = () => {
    const {charName} = useParams();
    
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charName]);

    
    const updateChar = () => {    
        clearError();
        getCharacterByName(charName)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        console.log(char);
        if (Object.keys(char).length > 0) {
            setChar(char);
        } else {
            setChar({
                name: "Character wasn't found...",
                description: "Check the name and try again",
                thumbnail: "https://picturesofmaidenhead.files.wordpress.com/2019/01/image-not-found.jpg",
            })
        }
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <>
            {errorMessage}
            {spinner} 
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    return (
        <>
            <AppBanner/>
            <div className="single-char">
                <img src={thumbnail} alt="x-men" className="single-char__img"/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
            </div>
        </>

    )
}


export default SingleCharacterPage;