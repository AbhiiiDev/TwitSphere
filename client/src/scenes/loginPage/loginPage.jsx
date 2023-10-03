import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import FlexBetween from '../../components/FlexBetween';

import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,

} from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";


const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});





export default function loginPage() {
  const { palette } = useTheme();
  const dispatch=useDispatch();
const navigate=useNavigate();
const isNonMobile = useMediaQuery("(min-width:600px)");

  const loginInitial = {
    email: "",
    password: "",
  };

  const login=async(values,onSubmitProps)=>
  {
const loginResponse=await fetch("http://localhost:3001/auth/loginUser",
{
  method:"POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
})
const loggedIn=await loginResponse.json();
console.log(loggedIn);
if(loggedIn)
{
  navigate("/home");
  dispatch(setLogin({
    user:loggedIn.user,
    token:loggedIn.token
  }))

}

  }



  const handleFormSubmit =async (values, onSubmitProps) => {
console.log('login ho rha hai bhai')
await login(values,onSubmitProps);
  };

  return (
    <div className="container m-3">
      <h2>Welcome to TwitSphere !!</h2>
      <Formik 
      onSubmit={handleFormSubmit} 
      initialValues={loginInitial}
      validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>

<Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
</Box>
<Box>


            <Button
              fullWidth
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              type="submit"
            >
              Log In
            </Button>
            <Typography
              onClick={() => {
                resetForm();
              }}
            >
              Don't have an Account ? <Link to="/registerPage">Sign Up here.</Link>
            </Typography>
</Box>
          </form>
        )}
      </Formik>
    </div>
  );
}
