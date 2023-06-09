import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import jwtDecode from 'jwt-decode';
import AllGames from './Components/AllGames/AllGames';
import GameDetails from './Components/GameDetails/GameDetails';
import Platform from './Components/Platform/Platform';
import SortBy from './Components/SortBy/SortBy';
import Category from './Components/Category/Category';

export default function App() {

  const [loggedUser, setLoggedUser] = useState(null);

  function ProtectedRoute({ children }) {
    if (!loggedUser && !localStorage.getItem('token')) {
      // console.log("halo");
      return <Navigate to='/login' replace={true} />
    } else {
      return <>{children}</>
    }
  }

  function decodeUser() {
    const loggedUser = jwtDecode(localStorage.getItem('token'));
    setLoggedUser(loggedUser);
  }

  function clearUserData() {
    localStorage.removeItem('token');
    setLoggedUser(null);
  }

  useEffect(function () {
    if (localStorage.getItem('token') && !loggedUser) {
      decodeUser();
    }
  }, [loggedUser])

  const router = createHashRouter([
    {
      path: '', element: <Layout clearUserData={clearUserData} loggedUser={loggedUser} />, children: [
        { path: '', element: <ProtectedRoute><Home /> </ProtectedRoute> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'all', element: <ProtectedRoute><AllGames /></ProtectedRoute> },
        { path: 'gamedetails/:id', element: <ProtectedRoute><GameDetails /></ProtectedRoute> },
        { path: 'games/platforms/:type', element: <ProtectedRoute><Platform /></ProtectedRoute> },
        { path: 'games/sort-by/:type', element: <ProtectedRoute><SortBy /></ProtectedRoute> },
        { path: 'games/category/:type', element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: 'login', element: <Login decodeUser={decodeUser} /> },
        { path: 'register', element: <Register decodeUser={decodeUser} /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return <>
    <RouterProvider router={router} />
  </>
}
