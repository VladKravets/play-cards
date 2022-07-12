import React, { useState } from 'react'
import { SuperAlert, SuperAlertVariantType } from '../../../main/ui/common/SuperAlert/SuperAlert'
import SuperButton from '../../../main/ui/common/SuperButton/SuperButton'

export const SuperAlertDemo = () => {
	const [displayAlert, setAlertDisplay] = useState<AlertItemType>({variant: undefined, message: ''})

	const showInfoAlert = () => setAlertDisplay({variant: 'info', message: 'This is INFO alert message'})
	const showSuccessAlert = () => setAlertDisplay({variant: 'success', message: 'This is SUCCESS alert message'})
	const showErrorAlert = () => setAlertDisplay({variant: 'error', message: 'This is ERROR alert message'})

	const hideAlert = () => setAlertDisplay({variant: undefined, message: ''})

	return (
		<div>
			<div style={{display: 'flex', gap: '20px'}}>
				<SuperButton btnStyle='dark' onClick={showInfoAlert}>Show Info Alert</SuperButton>
				<SuperButton btnStyle='success' onClick={showSuccessAlert}>Show Success Alert</SuperButton>
				<SuperButton btnStyle='danger' onClick={showErrorAlert}>Show Error Alert</SuperButton>
			</div>
				<SuperAlert 
					variant={displayAlert.variant}
					displayMode={!!displayAlert.message}
					onUnmountHandler={hideAlert}
					displayDuration={2000}>
						{displayAlert.message}
				</SuperAlert>

		</div>
	)
}


type AlertItemType = {variant: SuperAlertVariantType, message: string}