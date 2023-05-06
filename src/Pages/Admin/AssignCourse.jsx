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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../utils/axios'
import { allUsers } from "../../utils/Constants";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





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



const AssignCourse = () => {
  const token = useSelector((state) => state.token);
  const [userList, setUserList] = useState([]);
  const getUserList = async () => {
    try {
      const response = await axios.get(allUsers, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.data && Array.isArray(response.data)) {
        setUserList(response.data);
      } else {
        console.log("Invalid response:", response);
      }
    } catch (error) {
      toast.error(error)
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const userOptions = userList.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  return (
      <>
      <ToastContainer />
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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post("admin/add_course/", {
              course_name: values.courseName,
              expires_on: values.expiresOn,
              user: values.user.value,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },);
      
            if (response.status === 201) {
              toast.success("Success");
            } else {
              toast.error("Error");
            }
          } catch (error) {
            console.log("Error:", error);
            // toast.error("Error");
          } finally {
            setSubmitting(false);
          }
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
                  style={{ width: 250 }}
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
                format="dd-MM-yyyy"
              />
            </LocalizationProvider>

            <Button type="submit" size="small" variant="outlined" sx={{marginTop:'0.8rem'}}> 
              Add
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Paper>
    </>
  );
};

export default AssignCourse;
