import React, { useState } from 'react'
import ModalWindow from '../../../main/ui/common/ModalWindow/ModalWindow'
import SuperButton from '../../../main/ui/common/SuperButton/SuperButton'

const ModalWindowDemo = () => {
    const [isModalOpen, setModalDisplay] = useState(false)
    const openModal = () => setModalDisplay(true)
    const closeModal = () => setModalDisplay(false)

    return (
        <>
            <SuperButton btnStyle="primary" upperCase btnSize="large" onClick={openModal}>
                Open modal
            </SuperButton>

            <ModalWindow title="Modal window title" onOverlayClose={false} open={isModalOpen} onClose={closeModal}>
                <div>These are children components</div>
            </ModalWindow>
        </>
    )
}

export default ModalWindowDemo