import React, { FC, useEffect, useRef, useState } from 'react';
import SuperInputText from '../SuperInputText/SuperInputText';
import s from './DeferredTextInput.module.css'

/**
 * WARNING: Wrap all callback functions in useCallback to work properly
 */
export const DeferredTextInput: FC<DeferredTextInputPropsType> = React.memo( (
    {
        inputDefer = 1000, onChange, validateValue, className,
        superTextInputWrapperCN, ...restProps
    }
) => {

    const deferTimerId = useRef<number | null>(null)
    const isFirstRender = useRef(true)
    const error = useRef('')

    const [inputValue, setInputValue] = useState('')


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        
        // componentDidUpdate functionality below
        if (deferTimerId.current) clearTimeout(deferTimerId.current)

        if (!isFirstRender.current) {

            deferTimerId.current = +setTimeout(() => {

                error.current = validateValue ? validateValue(inputValue) : ''

                if (!error.current) {

                    onChange(inputValue)
                }  
            }, inputDefer)
        }
        
    }, [inputValue, onChange, inputDefer, validateValue])

    useEffect(() => {

        // componentWillUnmount cleanup
        return () => {
            if (deferTimerId.current) clearTimeout(deferTimerId.current)
        }
    }, [])


    const deferredTextInputCN = `${s.wrapper} ${className || ''}`
    const superTextInputCN = superTextInputWrapperCN || ''

    return (
        <div className={deferredTextInputCN}>
            <SuperInputText
                className={superTextInputCN}
                value={inputValue}
                onChangeText={setInputValue}
                error={error.current}
                {...restProps} />    
        </div>
    )
})


type DeferredTextInputPropsType = {
    /** DeferredTextInput wrapper className */
    className?: string
    /** SuperInput common component wrapper className */
    superTextInputWrapperCN?: string
    /**
     * Set defer time in milliseconds
     */
    inputDefer?: number
    /**
     * WARNING: Wrap the function in useCallback to work properly
     */
    onChange: (text: string) => void
    /**
     * WARNING: Wrap the function in useCallback to work properly
     */
    validateValue?: (value: string) => string


    // SuperInput props
    label?: string
    placeholder?: string
    /** html input el className */
    inputClassName?: string
    /** span el with error message className */
    spanClassName?: string
}