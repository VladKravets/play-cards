import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {useNavigate, useParams} from "react-router-dom";
import s from './CardsList.module.css'
import {useAppDispatch, useAppSelector} from "../../../main/bll/store";
import { cardsActions, getCardsTC } from "../../../main/bll/reducers/cardsReducer";
import Spinner from "../../../main/ui/common/Spinner/Spinner";
import { Navigate } from 'react-router-dom'
import { PATH } from '../../../utils/path'
import { packsActions } from "../../../main/bll/reducers/packsReducer";
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import { SearchForm } from "../SearchForm/SearchForm";
import { CardsTable } from "./CardsTable/CardsTable";



export const CardsList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const selectedPackId = useAppSelector(state => state.packs.selectedPackId)
    const status = useAppSelector(state => state.app.status)
    const cards = useAppSelector(state => state.cards.cards)
    
    // const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const page = 1; // todo: redux state

    const paramsPackId = useParams()?.packId;

    useEffect(() => {
        if (paramsPackId && (selectedPackId !== paramsPackId)) {
            dispatch(packsActions.setSelectedPackId(paramsPackId))
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch( packsActions.setSelectedPackId('') )
            dispatch( cardsActions.setCards([], 0) )
        }
    }, [])

    useEffect(() => {
        if (selectedPackId) {
            dispatch(getCardsTC({cardsPack_id: selectedPackId, page, pageCount: 8}))
        }
    }, [dispatch, page, selectedPackId])


    const backHandler = () => {
        navigate(PATH.packsList)
    }



    if (!isLoggedIn) return <Navigate to={PATH.login}/>

    return (
        <div className={s.mainContainer}>
            {status === 'succeeded' 
                ? <Paper className={s.container} style={{padding: '15px'}}>

                    <SuperButton className={s.btnsBack} onClick={backHandler} btnStyle="primary">
                        Go Back
                    </SuperButton>

                    <div style={{marginTop: '20px'}}>
                        <SearchForm />
                    </div>

                    <CardsTable cards={cards} selectedPackId={selectedPackId} page={page}/>
                </Paper>

                : <Spinner/>
            }
        </div>
    )
}