import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Button, Paper, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const StyledForm = styled(Form)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid phone number"
    )
    .required("Required"),
  domain: Yup.string().required("Required"),
});

const AddMember = () => {
  const token = useSelector((state) => state.token);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <>
      <ToastContainer />
      <Paper variant="outlined" sx={{ textAlign: "center", padding: "1rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "3rem" }}>
          Add Member
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            domain: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            values.is_admin = isAdmin;
            try {
              const response = await axios.post(
                "admin/add_user/",
                
                {
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  domain: values.domain,
                  is_admin: values.is_admin,
                },
                {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  },
              );

              if (response.status === 201) {
                toast.success("Success");
              } else {
                toast.error("Error");
              }
            } catch (error) {
              toast.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <StyledForm>
              <Field
                name="name"
                as={TextField}
                label="Name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                name="email"
                as={TextField}
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                name="phone"
                as={TextField}
                label="phone"
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <Field name="domain">
                {({ field, form }) => (
                  <FormControl style={{ width: 250 }}>
                    <InputLabel id="domain-label">Domain</InputLabel>
                    <Select
                      labelId="domain-label"
                      id="domain"
                      {...field}
                      error={form.touched.domain && Boolean(form.errors.domain)}
                    >
                      <MenuItem value="dev">Development</MenuItem>
                      <MenuItem value="sec">Security</MenuItem>
                    </Select>
                    {form.touched.domain && form.errors.domain && (
                      <FormHelperText error>
                        {form.errors.domain}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
              {/* <FormControl style={{ width: 250 }}>
                <InputLabel id="admin-label">Admin privilege</InputLabel>
                <Select
                  labelId="admin-label"
                  id="admin"
                  value={values.admin}
                  onChange={handleChange}
                  error={touched.admin && Boolean(errors.admin)}
                >
                  <MenuItem value="False">No</MenuItem>
                  <MenuItem value="True">Yes</MenuItem>
                </Select>
                {touched.admin && errors.admin && (
                  <FormHelperText error>{errors.admin}</FormHelperText>
                )}
              </FormControl> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={handleAdminChange}
                    name="isAdmin"
                    color="primary"
                  />
                }
                label="Admin Privileges"
              />

              <Button
                type="submit"
                variant="outlined"
                sx={{ marginTop: "0.8rem" }}
              >
                Add
              </Button>
            </StyledForm>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default AddMember;
