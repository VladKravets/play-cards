import React, { ChangeEvent } from 'react'
import s from './DoubleRange.module.css'


const DoubleRange: React.FC<DoubleRangePropsType> = (
    {
        onChangeRange, value,
        min = 0, max = 100, step = 1, disable = false, withValueIndicators = true
    }
) => {
    
    const onChangeCallback = ([value1, value2]: onChangeCallbackArgsType) => {
        if (value && value.length === 2) {

            if ( onChangeRange && (typeof value1 === 'number') ) onChangeRange([value1, value[1]])
            if ( onChangeRange && (typeof value2 === 'number') ) onChangeRange([value[0], value2])
        }
    }

    const onFirstInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeCallback([+e.currentTarget.value, undefined])
    }
    const onSecondInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeCallback([undefined, +e.currentTarget.value])
    }

    const commonProps = {min, max, step, disabled: disable, className: s.range__input, type: "range"}
    
    return (
        <div className={s.slider__wrapper}>
            {/* Hide SelectedRangeLine if DoubleRange value uncontrolled */}
            {value && <SelectedRangeLine values={value} maxValue={max}/> }

            {/* ATTENTION: ValueIndicator must be as next sibling of input (next sibling selector used in css styles) */}
            <input value={value && value[0]} onChange={onFirstInputChange}  {...commonProps}/>
            {value && withValueIndicators && <ValueIndicator currentValue={value[0]} maxValue={max} />} {/* Hide ValueIndicator if DoubleRange value uncontrolled */}

            {/* ATTENTION: ValueIndicator must be as next sibling of input (next sibling selector used in css styles) */}
            <input value={value && value[1]} onChange={onSecondInputChange} {...commonProps} />
            {withValueIndicators && value && <ValueIndicator currentValue={value[1]} maxValue={max} />} {/* Hide ValueIndicator if DoubleRange value uncontrolled */}
        </div>
    )
}


const SelectedRangeLine: React.FC<{values: [number, number], maxValue: number}> = ({values, maxValue}) => {
    let [v1, v2] = values

    const rangeSelectedLineWidth = ( Math.abs(v1 - v2) ) / ( maxValue / 100 ) + '%'

    const startPosition = v1 < v2 
        ? v1 / (maxValue / 100) + '%' 
        : v2 / (maxValue / 100) + '%'

    const rangeSelectedLineStyle = { left: startPosition, width: rangeSelectedLineWidth }

    return (
        <div style={rangeSelectedLineStyle} className={s.range__selected_line}></div>
    )
}


const ValueIndicator: React.FC<{currentValue: number, maxValue: number}> = ({currentValue, maxValue}) => {

    const valueIndicatorPosition = currentValue / (maxValue / 100) + '%' 

    return (
        <div style={{left: valueIndicatorPosition}} className={s.range__value_indicator} >
            <div>
                {currentValue}
            </div>
        </div>
    )
}

export default DoubleRange


type DoubleRangePropsType = {
    onChangeRange?: (value: DoubleRangeValueType) => void
    value?: DoubleRangeValueType
    min?: number
    max?: number
    step?: number
    disable?: boolean
    withValueIndicators?: boolean // works only with controlled value prop
}

export type DoubleRangeValueType = [number, number]

type onChangeCallbackArgsType = [value1: number, value2: undefined] | [value1: undefined, value2: number]