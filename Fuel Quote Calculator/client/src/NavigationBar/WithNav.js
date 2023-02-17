import React from 'react';
import { Navbar } from "./Navbar";
import { Outlet } from 'react-router-dom';

export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};