import React, { FC } from 'react'
import { DeletePack } from './DeletePack/DeletePack'
import { EditPack } from './EditPack/EditPack'
import { LearnPack } from './LearnPack/LearnPack'
import s from './PacksActions.module.css'


export const PacksActions: FC<PacksActionsPropsType> = React.memo( ({ isOwner, packId, packName }) => {

    return (
        <div className={s.packsActions}>
            <LearnPack packId={packId} />
            {isOwner 
                && <>
                    <EditPack packId={packId} packName={packName} />
                    <DeletePack packId={packId} packName={packName} />
                </>
            }
        </div>
    )
})


type PacksActionsPropsType = {
    isOwner: boolean
    packId: string
    packName: string
}