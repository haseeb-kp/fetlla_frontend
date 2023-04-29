import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { Autocomplete, Button, Paper, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";



const StyledForm = styled(Form)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "2rem",
});

const validationSchema = Yup.object().shape({
  courseName: Yup.string().required("Required"),
  expiresOn: Yup.date().required("Required"),
  user: Yup.object().required("Required"),
});

const userOptions = [
  { label: "Alice", value: "alice" },
  { label: "Bob", value: "bob" },
  { label: "Charlie", value: "charlie" },
];

const AssignCourse = () => {
  return (
    <Paper variant="outlined" sx={{ textAlign: "center", padding: "1rem" }}>
      <Typography variant="h6" sx={{ marginBottom: "3rem" }}>
        Assign Course
      </Typography>
      <Formik
        initialValues={{
          courseName: "",
          expiresOn: null,
          user: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <StyledForm>
            <Field
              name="user"
              options={userOptions}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User"
                  error={touched.user && Boolean(errors.user)}
                  helperText={touched.user && errors.user}
                />
              )}
              as={Autocomplete}
              onChange={(event, value) => setFieldValue("user", value)}
            />
            <Field
              name="courseName"
              as={TextField}
              label="Course Name"
              error={touched.courseName && Boolean(errors.courseName)}
              helperText={touched.courseName && errors.courseName}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Field
                name="expiresOn"
                as={DatePicker}
                label="Expires On"
                value={values.expiresOn}
                onChange={(date) => setFieldValue("expiresOn", date)}
                error={touched.expiresOn && Boolean(errors.expiresOn)}
                helperText={touched.expiresOn && errors.expiresOn}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Button type="submit" size="small" variant="outlined" sx={{marginTop:'0.8rem'}}> 
              Add
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Paper>
  );
};

export default AssignCourse;
