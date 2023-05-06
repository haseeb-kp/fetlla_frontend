import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  border: '1px solid #000',
  borderRadius: '4px',
  padding: '5px 10px',
  textTransform: 'none',
  '&:hover': {
    background: '#000',
    color: '#fff',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AssignedCoursesTable = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const token = useSelector((state) => state.token);
  const handleMarkButton = async (id) => {
    try {
      const response = await axios.patch(`user/mark_as_completed/${id}/`,{}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        toast.success('Course marked as completed.');
        getPendingCourses();
      } else {
        toast.error('Failed to mark course as completed.');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred .');
    }
  };

  const getPendingCourses = async () => {
    try {
      const response = await axios.get(`user/pending_courses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response && response.data && Array.isArray(response.data)) {
        setRows(response.data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getPendingCourses();
  }, [id]);
  return (
    <>
    <ToastContainer />
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Course Name</StyledTableCell>
            <StyledTableCell align="right">Assigned on</StyledTableCell>
            <StyledTableCell align="right">Ends on</StyledTableCell>
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
              <StyledTableCell align="right">
                {new Date(row.assigned_on).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {new Date(row.expiry_date).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell align="right"><StyledButton size="small" variant="outline" onClick={() => handleMarkButton(row.id)}>Mark as completed</StyledButton></StyledTableCell>
              {/* <StyledTableCell align="right"></StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default AssignedCoursesTable;
