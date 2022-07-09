import React, { FC, useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../main/bll/store";
import {
    deletePackTC,
    editPackTC,
    learnPackTC,
    packsActions,
    setPacksListTC
} from "../../../../main/bll/reducers/packsReducer";
import SuperButton from "../../../../main/ui/common/SuperButton/SuperButton";
import { PATH } from "../../../../utils/path";
import s from './PacksTable.module.css'
import { PackType } from '../../../../main/api/packListAPI';



export const PacksTable = React.memo(() => {

    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile.userData._id)

    useEffect(() => {
        dispatch(setPacksListTC())

        return () => {
            dispatch( packsActions.setPacksList([]) )
        }
    }, [])


    const tableRows = packs.map(pack => <PacksTableRow key={pack._id} pack={pack} isOwner={userId === pack.user_id}/>)

    return (
        <Grid container justifyContent={'center'}>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">

                        <TableHead>
                            <TableRow style={{backgroundColor: '#F9F9FE' }}>
                                <TableCell align="left"> Name</TableCell>
                                <TableCell align="center">Total cards</TableCell>
                                <TableCell align="center">Last updated</TableCell>
                                <TableCell align="center">Created by</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { tableRows }
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        </Grid>
    );
})



const PacksTableRow: FC<PacksTableRowPropsType> = ({pack, isOwner}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cardsListPath = PATH.cardsList.replace(/:packId/, '')

    const deletePackHandler = (packId: string) => {
        dispatch(deletePackTC(packId))

    }
    const editPackNameHandler = (packId: string, name: string) => {
        dispatch(editPackTC(packId, 't'))
        return <Navigate to={'/cards'} />
    }
    const learnPackHandler = (packId: string) => {
        dispatch(learnPackTC(packId));
        navigate(PATH.training + packId);
    }

    return (
        <TableRow key={pack._id}>
            <TableCell component="th" scope="row">
                <NavLink to={cardsListPath + pack._id}>
                    {pack.name}
                </NavLink>
            </TableCell>
            <TableCell style={{ width: 170 }} align="center">
                {pack.cardsCount}
            </TableCell>
            <TableCell style={{ width: 170 }} align="center">
                {pack.updated.slice(0, 10)}
            </TableCell>

            <TableCell style={{ width: 170 }} align="center">
                {pack.user_name}
            </TableCell>
            <TableCell style={{ width: 300 }} align="center">

                {isOwner
                    ? <>
                        <SuperButton btnStyle="danger" onClick={() => {
                            deletePackHandler(pack._id)}}>Delete
                        </SuperButton>
                        <SuperButton btnStyle="primary" onClick={() => {
                            editPackNameHandler(pack._id, pack.name)}}>Edit
                        </SuperButton> 
                    </>
                    : undefined}
                    


                <SuperButton btnStyle="success"
                    onClick={() => learnPackHandler(pack._id)}
                >Learn</SuperButton>

            </TableCell>
        </TableRow>
    )
}


type PacksTableRowPropsType = {
    pack: PackType
    isOwner: boolean
}