import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from './../../services/MarverService';
import ErrorMessage from './../errorMessage/ErrorMessage';
import Spinner from './../spinner/Spinner';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true;
        }

        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setComicsEnded(ended)
    }

    const onRequest = (offset) => {
        setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    useEffect(() => {
        onRequest();
    }, [])

    const renderComics = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li className="comics__item" key={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt="thumbnail" className="comics__item-img" style={imgStyle}/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const comics = renderComics(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comics}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{"display": comicsEnded ? "none" : "block"}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;