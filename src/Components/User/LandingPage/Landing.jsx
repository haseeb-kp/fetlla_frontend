import { styled } from "@mui/material/styles";
import { Typography, Grid, Box, Button } from "@mui/material";
import landing from "../../../assets/images/landing.jpg";
import { Container } from "@mui/system";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  color: "#463f3f",
  fontWeight: "bold",
  margin: theme.spacing(4, 0, 4, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const Home = () => {
  return (
   <>
    <Container sx={{ marginTop: '4rem'  }}>
      <Box id="home" sx={{ backgroundColor: "#ffff"}}>
        <Grid container>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Title>Developing the future, Securing the present</Title>
            <Button variant="outlined"
                color="inherit"
                sx={{ textTransform: "none" }}>Join Us</Button>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <img src={landing} style={{ maxWidth: "100%" }} />
          </Grid>
        </Grid>
      </Box>
    </Container>
   </>
  );
};

export default Home;
