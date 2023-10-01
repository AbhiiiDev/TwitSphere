import { useState } from 'react'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import HomePage from './scenes/homePage/homePage';
import LoginPage from './scenes/loginPage/loginPage';
import ProfilePage from './scenes/profilePage/profilePage';
import RegisterPage from './scenes/loginPage/RegisterPage';

function App() {


  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/loginPage' element={<LoginPage/>}/>
          <Route path='/profile/:userId' element={<ProfilePage/>}/>
          <Route path='/registerPage' element={<RegisterPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
