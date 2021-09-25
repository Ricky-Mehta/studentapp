import React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { FormControl, TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import "../../App.css";

const INITFORMVALUES = {
  id: "",
  name: "",
  studentId: "",
  email: "",
  phone: "",
  location: "",
  gender: "",
};

function StudentForm({
  options,
  formState,
  setFormState,
  clickedRow,
  onSubmitHandler,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (clickedRow) {
      setFormState({
        ...formState,
        id: clickedRow.id,
        name: clickedRow.name,
        studentId: clickedRow.studentId,
        email: clickedRow.email,
        phone: clickedRow.phone,
        location: clickedRow.location,
        gender: clickedRow.gender,
      });
    }

    return () => {
      setFormState(INITFORMVALUES);
    };
  }, [clickedRow]);

  const handleFormSubmit = (e) => {
    setIsFormSubmitted(true);
    e.preventDefault();
  };

  const handleChange = (e) => {
    const {
      target: { value, name },
    } = e;

    setFormState({
      ...formState,
      [name]: value,
    });
    setIsFormSubmitted(false);
  };

  const onInputChange = (event, value) => {
    if (event) {
      setIsFormSubmitted(false);
      setFormState({
        ...formState,
        ["location"]: value,
      });
    }
  };

  return (
    <form className="student-form" onSubmit={handleFormSubmit} noValidate>
      <FormControl required component="fieldset">
        <Typography className="label-text">Full Name</Typography>
        <TextField
          size="small"
          error={!formState.name && isFormSubmitted}
          id="name"
          onChange={handleChange}
          name="name"
          placeholder="Full Name"
          value={formState.name}
        />
        {!formState.name && isFormSubmitted && (
          <FormHelperText>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl required component="fieldset">
        <Typography className="label-text">Student Id</Typography>
        <TextField
          size="small"
          id="studentId"
          error={!formState.studentId && isFormSubmitted}
          type="number"
          onChange={handleChange}
          name="studentId"
          placeholder="1234"
          value={formState.studentId}
        />
        {!formState.studentId && isFormSubmitted && (
          <FormHelperText>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl required component="fieldset">
        <Typography className="label-text">Email</Typography>
        <TextField
          size="small"
          id="email"
          error={!formState.email && isFormSubmitted}
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Email"
          value={formState.email}
        />
        {!formState.email && isFormSubmitted && (
          <FormHelperText>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl required component="fieldset">
        <Typography className="label-text">Phone</Typography>
        <TextField
          size="small"
          id="phone"
          type="number"
          error={!formState.phone && isFormSubmitted}
          onChange={handleChange}
          name="phone"
          placeholder="Phone"
          value={formState.phone}
        />
        {!formState.phone && isFormSubmitted && (
          <FormHelperText>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl required component="fieldset">
        <Typography className="label-text">Location</Typography>
        <Autocomplete
          disableClearable
          inputValue={formState.location}
          options={options}
          className={"bottom"}
          getOptionLabel={(option) => (option && option.name) || ""}
          onInputChange={(event, value) => {
            onInputChange(event, value);
          }}
          id={"location"}
          name={"location"}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search input"
              margin="normal"
              variant="outlined"
              size="small"
              name={"location"}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        {!formState.location && isFormSubmitted && (
          <FormHelperText>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl required component="fieldset">
        <Typography className="label-text">Gender</Typography>
        <Select
          id="gender-select"
          name="gender"
          variant="outlined"
          error={!formState.gender && isFormSubmitted}
          getoptionselected={formState.gender ? formState.gender : ""}
          value={formState.gender}
          displayEmpty
          onChange={handleChange}
          className={"genderSelection"}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
        {!formState.gender && isFormSubmitted && (
          <FormHelperText>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl required component="fieldset" className="save-form-control">
        <Button
          variant="contained"
          size="large"
          type="submit"
          className="save-btn"
          onClick={onSubmitHandler}
        >
          Save
        </Button>
      </FormControl>
    </form>
  );
}

export default StudentForm;

StudentForm.propTypes = {
  title: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  formState: PropTypes.object,
  setFormState: PropTypes.func,
  clickedRow: PropTypes.object,
  onSubmitHandler: PropTypes.func,
};
