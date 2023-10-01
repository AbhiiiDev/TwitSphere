import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import  {Formik}  from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Typography,

} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

export default function RegisterPage() {
  const navigate = useNavigate();

  const registerInitial = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };

  const register = async (values,onSubmitProps) => {
    const formData=new FormData();

    for(let value in values)
    {
      formData.append(value,values[value]);
    }
    formData.append("picturePath",values.picture.name);

    try {
      const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();
      console.log(savedUser);

      if (savedUser) {
        navigate("/loginPage");
      }
    } catch (error) {
      console.error("An error occured :", error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
   
    await register(values, onSubmitProps);
  };

  return (
   
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={registerInitial}
       validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
              <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Location"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.location}
              name="location"
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Occupation"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.occupation}
              name="occupation"
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              sx={{ gridColumn: "span 4" }}
            />
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={async(acceptedFiles) => {
               await setFieldValue("picture", acceptedFiles[0]);
                await console.log(values.picture);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!values.picture ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <div>
                      <Typography>{values.picture.name}</Typography>
                      <EditOutlinedIcon />
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            <Button
              fullWidth
              sx={{
                m: "2rem 0",
                p: "1rem",
              }}
              type="submit"
              >
                Sign Up
                </Button>
                <Typography
              onClick={() => {
                resetForm();
              }}>
                 Already have an account ? <Link to='/loginPage'>Login here.</Link>
              </Typography>

          </form>
        )}
      </Formik>

  );
}
