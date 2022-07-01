import React, { useState } from 'react'
import SuperCheckbox from '../../../main/ui/common/SuperCheckbox/SuperCheckbox'

const SuperCheckboxDemo = () => {

    const [value, setValue] = useState(false);

    return (
        <SuperCheckbox checked={value} onChangeChecked={setValue}>Label here</SuperCheckbox>
    )
}

export default SuperCheckboxDemo