import React, { useEffect } from 'react'
import {Navigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../main/bll/store'
import {PATH} from '../../../utils/path'
import s from './PacksList.module.css'
import {packsActions, requestPacksListTC} from "../../../main/bll/reducers/packsReducer";
import { PacksTable } from './PacksTable/PacksTable'
import Paginator from '../../../main/ui/common/Paginator/Paginator'
import { PacksFilters } from './PacksFilters/PacksFilters'

export const PacksList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    const packsRequestParams = useAppSelector(state => state.packs.filters)
    const currentPage = useAppSelector(state => state.packs.filters.page)
    const pageSize = useAppSelector(state => state.packs.filters.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const authUserId = useAppSelector(state => state.profile.userData._id)
    const appStatus = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(requestPacksListTC())
    }, [packsRequestParams])


    useEffect(() => {
        return () => {
            dispatch( packsActions.setPacksList([]) )
        }
    }, [])

    const onPageChangedHandler = (pageNum: number) => {
        dispatch( packsActions.setCurrentPage(pageNum) )
    }

    if (!isLoggedIn) return <Navigate to={PATH.login}/>

    return (
        <div className={s.wrapper}>
            <PacksFilters />
            <div className={s.packList}>

                <PacksTable packs={cardPacks} authUserId={authUserId} isLoading={appStatus === 'loading'} />

                {(cardPacksTotalCount > pageSize) 
                    && <Paginator 
                            currentPage={currentPage} 
                            totalItemsCount={cardPacksTotalCount} 
                            pageSize={pageSize} 
                            onPageSelected={onPageChangedHandler} />
                }
            </div>

        </div>
    )
}