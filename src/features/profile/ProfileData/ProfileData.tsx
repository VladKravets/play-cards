import React, { FC } from 'react'
import { useAppSelector } from '../../../main/bll/store'
import s from './ProfileData.module.css'
import UserAvatar from '../UserAvatar/UserAvatar'

export const ProfileData: FC<ProfileDataPropsType> = React.memo( ({activateEditMode}) => {

    const {name, avatar, email, publicCardPacksCount, created} = useAppSelector(state => state.profile.userData)

    const createdDate = new Date(created).toLocaleDateString('en-US')

    const userDataList = [
        {label: 'Nickname', data: name},
        {label: 'Email', data: email},
        {label: 'Profile creation date', data: createdDate},
        {label: 'Public packs created', data: `${publicCardPacksCount}`},
    ]
    
    const mappedItems = userDataList.map(el => <UserDataListItem label={el.label} data={el.data}/>)

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <h3 className={s.pageTitle}>User Information</h3>
                <button className={s.editBtn} onClick={activateEditMode}>Edit</button>
            </div>
            

            <div className={s.dataWrapper}>

                <UserAvatar userImage={avatar} sideLength={115} />
           
                <ul className={s.dataList}>
                    {mappedItems}
                </ul>

            </div>

        </div>
    )
})


const UserDataListItem = React.memo( ({label, data}: {label: string, data: string}) => {

    return (
        <li className={s.listItem}>
            <div className={s.label}>{label}</div>
            <div className={s.data}>{data}</div>
        </li>
    )
})


type ProfileDataPropsType = {
    activateEditMode: () => void
}