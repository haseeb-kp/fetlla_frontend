import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { StyledRoot, Main } from "./Styles";
import Header from "../../Components/DashboardLayout/Header";
import Nav from "../../Components/DashboardLayout/Nav";
import AdminLogin from "../../Pages/Admin/AdminLogin";

import UserList from "../../Pages/Admin/UserList";
import AdminDashboard from "../../Pages/Admin/AdminDashboard";
import UserDetails from "../../Pages/Admin/UserDetails";
import AssignCourse from "../../Pages/Admin/AssignCourse";

const Admin = () => {
  const user = useSelector((state) => (state.user));
  const isSuperuser = user && user.user.is_superuser;
  const mode = useSelector((state) => state.mode);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const Layout = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <StyledRoot>
            <Header onOpenNav={() => setOpen(true)} />

            <Nav openNav={open} onCloseNav={() => setOpen(false)} />

            <Main>
              <Outlet />
            </Main>
          </StyledRoot>
        </ThemeProvider>
      </>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!isSuperuser) {
      return <Navigate to="/admin/login" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={isSuperuser ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user_details/:id" element={<UserDetails />} />
        <Route path="/assign_courses" element={<AssignCourse />} />
      </Route>
    </Routes>
  );
};

export default Admin;
