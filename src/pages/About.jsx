import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../reduxPage/createSlice/CreateSlice";

import {} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import SpinnerLoading from "../component/SpinnerLoading";
const About = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const handleSubmitData = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: " ", body: " " });
    setShowPost(true);
  };


  // Show Post Data
  const showCreatePost = () => {
    return (
      <>
        {loading ? (
          <SpinnerLoading />
        ) : (
          <Card sx={{ maxWidth: 345, marginTop: "15px" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post[0].title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post[0].body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined" color="success">
                Edit
              </Button>
            </CardActions>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="p-3">
          <h1>New Data Create</h1>
          <br />
          <Box sx={{ marginTop: "15px" }}>
            <Grid container>
              <Grid item xs={12}>
                <form size="sm" className="mb-3">
                  <label htmlFor="" className="h4 mt-5">
                    Title
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-100 my-2 p-2"
                    value={title}
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
                    }
                  />
                  <label htmlFor="">Description</label>
                  <textarea
                    type="text"
                    className="w-100 mt-2 p-2"
                    value={body}
                    onChange={(e) =>
                      setValues({ ...values, body: e.target.value })
                    }
                  />
                </form>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigation("/")}
                >
                  Go Home
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  className="ms-4"
                  onClick={handleSubmitData}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
          <div className="mt-4">
            {showPost && <div>{showCreatePost()}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
