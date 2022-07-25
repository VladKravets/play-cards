import React from 'react'
import { packsActions } from '../../../../main/bll/reducers/packsReducer'
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store'
import SuperButton from '../../../../main/ui/common/SuperButton/SuperButton'
import { CardsCountRange } from './CardsCountRange/CardsCountRange'
import s from './PacksFilters.module.css'
import { PacksOwnerFilter } from './PacksOwnerFilter/PacksOwnerFilter'
import { PacksSearchInput } from './PacksSearchInput/PacksSearchInput'
import { SearchInfo } from './SearchInfo/SearchInfo'
import { SearchInfoBlock } from './SearchInfoBlock/SearchInfoBlock'

export const PacksFilters = () => {




	return (
		<div className={s.packFilters}>
			<div className={s.filtersHeader}>
				<h2 className={s.blockTitle}>Show packs</h2>
				{/* <SearchInfo /> */}
			</div>
			<PacksSearchInput />
			<PacksOwnerFilter />
			<CardsCountRange />
			<SearchInfoBlock />
		</div>
	)
}