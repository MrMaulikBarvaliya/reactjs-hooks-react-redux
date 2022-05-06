import React, { useState, useEffect, useRef } from "react";
import "../StylesPages/Contact.css";
import { Box, Grid, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const IMG =
  "https://cdn.pixabay.com/photo/2019/04/14/11/04/contact-us-4126530__340.jpg";

const icon1 =
  "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png";

// GetData localstorage
const getDataForm = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const Contact = () => {
  // input filed
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [contact, setContact] = useState(" ");
  // all filed in store
  const [books, setBooks] = useState(getDataForm());
  // form Submit Data
  const handleBookS = (e) => {
    e.preventDefault();
    let book = {
      id: new Date().getTime(),
      name,
      email,
      password,
      contact,
    };
    setBooks([...books, book]);
    setName(" ");
    setEmail(" ");
    setPassword(" ");
    setContact(" ");
  };
  const inputRef = useRef();
  // save data localstorage
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    inputRef.current.focus();
    // inputRef.current.blur();
  }, [books]);

  return (
    <>
      <Container>
        <Box id="contactPage">
          <Grid container spacing={2} className="mainDiv">
            <Grid item xs={12} sm={12} md={6} className="subDiv1">
              <Typography variant="h4" className="TitleContact">
                Contact Page
              </Typography>
              <Box component="div" className="imgDiv">
                <img src={IMG} alt="img" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="subDiv2">
              <Typography variant="h4" className="TitleContact">
                Your Details
              </Typography>
              <div className="form-container FormDiv">
                <form
                  action="Contact.js"
                  className="form-group inputDiv"
                  onSubmit={handleBookS}
                >
                  <label htmlFor="">Name</label>
                  <br />
                  <input
                    type="text"
                    className="form-control inputBox"
                    ref={inputRef}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <br />
                  <label htmlFor="">Email</label>
                  <br />
                  <input
                    type="email"
                    className="form-control inputBox"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <br />
                  <label htmlFor="">Password</label>
                  <br />
                  <input
                    type="password"
                    className="form-control inputBox"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <br />
                  <label htmlFor="">Contact</label>
                  <br />
                  <input
                    type="text"
                    className="form-control inputBox"
                    required
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <br />
                  <br />
                  <button type="submit" className=" BtnButton">
                    Submit
                  </button>
                  <br />
                  <br />
                  <label>
                    <Link to="/setting">Login</Link>
                  </label>
                </form>
              </div>
            </Grid>
          </Grid>
        </Box>
        {/* Footer Section */}
        <Box sx={{ background: "#333", color: "#fff", marginTop: "12%" }}>
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
      </Container>
    </>
  );
};

export default Contact;
