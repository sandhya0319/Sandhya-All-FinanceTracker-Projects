import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { Cookies } from 'react-cookie';

export const ProtectedRoutes = () => {
 const cookie=new Cookies();
 const auth=cookie.get("auth-token");
  return auth?<Outlet />:<Navigate to={"/login"} />;

};
export const UnprotectedRoutes = () => {
  const cookie=new Cookies;
 const auth=cookie.get("auth-token");
  return auth?<Navigate to="/viewdata" />:<Outlet />
 }


