import React, { FC, useState } from 'react'
import { CardType, SortType } from '../../../../main/api/cardsAPI'
import s from './CardsTable.module.css'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Rating from "@mui/material/Rating";
import StarIcon from '@mui/icons-material/Star';
import TableFooter from "@mui/material/TableFooter";
import { getCardsTC } from '../../../../main/bll/reducers/cardsReducer';
import { useAppDispatch, useAppSelector } from '../../../../main/bll/store';

export const CardsTable: FC<CardsTablePropsType> = ({cards, selectedPackId, page}) => {

	const dispatch = useAppDispatch()
	const userId = useAppSelector(state => state.profile.userData._id)

	const [sort, setSort] = useState<SortType>('0updated')

    const sortHandler = () => {
        if (sort === '0updated') {
            dispatch(getCardsTC({cardsPack_id: selectedPackId, page, pageCount: 8, sortCards: '0updated'}))
            setSort('1updated')
        } else {
            dispatch(getCardsTC({cardsPack_id: selectedPackId, page, pageCount: 8, sortCards: '1updated'}))
            setSort('0updated')
        }
    }



	const tableRows = cards.map(card => <CardsTableRow key={card._id} card={card} isOwner={userId === card.user_id}/>)

	return (
		<TableContainer component={Paper} className={s.container}>
			<Table aria-label="custom pagination table">

				<TableHead>
					<TableRow style={{backgroundColor: '#F9F9FE' }}>
						<TableCell align="left">Question</TableCell>
						<TableCell align="center">Answer</TableCell>
						<TableCell align="center" onClick={sortHandler}>Last Updated</TableCell>
						<TableCell align="center">Grade</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>


				<TableBody>

					{(cards.length < 1)
						&& <TableCell align="left">Cards list is empty</TableCell>
					}

					{tableRows}

				</TableBody>


				<TableFooter>
					{/*<Paginator setPage={setPage} currentPage={page} amountOfPages={amountOfCards} />*/}
				</TableFooter>
			</Table>
		</TableContainer>
	)
}



const CardsTableRow: FC<CardsTableRowPropsType> = ({card, isOwner}) => {
	return (
		<TableRow key={card._id}>
			<TableCell component="th" scope="row">
				{card.question}
			</TableCell>
			<TableCell style={{ width: 150 }} align="right">
				{card.answer}
			</TableCell>
			<TableCell style={{ width: 150 }} align="right">
				{card.updated.split('T')[0].replace(/-/gi, '.')}
			</TableCell>
			<TableCell style={{ width: 150 }} align="right">
				<Rating
					name="simple-controlled"
					value={3}
					readOnly
					precision={0.5}
					emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
				/>
			</TableCell>
			<TableCell style={{ width: 150 }} align="center">
				{isOwner ? 'CardActions' : '-'}
			</TableCell>
		</TableRow>
	)
}




type CardsTablePropsType = {
	cards: CardType[]
	selectedPackId: string
	page: number
}
type CardsTableRowPropsType = {
	card: CardType
	isOwner: boolean
}