import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import StudentTableToolbar from "./StudentTableToolbar";
import StudentTableHead from "./StudentTableHead";
import { studentMock } from "../../mock";
import StudentModal from "../modal/StudentModal";
import StudentForm from "../form/StudentForm";

const INITFORMVALUES = {
  id: "",
  name: "",
  studentId: "",
  email: "",
  phone: "",
  location: "",
  gender: "",
};

function StudentTable({ title }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [addEditForm, setAddEditFormState] = useState(INITFORMVALUES);
  const [clickedRow, setClickedRow] = useState(null);

  useEffect(() => {
    setRows(studentMock);
    return () => {
      setRows([]);
    };
  }, []);

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleClickOpen = (clickedRow) => {
    setClickedRow(clickedRow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onUpdateStudent = () => {
    if (
      addEditForm.email &&
      addEditForm.gender &&
      addEditForm.location &&
      addEditForm.name &&
      addEditForm.phone &&
      addEditForm.studentId
    ) {
      const elementIndex = rows.findIndex((row) => row.id === addEditForm.id);
      rows[elementIndex] = addEditForm;
      setRows(rows);
      handleClose();
    }
  };

  const options = rows.map((row) => {
    return {
      id: row.id,
      name: row.location,
    };
  });

  const studentModalBody = (
    <StudentForm
      options={options}
      clickedRow={clickedRow}
      formState={addEditForm}
      setFormState={setAddEditFormState}
      onSubmitHandler={onUpdateStudent}
    />
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <StudentTableToolbar
          numSelected={selected.length}
          title={title}
          rows={rows}
          selected={selected}
          setRows={setRows}
          setSelected={setSelected}
          addEditForm={addEditForm}
          setAddEditFormState={setAddEditFormState}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <StudentTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.studentId}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleClickOpen(row)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <StudentModal
          title={"Edit STUDENT"}
          body={studentModalBody}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </Paper>
    </Box>
  );
}

export default StudentTable;

StudentTable.propTypes = {
  title: PropTypes.string.isRequired,
};
