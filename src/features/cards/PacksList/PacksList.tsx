import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../main/bll/store'
import {PATH} from '../../../utils/path'
import s from './PacksList.module.css'
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import {setMyPacksListTC, setPacksListTC} from "../../../main/bll/reducers/packsReducer";
import DoubleRange from "../../../main/ui/common/DoubleRange/DoubleRange";
import { PacksTable } from './PacksTable/PacksTable'
import { SearchForm } from '../SearchForm/SearchForm'
import { AddNewPack } from '../AddNewPack/AddNewPack'

export const PacksList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)


    const showMyPacksHandler = () => {
        dispatch(setMyPacksListTC())
    }
    const showAllPacksHandler = () => {
        dispatch(setPacksListTC())
    }

    if (!isLoggedIn) return <Navigate to={PATH.login}/>

    return (
        <div className={s.wrapper}>
            <h2>Packs List</h2>
            <div className={s.packBlock}>
                <div className={s.btn}>
                    <SuperButton onClick={showMyPacksHandler}> My Packs</SuperButton>
                    <SuperButton onClick={showAllPacksHandler}> All Packs</SuperButton>
                </div>
                {/*<DoubleRange min={} max={}/>*/}
            </div>
            <div className={s.packList}>
                <div className={s.packListHeader}>
                    <SearchForm />
                    <AddNewPack />
                </div>
                
                <PacksTable />
            </div>

        </div>
    )
}