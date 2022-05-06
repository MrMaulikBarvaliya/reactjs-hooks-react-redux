import React, { useState, createContext } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Message from "./pages/Message";
import About from "./pages/About";
import Setting from "./pages/Setting";
import Sidebar from "./component/sidebar/Sidebar";
import {AuthProvider} from "./pages/Auth";

// import PrivetRouter from "./pages/PrivetRouter";
// react-router-dom
import { Routes, Route } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// import { lightTheme, darkTheme } from "./Theme";

export const ThemeContext = createContext(null);
// switch Theme Color
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function App() {
  const [theme, setTheme] = useState("light");

  const ThemeToggler = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, ThemeToggler }}>
        <div id={theme}>
          <Sidebar>
            <FormGroup>
              <FormControlLabel
                onChange={ThemeToggler}
                control={<Android12Switch  />}
                label={
                  theme === "dark" ? <span>LIGHT</span> : <span>DARK</span>
                }
              />
            </FormGroup>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* <Route element={<PrivetRouter />}> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/message" element={<Message />} />
              {/* </Route> */}
              <Route path="/About" element={<About />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="*" element={<> not found</>} />
            </Routes>
          </Sidebar>
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
