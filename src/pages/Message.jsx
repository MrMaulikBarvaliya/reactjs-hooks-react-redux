import React, { useState, useEffect, useMemo } from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import "../StylesPages/Contact.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// get local storage
const getDataForm = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const Message = () => {
  // useMemo
  const [count, setCount] = useState(0);
  const [item, setItem] = useState(2);

  const MultipleCountUseMemo = useMemo(
    function MultipleCount() {
      return count * 10;
      // console.warn("UseMemo");
    },
    [count]
  );

  // all filed in store
  const [books, setBooks] = useState(getDataForm());
  useEffect(() => {
    setBooks(books);
  }, [books]);

  const deleteData = (id) => {
    console.log("index :>> ", id);

    const info = books.filter((item) => {
      return item.id !== id;
    });
    setBooks(info);
    localStorage.setItem("books", info);
  };
  const removeDataAll = () => {
    const newData = localStorage.clear("info");
    setBooks(newData);
  };

  return (
    <>
      <Box textAlign="center" width="95%">
        <Typography variant="h4">Message</Typography>
        <Grid container className="messageDiv">
          <Grid item xs={12} sm={12}>
            <table cellSpacing="20px">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {books.map((item, i) => {
                  return (
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>
                        <Button
                          type="submit"
                          sx={{ marginTop: "10px", background: "red" }}
                          variant="contained"
                          onClick={() => deleteData(item.id)}
                        >
                          <DeleteRoundedIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {/* <td>
                          {books.length > 1 && <div>No Books Recode Added</div>}
                        </td> */}
                <tr>
                  <td colSpan="5">
                    <Button
                      sx={{ marginTop: "10px", width: "75%" }}
                      width="100%"
                      variant="text"
                      color="success"
                      onClick={() => removeDataAll()}
                    >
                      RemoveAll
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <Box
              sx={{
                maxWidth: "100%",
                maxHeight: "40vh",
                textAlign: "center",
                margin: "20px auto",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{
                      letterSpacing: "2px",
                      background: "rgba(0,0,0,0.05)",
                    }}
                  >
                    USE MEMO
                  </Typography>
                  <Typography variant="h5">Count : {count}</Typography>
                  <Typography variant="h5">Multiple : {item}</Typography>
                  <Divider />
                  <Typography variant="h5">
                    With UseMemo: {MultipleCountUseMemo}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="m-3"
                    onClick={() => setCount(count + 1)}
                  >
                    Count Number
                  </Button>
                  <Button variant="contained" onClick={() => setItem(item * 5)}>
                    Item Multiple
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Message;
