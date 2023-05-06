import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { StyledRoot, Main } from "./Styles";
import Header from "../../Components/DashboardLayout/Header";
import Nav from "../../Components/DashboardLayout/Nav";
import Login from "../../Pages/User/Login/Login";
import HomePage from "../../Pages/User/Home/HomePage";
import UserCourses from "../../Pages/User/Courses/UserCourses";

const User = () => {
  const currentUser = useSelector((state) => Boolean(state.token));
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
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard/courses" element={<UserCourses />} />
        {/* <Route path="/profile/:id" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
};

export default User;
