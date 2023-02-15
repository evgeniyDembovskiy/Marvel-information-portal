import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AppHeader from '../../components/appHeader/AppHeader';
import ComicsList from '../../components/comicsList/ComicsList';
import useMarvelService from '../../services/MarverService';

const Comics = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                    />
                <title>Comics</title>
            </Helmet>
            <ComicsList/>
        </>
        
    );
};

export default Comics;