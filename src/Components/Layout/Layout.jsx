import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({ clearUserData, loggedUser }) {
  return <>
    <Navbar loggedUser={loggedUser} clearUserData={clearUserData} />
    <Outlet />
  </>
}
