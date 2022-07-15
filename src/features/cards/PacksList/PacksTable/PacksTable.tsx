import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from "react-router-dom";
import { PATH } from "../../../../utils/path";
import { PackType } from '../../../../main/api/packListAPI';
import { PacksActions } from './PacksActions/PacksActions';


export const PacksTable: FC<PacksTablePropsType> = React.memo(({packs, authUserId}) => {

    const tableRows = packs.map(pack => (
        <PacksTableRow key={pack._id} pack={pack} isOwner={authUserId === pack.user_id}/>
    ))

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 500}} aria-label="custom pagination table">

                <PacksTableHead/>
                
                <TableBody>

                    {(packs.length < 1)
						&& <TableCell align="left">Packs list is empty</TableCell>
					}

                    {tableRows}

                </TableBody>

            </Table>
        </TableContainer>
    )
})


const PacksTableHead = () => {
    return (
        <TableHead>
            <TableRow style={{backgroundColor: '#f4d4ff'}}>
                <TableCell align="left"> Name</TableCell>
                <TableCell align="center">Total cards</TableCell>
                <TableCell align="center">Last updated</TableCell>
                <TableCell align="center">Created by</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
        </TableHead>
    )
}


const PacksTableRow: FC<PacksTableRowPropsType> = ({pack, isOwner}) => {

    const cardsListPath = PATH.cardsList.replace(/:packId/, '')

    return (
        <TableRow key={pack._id}>

            <TableCell component="th" scope="row">
                <NavLink to={cardsListPath + pack._id}> {pack.name} </NavLink>
            </TableCell>

            <TableCell style={{width: 120}} align="center">
                {pack.cardsCount}
            </TableCell>

            <TableCell style={{width: 140}} align="center">
                {pack.updated.slice(0, 10)}
            </TableCell>

            <TableCell style={{width: 170}} align="center">
                {pack.user_name}
            </TableCell>

            <TableCell style={{width: 150}} align="center">
                <PacksActions isOwner={isOwner} packId={pack._id} packName={pack.name} />
            </TableCell>

        </TableRow>
    )
}


type PacksTablePropsType = {
    packs: PackType[]
    authUserId: string
}

type PacksTableRowPropsType = {
    pack: PackType
    isOwner: boolean
}