import React, { ChangeEvent, useState } from 'react'
import SuperInputText from '../SuperInputText/SuperInputText'
import s from './EditableTextLine.module.css'
import pencilIcon from '../../../../assets/icons/pencil.svg'


/** Set edit mode with double click on text line */
const EditableTextLine: React.FC<EditableTextLinePropsType> = React.memo( ({
text, setNewText, textCN, disabled = false, withEditIcon = true}) => {

    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [validationError, setValidationError] = useState('');

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const onActivateEditMode = () => {
        if (disabled) return

        setEditMode(true);
        setInputValue(text);
    }

    const onTextSubmit = () => {
        setValidationError('')

        let value = inputValue.trim();

        if (value === '') {
            setValidationError('Please enter some text');
            setInputValue('');
            return;
        }

        setEditMode(false);
        setNewText(value);
    }

    const onBlurHandler = () => {
        onTextSubmit();
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onTextSubmit();
        }
    }


    const finalTextLineCN = s.textLine
    + `${withEditIcon ? ` ${s.textLineWithIcon}` : ''}`
    + `${textCN ? ` ${textCN}` : ''}`

    return (
        <div className={s.wrapper}>
            {editMode 
                ? <SuperInputText
                    value={inputValue}
                    onChange={onInputChangeHandler}
                    onBlur={onBlurHandler}
                    onKeyPress={onKeyPressHandler}
                    autoFocus
                    disabled={disabled}
                    error={validationError} />
        
                : <span className={finalTextLineCN} onDoubleClick={onActivateEditMode}>
                    {text}

                    {withEditIcon 
                        && <img 
                            src={pencilIcon}
                            alt="edit"
                            className={s.editIcon}
                            onClick={onActivateEditMode} />
                    }
                </span>
            }
        </div>
    )
    
})

export default EditableTextLine

type EditableTextLinePropsType = {
    text: string
    setNewText: (newText: string) => void
    /**
     * Text classnames
     */
    textCN?: string
    disabled?: boolean
    /**
     * Set edit mode with single click on this icon
     */
    withEditIcon?: boolean
}