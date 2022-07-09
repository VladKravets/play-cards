import React from 'react'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../main/bll/store'
import SuperButton from '../../../main/ui/common/SuperButton/SuperButton'
import SuperInputText from '../../../main/ui/common/SuperInputText/SuperInputText'
import { validateField } from '../../../utils/fieldValidators'
import s from './NewPassword.module.css'
import { createNewPasswordTC } from '../../../main/bll/reducers/newPasswordReducer'

// AuthBlock: error, trigger, loadingStatus
// todo: handle error with snackbar
// todo: isLoadig -> add flat spinner
export const NewPasswordForm = () => {

    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.newPassword.isLoading)
    const newPasswordToken = useAppSelector(state => state.newPassword.newPasswordToken)

    const formik = useFormik({
        initialValues: {
            password: '',
        },

        validate: (values) => {
            const errors: {password?: string} = {}

            validateField.required(values.password, errors, 'password')
			validateField.minLength(values.password, errors, 'password', 8)

            return errors
        },

        onSubmit: values => {
            dispatch( createNewPasswordTC(values.password, newPasswordToken) )
        },
    })

    const passwordError = (formik.errors.password && formik.touched.password) ? formik.errors.password : ''

    return (
        <form className={s.newPasswordForm} onSubmit={formik.handleSubmit}>

            <SuperInputText
                passwordType
                type='password'
                label='Password'
                error={passwordError}
                {...formik.getFieldProps('password')} />

            <div className={s.newPasswordNote}>Create new password and we will send you further instructions to email</div>    

            <SuperButton disabled={isLoading} type='submit' btnStyle='primary' className={s.submitBtn}>
                Create new password
            </SuperButton>
        </form>
    )
}
