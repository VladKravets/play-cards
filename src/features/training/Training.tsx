import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getCardsTC } from '../../main/bll/reducers/cardsReducer'
import { packsActions } from '../../main/bll/reducers/packsReducer'
import { useAppDispatch, useAppSelector } from '../../main/bll/store'
import Spinner from '../../main/ui/common/Spinner/Spinner'
import { PATH } from '../../utils/path'
import s from './Training.module.css'
import { TrainingCard } from './TrainingCard/TrainingCard'

export const Training = () => {

	const dispatch = useAppDispatch()

	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
	const appAppStatus = useAppSelector(state => state.app.status)
	const selectedPackId = useAppSelector(state => state.packs.selectedPackId)
    const selectedPackName = useAppSelector(state => state.packs.selectedPackName)
	const cardsPack = useAppSelector(state => state.cards.cards)

	const paramsPackId = useParams()?.packId;


	useEffect(() => {

        if (paramsPackId && (selectedPackId !== paramsPackId)) {
            dispatch( packsActions.setSelectedPackId(paramsPackId) )
        }

		if (selectedPackId) {
            dispatch(getCardsTC({cardsPack_id: selectedPackId, page: 1, pageCount: 110}))
        }

    }, [dispatch, paramsPackId, selectedPackId])



	if (!isLoggedIn) return <Navigate to={PATH.login}/>

	return (
		<div className={s.sectionWrapper}>

			<div className={s.contentWrapper}>
				{appAppStatus === 'loading'
					&& <Spinner />
            	}

				{(appAppStatus !== 'loading') && (cardsPack.length > 0)
					&& <TrainingCard cardsPack={cardsPack} packName={selectedPackName} />
				}
			</div>

		</div>
	)
}