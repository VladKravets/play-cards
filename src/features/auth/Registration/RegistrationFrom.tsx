import React from 'react'
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText"
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton"
import { useFormik } from "formik"
import { useAppDispatch } from "../../../main/bll/store"
import { validateField } from '../../../utils/fieldValidators'
import s from './Registration.module.css'
import { registerUserTC } from '../../../main/bll/reducers/registrationReducer'

// AuthBlock: error, trigger, loadingStatus
// todo: handle error with snackbar
// todo: isLoadig -> add flat spinner
const RegistrationFrom = () => {

	const dispatch = useAppDispatch()


	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			password2: '',
		},

		validate: (values) => {
			const errors: RegFormErrorsType = {}

			validateField.required(values.email, errors, 'email')
			validateField.isEmail(values.email, errors, 'email')

			validateField.required(values.password, errors, 'password')
			validateField.minLength(values.password, errors, 'password', 8)

			validateField.required(values.password2, errors, 'password2')
			validateField.isEqual(values.password2, errors, 'password2', values.password)

			return errors
		},

		onSubmit: values => {
			dispatch(registerUserTC(values.email, values.password))

			formik.resetForm()
		},
	})

	const emailError = (formik.errors.email && formik.touched.email) ? formik.errors.email : ''
	const passwordError = (formik.errors.password && formik.touched.password) ? formik.errors.password : ''
	const password2Error = (formik.errors.password2 && formik.touched.password2) ? formik.errors.password2 : ''

	return (
		<form className={s.regForm} onSubmit={formik.handleSubmit}>

			<SuperInputText
				type='email'
				label='Email'
				error={emailError}
				{...formik.getFieldProps('email')} />

			<SuperInputText 
				type='password'
				label='Password'
				error={passwordError}
				{...formik.getFieldProps('password')} />

			<SuperInputText
				type='password'
				label='Confirm password'
				error={password2Error}
				{...formik.getFieldProps('password2')} />


			<SuperButton type='submit' btnStyle='primary' className={s.submitBtn}>
				Register
			</SuperButton>
		</form>
	)
}

export default RegistrationFrom




type RegFormErrorsType = {
	email?: string
	password?: string
	password2?: string
}