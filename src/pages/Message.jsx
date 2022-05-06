import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import "../StylesPages/Contact.css";
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
    localStorage.setItem('books',info);
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
                        <button
                          type="submit"
                          onClick={() => deleteData(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* <td>
                          {books.length > 1 && <div>No Books Recode Added</div>}
                        </td> */}
                <tr>
                  <td colSpan="5">
                    <button
                      width="100%"
                      className=" BtnButton"
                      onClick={() => removeDataAll()}
                    >
                      RemoveAll
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Message;
