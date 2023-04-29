import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DomainIcon from '@mui/icons-material/Domain';
import { Paper, Grid, Button } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const UserProfile = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& > *": {
    marginRight: "10px",
  },
});

const ProfileAvatar = styled(Avatar)({
  width: "70px",
  height: "70px",
});

const UserDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const UserDetailsItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "5px",
});

const UserIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginRight: "10px",
});

const UserName = styled(Typography)({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "24px",
});

const UserEmail = styled(Typography)({
  fontSize: "14px",
  lineHeight: "20px",
});

const UserPhone = styled(Typography)({
  fontSize: "14px",
  lineHeight: "20px",
});

function UserDetailComponent({ user }) {
  return (
    <Paper variant="outlined" sx={{ textAlign: "center", padding: "1rem" }}>
      <Grid container>
        <Grid item xs={12} sm={8} md={10}>
          <UserProfile>
            <UserDetails>
              <UserDetailsItem>
                <UserIcon>
                  <PersonIcon />
                </UserIcon>
                <UserName>{user.name}</UserName>
              </UserDetailsItem>
              <UserDetailsItem>
                <UserIcon>
                  <EmailIcon />
                </UserIcon>
                <UserEmail>{user.email}</UserEmail>
              </UserDetailsItem>
              <UserDetailsItem>
                <UserIcon>
                  <PhoneIcon />
                </UserIcon>
                <UserPhone>{user.phone_number}</UserPhone>
              </UserDetailsItem>
              <UserDetailsItem>
                <UserIcon>
                  <DomainIcon />
                </UserIcon>
                <UserPhone>{user.domain ? user.domain : "Not Assigned"}</UserPhone>
              </UserDetailsItem>
            </UserDetails>
          </UserProfile>
        </Grid>
        <Grid item xs={12} sm={4} md={2} sx={{ textAlign: "left" }}>
          <ProfileAvatar alt={user.name} src={user.avatar} />
          <Button size="small" variant="outlined" sx={{marginTop:"2rem"}}>
          <EditOutlinedIcon /> Edit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default UserDetailComponent;
