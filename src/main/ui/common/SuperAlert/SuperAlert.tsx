import React, { FC, useEffect, useRef, useState } from 'react'
import './SuperAlert.css'


/** Customize animation 
 * You can customize show/hide animation of SuperAlert
 * .super-alert styles when SuperAlert is hidden
 * .super-alert.active styles when SuperAlert is displayed */
export const SuperAlert: FC<SuperAlertPropsType> = React.memo( (
{ 
    displayMode, onUnmountHandler,
    children, variant, 
    displayDuration, transitionDuration = 600

}) => {

    const [activeStatus, setActiveStatus] = useState('')

    const removeSuperAlertId = useRef<number>()
    const removeActiveClassId = useRef<number>()

    const superAlertChildren = useRef<React.ReactNode>(children)


    useEffect(() => {
        // active class added (for animation -> transition)
        displayMode && setActiveStatus('active')

        setComponentHideTimeouts()

    }, [displayMode])


    // For correct display 
    // When the previous SuperAlert is still shown and a new one is called(with new children)
    // This content will be changed and timers will be updated with the delay time (displayDuration, transitionDuration)
    useEffect(() => {

        if (displayMode && children && children !== superAlertChildren.current) {
            setActiveStatus('active')
            
            clearTimeout(removeSuperAlertId.current)
            clearTimeout(removeActiveClassId.current)

            setComponentHideTimeouts()

            superAlertChildren.current = children
        }
        
    }, [children])


    // cleanup
    useEffect(() => {

        return () => {
            onUnmountHandler && onUnmountHandler()
            clearTimeout(removeSuperAlertId.current)
            clearTimeout(removeActiveClassId.current)
        }
    }, [])

    
    function setComponentHideTimeouts() {
        if (displayDuration && displayMode) {

            removeSuperAlertId.current = +setTimeout(() => {
                // SuperAlert component wants to be removed
                onUnmountHandler && onUnmountHandler()

            }, ( displayDuration + (transitionDuration * 2) ))
    
            removeActiveClassId.current = window.setTimeout(() => {
                // active class removed
                setActiveStatus('')
            }, (displayDuration + transitionDuration))

        }
    }


    const superAlertVariantCN = variant ? `super-alert ${variant}` : 'super-alert'
    const finalSuperAlertCN = `${superAlertVariantCN} ${activeStatus}`

    const superAlertStyle = transitionDuration ? { transition: `${transitionDuration}ms all`, } : {}

    return (
        <>
            {displayMode
                && <div className={finalSuperAlertCN} style={superAlertStyle}>
                    {children}
                </div>
            }
        </>
    )
})



export type SuperAlertPropsType = {
    /** 
     * Set property - trigger to show alert
     */
    displayMode: boolean
    /**
     * Function that sets the displayMode to false
     * Here you can put function which sets the displayMode to false
     * Or some another function that will run after the displayDuration time has elapsed
     */
    onUnmountHandler: () => void
	children?: React.ReactNode
    variant?: SuperAlertVariantType
    /** Display duration in milliseconds
     * (Pure time without animation transitions)
     */
    displayDuration?: number
    /** Transition duration in milliseconds
     * (from hidden to displayed & from displayed to hidden)
     * default 600ms
     */
    transitionDuration?: number
}

export type SuperAlertVariantType = "success" | "error" | "info" | undefined