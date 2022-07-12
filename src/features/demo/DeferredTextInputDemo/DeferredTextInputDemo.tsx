import React, { useState } from 'react'
import { DeferredTextInput } from '../../../main/ui/common/DeferredTextInput/DeferredTextInput'

export const DeferredTextInputDemo = () => {

	const [value, setValue] = useState('')

	return (
		<>
			<DeferredTextInput onChange={setValue} label="Write something here"/>
			<div style={{width: '320px', height: '40px', fontSize: '22px', color: '#666666'}}>
				{value}
			</div>
		</>
	)
}