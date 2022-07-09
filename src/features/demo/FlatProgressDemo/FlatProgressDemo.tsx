import React from 'react'
import { FlatProgress } from '../../../main/ui/common/FlatProgress/FlatProgress'

export const FlatProgressDemo = () => {
    return (
        <div style={{ width: '95vw' }}>
            <FlatProgress isLoading={true} withColoredLine/>
        </div>
    )
}