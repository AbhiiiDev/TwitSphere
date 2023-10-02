import { useState } from 'react'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import HomePage from './scenes/homePage/homePage';
import LoginPage from './scenes/loginPage/loginPage';
import ProfilePage from './scenes/profilePage/profilePage';
import RegisterPage from './scenes/loginPage/RegisterPage';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <Router>
      <ThemeProvider theme={theme}>
          <CssBaseline />
        <Routes>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/loginPage' element={<LoginPage/>}/>
          <Route path='/profile/:userId' element={<ProfilePage/>}/>
          <Route path='/registerPage' element={<RegisterPage/>}/>
        </Routes>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
