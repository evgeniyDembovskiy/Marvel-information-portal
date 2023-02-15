import React from 'react';
import "./findForm.scss";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useState, useRef } from 'react';
import useMarvelService from '../../services/MarverService';
import Spinner from './../spinner/Spinner';
import { Link } from 'react-router-dom';


const FindForm = () => {

    const {loading, getCharacterByName, error} = useMarvelService();
    const [currentChar, setCurrentChar] = useState(null);
    const [isSearchSuccessful, setIsSearchSuccessful] = useState(false);
    const firstRender = useRef(true);

    const findChar = (name) => {
        getCharacterByName(name)
            .then(data => {
                if(Object.keys(data).length > 0) {
                    console.log(data);
                    setIsSearchSuccessful(true);
                    setCurrentChar(data);
                } else {
                    setIsSearchSuccessful(false);
                    setCurrentChar(null);
                }
                firstRender.current = false;
            })
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <div>Ошибка...</div> : null;
    let infoMessage = null;
    if(firstRender.current === false) {
        infoMessage = isSearchSuccessful 
        ?   <div className='find-form__success-wrapper'>
                <div className='find-form__success-text'>There is! Visit {currentChar.name} page?</div> 
                {/* <a href="google.com" className="button button__secondary">
                    <div className="inner">to page</div>
                </a> */}
                <Link to={`/characters/${currentChar.name}`} className="button button__secondary"><div className="inner">to page</div></Link>
            </div>
        : <div className='find-form__failure'>The character wasn't found. Check the name and try again.</div> ;
    }


    return (   
        <Formik
            initialValues={{ // Инпуты, которые будут контролироваться
                name: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .min(2, "Minimum of 2 characters!")
                        .required("This field is required")
            })}
        onSubmit={values => findChar(values.name)}>

            <Form className='find-form'>
                <label htmlFor="text" className='find-form__label'>Or find a character by name:</label>
                <div className='find-form__wrapper'>
                    <Field
                        className="find-form__input" 
                        id="name"
                        name="name"
                    />
                    <button className='find-form__button'>Find</button>
                </div>
                <ErrorMessage className="find-form__error" name="name" component="div"/>
                {spinner}
                {errorMessage}
                {infoMessage}
            </Form>
        </Formik>
    );
};

export default FindForm;