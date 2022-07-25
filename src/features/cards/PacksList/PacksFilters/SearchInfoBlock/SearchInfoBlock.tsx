import React from 'react'
import { useAppSelector } from '../../../../../main/bll/store'
import Spinner from '../../../../../main/ui/common/Spinner/Spinner'
import s from './SearchInfoBlock.module.css'

export const SearchInfoBlock = () => {

    const appStatus = useAppSelector(state => state.app.status)
    const authUserId = useAppSelector(state => state.profile.userData._id)
	const cardsTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
	const searchFilters = useAppSelector(state => state.packs.filters)
	const { packName, min, max, page, pageCount, user_id } = searchFilters

    const messageLines = [
        {id: 1, value: `- Showing ${(user_id === authUserId) ? 'my packs' : 'all users packs'}`},
        {id: 2, value: `- Min cards value ${min}`},
        {id: 3, value: `- Max cards value ${max}`},
        {id: 4, value: `- Page number ${page} of ${Math.ceil(cardsTotalCount / pageCount)}`},
        {id: 5, value: `${packName ? ('- Search for "' + packName + '"') : ''}`},
    ]

    // const infoMessage = 
    //     <div>
    //         {`- Showing ${(user_id === authUserId) ? 'my packs' : 'all users packs'}`}
    //         <br/>
    //         {`- Min cards value ${min}`}
    //         <br/>
    //         {`- Max cards value ${max}`}
    //         <br/>
    //         {`- Page number ${page} of ${Math.ceil(cardsTotalCount / pageCount)}`}
    //         <br/>
    //         {`${packName ? ('- Search for "' + packName + '"') : ''}`}
    //     </div>

    const infoMessages = messageLines.map(el => <li key={el.id}>{el.value}</li>)


    return (
        <div className={s.searchInfoBlock}>
            {
                (appStatus === 'loading')
                    ? <Spinner />
                    : <ul className={s.infoMessages}>{infoMessages}</ul>
            }
        </div>
    )
}
