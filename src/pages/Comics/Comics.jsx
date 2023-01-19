import React, { useState } from 'react';
import AppHeader from '../../components/appHeader/AppHeader';
import ComicsList from '../../components/comicsList/ComicsList';
import useMarvelService from '../../services/MarverService';

const Comics = () => {
    return (
        <ComicsList/>
    );
};

export default Comics;