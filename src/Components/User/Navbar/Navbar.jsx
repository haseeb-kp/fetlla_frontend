import { AppBar, Button, Container, Link, Toolbar, Typography, Menu ,MenuItem} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import React from "react";
import { useNavigate } from 'react-router-dom';

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

const Navbar = () => {

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };


//   const [anchorElUser, setAnchorElUser] = React.useState(null);



  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <StyledLink href="#home" underline="none" sx={{ mr: "auto" }}>
            <Typography variant="h6" sx={{ ml: 2, display: { xs: "inline"}}}>
              Fetlla
            </Typography>
          </StyledLink>

          <div>
            {/* <StyledLink
              href="#home"
              sx={{ mr: 3, display: { xs: "none", md: "inline" } }}
            >
              Home
            </StyledLink>
            <StyledLink
              href="#about"
              sx={{ mr: 3, display: { xs: "none", md: "inline" } }}
            >
              About Us
            </StyledLink>
            <StyledLink
              href="#steps"
              sx={{ mr: 3, display: { xs: "none", md: "inline" } }}
            >
              Steps Involved
            </StyledLink>
            <StyledLink
              href="#contact"
              sx={{ mr: 3, display: { xs: "none", md: "inline" } }}
            >
              Contact Us
            </StyledLink> */}
            
            <Button
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={handleLoginClick}
              >
                <AccountCircle sx={{ mr: 1 }} />
                Login
              </Button>
              {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCandidateClick}>
                <Typography textAlign="center">Candidate</Typography>
              </MenuItem>
              <MenuItem onClick={handleInterviewerClick}>
                <Typography textAlign="center">Interviewer</Typography>
              </MenuItem> 
            </Menu> */}
            
              
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
