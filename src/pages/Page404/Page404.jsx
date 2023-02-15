import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { Helmet } from 'react-helmet';

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page 404"
                    />
                <title>Not found 404</title>
            </Helmet>
            <div>
                <ErrorMessage/>
                <p className='p404_paragraph'>Page doesn't exist :(</p>
                <Link to="/" className='p404_link'>Back to main page</Link>
            </div>
        </>

    );
};

export default Page404;