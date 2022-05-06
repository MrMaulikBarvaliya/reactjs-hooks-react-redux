import React from "react";
import { Box, Typography, Grid, } from "@mui/material";

const icon1 =
  "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png";

const Footer = () => {
  return (
    <div>
      {/* Third Section */}
      <Box sx={{ background: "#333", color: "#fff" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="h4"
              sx={{ marginTop: "25px", textAlign: "center" }}
            >
              Footer
            </Typography>
            <Box
              component="div"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                margin: "15px auto",
              }}
            >
              <img src={icon1} alt="logo" width="100px" />
              <Typography variant="h6">Home</Typography>
              <Typography variant="h6">Contact</Typography>
              <Typography variant="h6">Message</Typography>
              <Typography variant="h6">About</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Footer;
