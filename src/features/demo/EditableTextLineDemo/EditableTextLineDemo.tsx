import React, { useState } from 'react'
import EditableTextLine from '../../../main/ui/common/EditableTextLine/EditableTextLine'

const EditableTextLineDemo = () => {

    const [textLineValue, setTextLineValue] = useState('Editable text line')

    return (
        <EditableTextLine text={textLineValue} setNewText={setTextLineValue} />
    )
}

export default EditableTextLineDemo