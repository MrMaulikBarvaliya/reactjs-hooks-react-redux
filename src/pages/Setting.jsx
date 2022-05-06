import React, { useRef, useState, useEffect } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import "../StylesPages/Setting.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

// const getLoginData = () => {
//   const formDataLogin = localStorage.getItem("loginForm");
//   if (formDataLogin) return JSON.parse(formDataLogin);
//   else return [];
// };

const Setting = () => {
  const [loginData, setLoginData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();
  const LoginDataUser = (e) => {
    e.preventDefault();
    let loginStore = {
      email,
      password,
    };
    setLoginData([...loginData, loginStore]);
    setEmail(" ");
    setPassword(" ");
    
    auth.login(loginData);
    navigate("/");
  };

  useEffect(() => {
    // localStorage.setItem("loginForm", JSON.stringify(loginData));
    inputRef.current?.focus();
  }, [loginData]);

  return (
    <>
      <Container className="sectionSetting">
        <Box className="loginDiv" component="div">
          <Typography variant="h4" className="loginTitle">
            Login /{" "}
            <Link to="/contact" className="linkCSS">
              Register
            </Link>
          </Typography>
        </Box>
        <Box className="LoginForm">
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3" align="center" color="primary">
                Login
              </Typography>
              <div className="form-container FormDiv">
                <form
                  action="Contact.js"
                  className="form-group inputDiv"
                  onSubmit={LoginDataUser}
                >
                  <label htmlFor="">Email</label>
                  <br />
                  <input
                    ref={inputRef}
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
                  <button type="submit" className=" BtnButton">
                    Submit
                  </button>
                  <br />
                  <br />
                  <label>
                    <Link to="/contact">Register</Link>
                  </label>
                </form>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Setting;
