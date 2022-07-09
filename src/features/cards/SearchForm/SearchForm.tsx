import React from 'react';
import SuperInputText from '../../../main/ui/common/SuperInputText/SuperInputText';
import s from './SearchForm.module.css'


// todo: add formik and create common search form with changable props
export const SearchForm = () => {
    
    return (
        <form className={s.searchForm}>
            <SuperInputText placeholder='Search'/>

        </form>
    );
};