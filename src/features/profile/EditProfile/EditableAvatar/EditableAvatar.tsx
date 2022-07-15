import React, { ChangeEvent, FC } from 'react'
import { appActions } from '../../../../main/bll/reducers/appReducer'
import { useAppDispatch } from '../../../../main/bll/store'
import UserAvatar from '../../UserAvatar/UserAvatar'
import addNewImageIcon from '../../../../assets/icons/add-photo-icon.svg'
import s from './EditableAvatar.module.css'


export const EditableAvatar: FC<EditableAvatarPropsType> = ({image, setNewImage}) => {

    const dispatch = useAppDispatch()

    const onNewPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.files?.length) {
            // Encode image file as URL
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);

            fileReader.onloadend = function () {
                
                if ((typeof fileReader.result) == 'string') {
                    // @ts-ignore
                    setNewImage(fileReader.result)

                } else {
                    dispatch(appActions.setAppErrorMessage('Some error occured. Please try again'))
                }
                
            }
        }
    }

    return (
        <div className={s.editableAvatarWrapper}>
            <UserAvatar sideLength={100} userImage={image} />

            <div className={s.changePhoto}>
                <label className={s.changePhoto_label}>
                    <input className={s.changePhoto_input} onChange={onNewPhotoSelected} type="file" />
                    <img className={s.changePhoto_icon} src={addNewImageIcon} alt="new_photo" />
                </label>
            </div>
        </div>
    )
}



type EditableAvatarPropsType = {
    image: string | null
    setNewImage: (newImage: string) => void
}