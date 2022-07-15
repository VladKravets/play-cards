import React, {useEffect} from "react";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import s from './CardsList.module.css'
import { useAppDispatch, useAppSelector } from "../../../main/bll/store";
import { cardsActions, getCardsTC } from "../../../main/bll/reducers/cardsReducer";
import Spinner from "../../../main/ui/common/Spinner/Spinner";
import { Navigate } from 'react-router-dom'
import { PATH } from '../../../utils/path'
import { packsActions } from "../../../main/bll/reducers/packsReducer";
import { CardsTable } from "./CardsTable/CardsTable";
import { CardsSearchInput } from "./CardsSearchInput/CardsSearchInput";
import backLogo from "../../../assets/icons/backLOGO.png"


export const CardsList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const selectedPackId = useAppSelector(state => state.packs.selectedPackId)
    const selectedPackName = useAppSelector(state => state.packs.selectedPackName)
    const appStatus = useAppSelector(state => state.app.status)
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
            dispatch( packsActions.setSelectedPackName('') )
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
            {appStatus === 'loading'
                ? <div className={s.spinnerWrapper}></div>
                : <Paper className={s.container} style={{padding: '15px'}}>

                    <img src={backLogo} className={s.addPackBtn} onClick={backHandler}/>

                    <h1>{selectedPackName}</h1>

                    <div style={{marginTop: '20px'}}>
                        <CardsSearchInput />
                    </div>

                    <CardsTable cards={cards} selectedPackId={selectedPackId} page={page}/>
                </Paper>
            }
        </div>
    )
}