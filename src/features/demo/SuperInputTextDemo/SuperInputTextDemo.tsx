import React, { useState } from 'react'
import SuperInputText from '../../../main/ui/common/SuperInputText/SuperInputText'

const SuperInputTextDemo = () => {

    const [value, setValue] = useState('')

    return (
        <>
            <SuperInputText value={value} onChangeText={setValue} label="Basic" />
            <SuperInputText value={value} onChangeText={setValue} error="Some error message" label="Input with error" />
        </>
    )
}

export default SuperInputTextDemo