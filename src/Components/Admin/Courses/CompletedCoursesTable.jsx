import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const CompletedCoursesTable = () => {
   const rows=[]
  return (
    <TableContainer component={Paper} sx={{marginTop:"1rem"}}>
  <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Course Name</StyledTableCell>
        <StyledTableCell align="right">Assigned on</StyledTableCell>
        <StyledTableCell align="right">Ended on</StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.name}>
          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="right">{row.assigned_on}</StyledTableCell>
          <StyledTableCell align="right">{row.ends_on}</StyledTableCell>

        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  )
}

export default CompletedCoursesTable