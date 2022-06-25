import React from 'react';
import s from "./Login.module.css";
import SuperInputText from "../../../main/ui/common/SuperInputText/SuperInputText";
import SuperCheckbox from "../../../main/ui/common/SuperCheckbox/SuperCheckbox";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../main/ui/routes/RoutesList";
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton";
import {loginTC} from "../../../main/bll/reducers/loginReducer";
import {useAppDispatch} from "../../../main/bll/store";
import {useFormik} from "formik";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Min password length 3';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password, values.rememberMe));
            formik.resetForm();
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <span className={s.inputLabel} style={{marginTop: '0px'}}>Email</span>
            <SuperInputText
                className={s.input}
                placeholder={'Email'}
                type="email"
                {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
            <span className={s.inputLabel} style={{marginTop: '10px'}}>Password</span>
            <SuperInputText className={s.input}
                            placeholder={'Password'}
                            {...formik.getFieldProps('password')}
            />
            {formik.errors.password && formik.touched.password &&
                <div style={{color: "red"}}>{formik.errors.password}</div>}

            <label className={s.rememberMe}>
                <SuperCheckbox
                    {...formik.getFieldProps('rememberMe')}
                >{' '}</SuperCheckbox>Remember me
            </label>
            <NavLink to={PATH.passwordRecovery}
                     className={s.forgotPass}>
                Lost your password?
            </NavLink>
            <SuperButton type={'submit'} className={s.submit}>
                Login
            </SuperButton>
        </form>
    );
};

export default LoginForm;
