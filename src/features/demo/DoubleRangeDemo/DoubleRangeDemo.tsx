import React, { useState } from 'react'
import DoubleRange, { DoubleRangeValueType } from '../../../main/ui/common/DoubleRange/DoubleRange'

const DoubleRangeDemo = () => {

    const [doubleRangeValue, setDoubleRangeValue] = useState<DoubleRangeValueType>([0, 100])
    const onDoubleRangeChange = (value: DoubleRangeValueType) => setDoubleRangeValue(value)

    return (
        <DoubleRange value={doubleRangeValue} onChangeRange={onDoubleRangeChange}/>
    )
}

export default DoubleRangeDemo