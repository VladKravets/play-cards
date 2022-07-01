import React from 'react'
import SuperButton from '../../../main/ui/common/SuperButton/SuperButton'
import s from './SuperButtonDemo.module.css'

const SuperButtonDemo = () => {
    return (
        <>
            <div>
                <div className={s.buttonsCol}>
                    <SuperButton btnStyle="primary">Primary</SuperButton>
                    <SuperButton btnStyle="dark">Dark</SuperButton>
                    <SuperButton btnStyle="success">Success</SuperButton>
                    <SuperButton btnStyle="warning">Warning</SuperButton>
                    <SuperButton btnStyle="danger">Danger</SuperButton>
                </div>
                <div className={s.buttonsCol}>
                    <SuperButton btnStyle="outline_primary">Outline Primary</SuperButton>
                    <SuperButton btnStyle="outline_dark">Outline Dark</SuperButton>
                    <SuperButton btnStyle="outline_success">Outline Success</SuperButton>
                    <SuperButton btnStyle="outline_warning">Outline Warning</SuperButton>
                    <SuperButton btnStyle="outline_danger">Outline Danger</SuperButton>
                </div>
            </div>

            <div className={s.buttonsRow}>
                <SuperButton btnSize="large">Large</SuperButton>
                <SuperButton btnSize="medium">Medium</SuperButton>
                <SuperButton btnSize="small">Small</SuperButton>
                <SuperButton upperCase>Uppercase</SuperButton>
                <SuperButton rounded>Rounded</SuperButton>
            </div>
        </>
    )
}

export default SuperButtonDemo