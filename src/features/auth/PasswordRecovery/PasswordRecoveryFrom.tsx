import React from 'react'
import { useFormik } from 'formik'
import { requestPasswordRecoveryTC } from '../../../main/bll/reducers/passwordRecoveryReducer'
import { useAppDispatch, useAppSelector } from '../../../main/bll/store'
import SuperButton from '../../../main/ui/common/SuperButton/SuperButton'
import SuperInputText from '../../../main/ui/common/SuperInputText/SuperInputText'
import { validateField } from '../../../utils/fieldValidators'
import s from './PasswordRecovery.module.css'


// AuthBlock: error, trigger, loadingStatus
// todo: handle error with snackbar
// todo: isLoadig -> add flat spinner
export const PasswordRecoveryFrom = () => {

    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.passwordRecovery.isLoading)
        

    const formik = useFormik({
        initialValues: {
            email: '',
        },

        validate: (values) => {
            const errors: {email?: string} = {}

            validateField.required(values.email, errors, 'email')
            validateField.isEmail(values.email, errors, 'email')

            return errors
        },

        onSubmit: values => {
            dispatch( requestPasswordRecoveryTC(values.email) )

        },
    })

    const emailError = (formik.errors.email && formik.touched.email) ? formik.errors.email : ''

    return (
        <form className={s.recoveryForm} onSubmit={formik.handleSubmit}>

            <SuperInputText
                type='email'
                label='Email'
                error={emailError}
                {...formik.getFieldProps('email')} />

            <div className={s.recoveryNote}>Enter your email address and we will send you further instructions</div>    

            <SuperButton disabled={isLoading} type='submit' btnStyle='primary' className={s.submitBtn}>
                Send Instructions
            </SuperButton>
        </form>
    )
}