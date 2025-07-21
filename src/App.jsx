import React,{useState, useEffect} from 'react'
import authservice from './appwrite/auth';
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
 const [loading, setLoading] = useState(true);
 const dispatch = useDispatch();   //send actions to the Redux store to update the state.
 
 useEffect (() =>{
  authService.getCurrentUser()
  .then((userData) => {
    if (userData){
      dispatch(login ({userData}))
    }else{
      dispatch(logout())
    }
  })
  .catch((error) =>{
    console.log("Error fetching user data:",error);
    dispatch(logout());
  })
  .finally(() => setLoading (false))
 }, [])
 
return !loading ? (
 <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>
   <Header/>
   Hello Class
   <main>
   TODO: {/* <Outlet/> */}
   </main>
   <Footer/>
  </div>
 </div>

) : null
}

export default App
