import { useHttp } from './../hooks/http.hook';


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=cfd29ffd189f11cbb223a7c47d1b390b"
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {  
        let description = char.description.length === 0 ? "There is no description for this character :(" : char.description;
        if (description.length > 220) {
            description = description.slice(0, 217) + "...";
        }

        let finalCollection = char.urls.filter(item => item.type === "comiclink");
        return {
            id: char.id,
            name: char.name,
            description: description, 
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension, 
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            collection: finalCollection[0].url,
        }
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const _transformComic = (comic) => {  
        let finalPrice = comic.prices[0].price !== 0 ? "$"+comic.prices[0].price : "NOT AVAILABLE";
        let finalUrl = comic.urls.length > 0 ? comic.urls[0].url : "marvel.com";
        let finalDescription = undefined;
        let finalLanguage = undefined;
        if (comic.textObjects.length > 0) {
            finalDescription = comic.textObjects[0].text;
            finalLanguage = comic.textObjects[0].language;
        } else {
            finalDescription = "Description's not found...";
            finalLanguage = "Language is unknown...";
        }
        return {
            id: comic.id,
            description: finalDescription,
            pageCount: comic.pageCount,
            language: finalLanguage,
            title: comic.title,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension, 
            price: finalPrice,
            url: finalUrl,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
}

export default useMarvelService;