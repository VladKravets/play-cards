import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonStyleType = 'primary' | 'outline_primary' | 'success' | 'outline_success' 
                        | 'danger' | 'outline_danger' | 'warning' | 'outline_warning'
                        | 'dark' | 'outline_dark'
type ButtonSizeType = 'small' | 'medium' | 'large'

type SuperButtonPropsType = DefaultButtonPropsType & {
    btnStyle?: ButtonStyleType
    btnSize?: ButtonSizeType
    upperCase?: boolean
    rounded?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        className,
        btnStyle,
        btnSize,
        upperCase,
        rounded,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const size = btnSize || 'medium'
    const style = `btn_${btnStyle}`
    const finalClassName = `${s.btn} ${s[size]}` 
        + `${btnStyle ? ` ${s[style]}` : ''}` 
        + `${upperCase ? ` ${s.upperCase}` : ''}`
        + `${rounded ? ` ${s.rounded}` : ''}`
        + `${className ? ` ${className}` : ''}`

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
