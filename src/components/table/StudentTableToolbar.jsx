import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import StudentModal from "../modal/StudentModal";
import "../../App.css";
import Button from "@mui/material/Button";
import StudentForm from "../form/StudentForm";

const StudentTableToolbar = (props) => {
  const {
    numSelected,
    title,
    rows,
    setRows,
    selected,
    setSelected,
    addEditForm,
    setAddEditFormState,
  } = props;
  const [open, setOpen] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const options = rows.map((row) => {
    return {
      id: row.id,
      name: row.location,
    };
  });

  const onDeleteIconClick = () => {
    setDeleteModalShow(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onAddStudent = () => {
    if (
      addEditForm.email &&
      addEditForm.gender &&
      addEditForm.location &&
      addEditForm.name &&
      addEditForm.phone &&
      addEditForm.studentId
    ) {
      const id = Math.floor(Math.random() * 31) + 50;
      addEditForm.id = id;
      setRows((oldArray) => [...oldArray, addEditForm]);
      handleClose();
    }
  };

  const studentModalBody = (
    <StudentForm
      options={options}
      clickedRow={null}
      formState={addEditForm}
      setFormState={setAddEditFormState}
      onSubmitHandler={onAddStudent}
    />
  );

  const onDeleteRecords = () => {
    const filteredData = rows.filter((row) =>
      selected.every((selectedId) => row.id !== selectedId)
    );

    setRows([...filteredData]);
    setSelected([]);
    setDeleteModalShow(false);
  };

  const deleteModalBody = (
    <div>
      <span>Are you sure you want to delete ?</span>
    </div>
  );

  const deleteModalFooter = (
    <div>
      <Button
        variant="contained"
        className="button-spacing"
        onClick={() => onDeleteRecords()}
      >
        Yes
      </Button>
      <Button variant="outlined" onClick={() => setDeleteModalShow(false)}>
        No
      </Button>
    </div>
  );

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteIconClick}>
            <DeleteIcon className="delete-btn" />
          </IconButton>
        </Tooltip>
      ) : null}

      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Add
      </Button>
      <StudentModal
        title={"ADD STUDENT"}
        body={studentModalBody}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <StudentModal
        title={"Delete Confirmation"}
        body={deleteModalBody}
        open={deleteModalShow}
        footer={deleteModalFooter}
        handleClickOpen={onDeleteIconClick}
        handleClose={() => setDeleteModalShow(false)}
      />
    </Toolbar>
  );
};

export default StudentTableToolbar;

StudentTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
  rows: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  setRows: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  setSelected: PropTypes.func,
  addEditForm: PropTypes.object,
  setAddEditFormState: PropTypes.func,
};
