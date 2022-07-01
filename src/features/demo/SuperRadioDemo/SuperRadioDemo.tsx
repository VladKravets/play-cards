import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import SuperRadio from '../../../main/ui/common/SuperRadio/SuperRadio'


const someOptions = [
    {label: "HTML", value: 'html', disabled: false},
    {label: "CSS", value: 'css', disabled: false},
    {label: "JS", value: 'js', disabled: false},
]

const SuperRadioDemo = () => {

    const [selectedOption, setSelectedOption] = useState('')
    
    const wrapperStyle = {display: 'flex', flexDirection: 'column', gap: '6px'} as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

    return (
        <div style={wrapperStyle}>
            <SuperRadio options={someOptions} value={selectedOption} onChangeOption={setSelectedOption} />
        </div>
    )
}

export default SuperRadioDemo