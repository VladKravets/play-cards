import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { packsActions } from '../../../../../main/bll/reducers/packsReducer'
import { useAppDispatch, useAppSelector } from '../../../../../main/bll/store'
import DoubleRange, { DoubleRangeValueType } from '../../../../../main/ui/common/DoubleRange/DoubleRange'
import s from './CardsCountRange.module.css'

export const CardsCountRange = () => {

	const dispatch = useAppDispatch()
	const minCardsCount = useAppSelector(state => state.packs.filters.min)
	const maxCardsCount = useAppSelector(state => state.packs.filters.max)

	const [rangeValue, setRangeValue] = useState<DoubleRangeValueType>([minCardsCount, maxCardsCount])

	const onChangeHandler = (value: DoubleRangeValueType ) => {
		const rangeValues = [...value].sort((a,b) => a-b) as DoubleRangeValueType
		setRangeValue(rangeValues)
	}


	const deferCallback = useCallback( (value: DoubleRangeValueType ) => {

		dispatch(packsActions.setCardsCountRange(...value))
	}, [dispatch])


	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{`Number of cards: `}
				<span className={s.currentValue}>
					{`${minCardsCount} - ${maxCardsCount}`}
				</span>
			</div>
			<DoubleRange onChangeRange={onChangeHandler} value={rangeValue} max={110} />
			<DeferredRequest value={rangeValue} callback={deferCallback}/>
		</div>
	)
}




/**
 * WARNING: Wrap functions in useCallback and arr/obj in useMemo to work properly
 */
const DeferredRequest: FC<DeferredRequestPropsType> = React.memo( ({requestDefer = 1000, value, callback}) => {
	const deferTimerId = useRef<number | null>(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        
        // componentDidUpdate functionality below
        if (deferTimerId.current) clearTimeout(deferTimerId.current)

        if (!isFirstRender.current) {

            deferTimerId.current = +setTimeout(() => {

                    callback(value)

            }, requestDefer)
        }
        
    }, [value, callback, requestDefer])

    useEffect(() => {

        // componentWillUnmount cleanup
        return () => {
            if (deferTimerId.current) clearTimeout(deferTimerId.current)
        }
    }, [])


	return (
		<div className={s.hidden_stub}></div>
	)
})


type DeferredRequestPropsType = {
	requestDefer?: number
	value: DoubleRangeValueType
	callback: (value: DoubleRangeValueType) => void
}








// CardsCountDoubleRange example (without defer)

// export const CardsCountRange = () => {

// 	const dispatch = useAppDispatch()
// 	const minCardsCount = useAppSelector(state => state.packs.filters.min)
// 	const maxCardsCount = useAppSelector(state => state.packs.filters.max)

// 	const value = useMemo(() => [minCardsCount, maxCardsCount], [minCardsCount, maxCardsCount]) as DoubleRangeValueType

// 	const onChangeHandler = (value: DoubleRangeValueType ) => {
// 		const rangeValues = [...value].sort((a,b) => a-b)
// 		//@ts-ignore
// 		dispatch(packsActions.setCardsCountRange(...rangeValues))
// 	}

// 	return (
// 		<>
// 			<DoubleRange onChangeRange={onChangeHandler} value={value} max={110} />
// 		</>
// 	)
// }