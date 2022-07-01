import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    label?: string
    error?: string
    inputClassName?: string
    spanClassName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // we block type property here (we dont use this later)
        onChange, onChangeText,
        onKeyPress, onEnter,
        label = '',
        error,
        className = '', inputClassName = '', spanClassName,

        ...restProps // all other props
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // if onChange (default input property) exist
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalWrapperCN = `${s.wrapper} ${className}`
    const finalInputCN = `${s.superInput} ${inputClassName} ${(error && s.errorInput) || ''}`
    const finalSpanCN = `${s.errorSpan} ${(spanClassName && spanClassName) || ''}`

    return (
        <div className={finalWrapperCN}>
            <label>
                <span className={s.label}>{label}</span>
                <input
                    type={'text'}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputCN}

                    {...restProps} // other default input props
                />
            </label>
            {error && <span className={finalSpanCN}>{error}</span>}
        </div>
    )
}

export default SuperInputText
