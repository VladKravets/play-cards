import React, { FC } from 'react'
import s from './ModalWindow.module.css'

const ModalWindow: FC<ModalWindowPropsType> = React.memo( (props) => {
    const {children, title, open, onClose, onOverlayClose = true} = props

    const onCloseHandler = (e: CloseModalEventType) => {
        e.stopPropagation()

        onClose && onClose(e)
    }

    const onOverlayCloseHandler = (e: CloseModalEventType) => {
        
        let target = e.target as HTMLElement

        if (onOverlayClose && target && target.classList.contains(s.overlay)) {
            onClose && onClose(e)
        }
    }

    const finalModalCN = children ? s.modal : `${s.modal} ${s.modal_withoutChildren}`

    if (!open) return <div className={s.hidden_stub}></div>

    return (
        <div className={s.overlay} onClick={onOverlayCloseHandler}>
            <div className={finalModalCN}>
                <div className={s.modal_header}>
                    <span>{title}</span>
                    <div className={s.modal_close} onClick={onCloseHandler}>&times;</div>
                </div>
                <div className={s.modal_body}>
                    {children}
                </div>
            </div>
        </div>
    )
})

export default ModalWindow


type ModalWindowPropsType = {
    title?: string
    open?: boolean
    /**
     * This is the function that should change the open property to false
     */
    onClose: (e: CloseModalEventType) => void
    /**
     * Close modal on overlay click. Default = true
     */
    onOverlayClose?: boolean
    /**
     * Modal window without children will look like alert message with close btn
     */
    children?: React.ReactNode
}

type CloseModalEventType = React.MouseEvent<HTMLDivElement, MouseEvent>
