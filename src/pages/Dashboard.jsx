import React, { useState, useEffect } from "react";
import SpinnerLoad from "../component/SpinnerLoading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../reduxPage/createSlice/CreateSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import "../StylesPages/Home.css";
import { MdEmail } from "react-icons/md";

const icon1 =
  "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png";
const icon2 =
  "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg";
const icon3 = "https://icons.getbootstrap.com/assets/img/icons-hero.png";
const icon4 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAqwMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQUGBwIEA//EAD8QAAEDAgIECQoFAwUAAAAAAAEAAhEDBAUGEiExQRMWUVRhcXOx4SIyQnSBkZKTwdElJlNywgdSoRQVNkNi/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAEFBAMGAv/EADIRAQABBAAEAwUHBQEAAAAAAAABAgMEERIhMTMFFXEiQVFSgRMUIzJhYtE0QqGxwZH/2gAMAwEAAhEDEQA/ANwQCAQCAQCAQCAQCAQCAQCAQCAQCAQCAQCBKoEAgEAgaAUUIBAIBAIBAIBECoECQCAQCAQJUCgaAQCAQR+I4zZYedGvVJqfpsEu8F72sa5d/LDxu5Fu1+aUQ/OFEeZZ1CP/AE8BdUeG1e+pyz4hT7qXHHFvMj83wX68t/cnmEfKOOLeYn5vgnlv7jzGPlHHFvMT83wTy39x5jHyjji3mJ+b4J5b+48xj5RxxbzI/N8E8t/ceYR8pjOLPSsneyp4KeWz83+DzGPley0zTYVnBtXhKBO948n3heNeBdp5xzetGdaqnU8k41zXtDmODmnWCDIK45jU6l2RMTG4NAIBAIEqBAkAgaAQCghM0Yu7DbZtOgYuKuw/2jeV2YeP9rXuekOTLv8A2VOo6yojnuc4uc4lxMkk6ytyKYiNMaZmZ2UoglXQJTQJTQJTQJTQJTQNJNKnMs4y+yuWW1Z5NtVMaz5h5epcGZjRXTx09YdmJkTRVwz0le1itgIBUCBIBApVQwUAooQOVBnmba5q47WBOqmGsA9k95W9g0xFiJ+LFzat3p/RD6S7XKNJQGkqDSUBpIPbh1hUvHabpbRB1u5egLwvXoo5R1e1mzNc7notFhgVje2lVlWmWlr4a9hhwED3+1ZtzKu264mJaMYtuunUwicSyte2svtSLmmNzdTx7N/sXVaz7dfKrlP+HJcwrlPOnnCBfpMcWva5rhqLXCCF3RMTG4ccxMcpLSkKjUcLrG4w21rO859JpPXC+Zu08Fyqn9X0NqrioiXpX4fsICUQpVCQJA5QMFA5UAUVmWYz+O3va/QL6LEj8Cn0YWT3qkdK6XgQcCYBEpoOUBKCXwbBn3kXFcFtvuG9/guPIyYo9mnq6rGPNftVdFl4JrGhrGhrQIAA2BZ3Fudy0dREahJYMIpVf3/QLnv9YetrpKQXi9GfZ4cG4+G8tuwn3uW34d2PqyM7uoGdS73E03LR0sBsSdvBBfO5Ufj1erdxuzT6JJc72IlUKUCQCISoEDUU0DlRWX5kMY9fdqe4L6TDj8Cn0YWT3qnGBWdPEsVpWteoWU3AuMbXRuCZV2q1bmqnqli3FyuKZaDcYVY3NkLR9uwUmjydEQW9RWFRfu018cTza9VqiqnhmOSjY7gNzhLjUk1rUnVVA83odyLaxsui9y6VMu/j1Wufue/L2XHXAZd4g0tonWykdr+k9HevDKzeH2LfX4/B7Y+Lxe1X0Wo0wBAGobAFmRLQ18Ebi+IWmFW3D3j9EHUxg1ueeQDeva1RVcnhpeVyqKI3IyPilfFba+r16LaLW3GjTpgyQ3QadZ3nWpm2fsppj9DFu/aRM/qsq43UzjPmrMrfVmd7lt+G9n6/wyM7u/RBytFxtPyyfwCx7JfOZffr9W5j9qn0SS53sSAQJVAgSoagEDUAkqy3Mp/H7/tT3BfSYfYp9GJk96pEvLxDqb3Me0y1zTBBXvVTExqXjE6nku2VM2i9czD8Uc1l7sp1Nja/2d0b93IsTKw5t+1T0/01LGTFfs1dVtMOaWuAIO0HYVw6dZkB3WoqtZlzPbYS51rbAXN/+kD5NPped3VtXZi4td72p5Uua9fpt8usqFWqV7y5dd39Y17h3pHY0cgGwBblu1Tbp4aYZVdyqudyvf8ATcj/AG6+9Z/g1ZHivcp9P+y0fD/yVeq3SFmO9m2fT+ZW+qs73Lc8M7M+v8MjO7v0QGktJxtSywZy/YdkO9fNZffr9W5j9qn0Sa53sSqBAkAqEiAIGEU1ASkjKsyn8wX/AGx7gvpcOPwKPRi5PeqRrQ57gxjS5zjDWtEkldE6iNy8IjfRd8AyjRoUxcYmxr7lw8lm0Uvue7/Kw8rOmueG30/21LGNwxuvr/pNsrvtKnBXb5YfMrO7nfdcmoqjcOncx1e8OXnp+0HjuWrbFNKvQDaF4f8AsA1VP3ffauvGzK7HKedLmvY1N3nHKVBvrS4sbh1C7pGnUbuOwjlB3hbtu5Tcp4qZ5MuuiqidVLh/Tt0Ydfes/wAGrJ8Tj8Sn0/60MH8k+q16azNO3bOs+OnMbfVmd7lt+Gx+DPr/AAy83ufRAytHTjaplYzl6w7Id6+ay+/X6tvH7VPolFzvYlQIhIBByCqGFAwUAgakqyfM5/MOIdse4L6bD/p6PRi5PdqcYDidPCsVo3dekalJsh2iJLQR5w6ky7NV61NFM8yxci3ciqWjXeOYbZ4cL+td0zbOEscw6Rf0NG8r56ixcqr4Ijm1Zu0U08UyzbMuPXmY5pVQbfD58m3B1v6Xnf1bOvatzGwqbMbnnUzb2TNc6jlCRynm1+Hmnh2MVC6282jcuMmn0O5R07lzZWH/AHUf+Pexk/21NFa8OAIII2yFl6dzzYnh9riluaF3T0hta70mnlBX7tXa7NXFRL8XLdNyNVIrL2GVMFbeW76jajX19Om8CJbogaxy6l0ZN6L801RGuTysWptRMTPvS/CLm099s+zu+cxN9WZ3uWz4dH4X1/hmZnc+iE0loOVq2VD+XLDsvqvmcvv1+rasdqlKrnexSiFKBSqDSRHIKoJQdSopygCVBk2aDGYsQ7b6BfTYX9PR6MbJ71SLmdq6Xi+LaFFtThG02h52mEH1lB86rA8QQpMbWJ0msq5qq4G5tliDnVMOJhrol1Dq5W9G7cszLw+L26OrssZHD7NXRp1CtTr0mVqFRtSnUGkx7DIcOWVkTExyloRO43DzXLtGqeoL90xyfmXy4SNpX60m2f5wr062YJpPa8NoMaS0zBl2pbGDTMW+bPypia0VpLucrWMqf8cw+f0QvmMvv1+rasdqn0SsrnepSqFKoRKIEHMqoYKKcqAlB1Ki7ZXnei6hmS5J1CqG1G9IIjvBX0Xh9XFYiPgycunVzfxQWku7TmGkmgaSaBpJocVGh7YMKTTtY5JLLOZLnLtcUaodWw158qkNZpn+5n1G9Z2Vhxc9qnq6rN+aOU9FqzBnHC7UUn2tZt26rTD2tomY6Hch6CuKxi3KuUxp03L9EdJ2pWI5ixfFiWh/+moH0KeonrK0rWLRR7nHXfqqeWhT4MazJ3lddNOnhM7fYugSdy/SNkwWg60wizoPEOZRaHDkMa18neq47lVX6ty3HDREPYSvN+ilUIqhSiFKBSqbEobdKAQOUVWc8YI/E7NlzbNm5t5ho2vbvHXvC7sDJi1Xw1dJc2Ta443HVmZJBIIIIMEEQQvoY584ZkxMdRKqCUBKAlBy8B21SY2PmKDAZge5fnghdvqIGwBfrSHKosWTsEfil+y4rsIs6DtJxI1VHDYB7dqzs7Ji3RNFPWXVj2eOrc9GoSvn9NMSqFKIUoFKpspTSOQVUOU0GopygcqKcoIDGcrWGKvNUtNKudr2aievlXZYzLlrl7nhcsU1q9VyBXBPA3gI3aTF3R4pHvpc84k+6Xy4g3vOqfweK/XmlHwT7pUfEG951T+DxTzSj4H3SocQb3nVP4PFPNKPgfdKhxBvedU/g8U80o+B90qHEK951T+DxTzSj4H3So25Bu58q7Z7GeKk+KU/A+6VJLD8iWtF4feVXV49HYFz3fEq6o1TyetGJEc5W2hRp29JtKixrGNEANELNmZqncuqIiOUO5UUpVAiFKugpRClUcSqOgVAwUDlQMFASoHKKJRdnKhsShsShsShsShspQ2JVNlKaQSqhSgUqhEoFKoUojmVUOUU5UDBQMOUUSgcoCVNBymgSgJQEoCU0FKaBpICVQpTQUqoUoFKoUohSg//2Q==";
const Logo =
  "https://images.pexels.com/photos/1191109/pexels-photo-1191109.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Dashboard = () => {
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [textBody, setTextBody] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);

  const handleFetchData = (e) => {
    e.preventDefault();
    // console.log(id);
    if (!id) {
      alert("Please Enter Id");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };
  // Delete Data Redux
  const handleDeleteData = () => {
    alert("Delete Data Conform");
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
  };

  const handleSubscribe = (e) => {
    // e.preventDefault();
    setEmail("Hello,How are you.");
    alert(email);
  };
  const icons = [
    { id: 1, img: icon1, alt: "imgIcon" },
    { id: 2, img: icon2, alt: "imgIcon" },
    { id: 3, img: icon3, alt: "imgIcon" },
    { id: 4, img: icon4, alt: "imgIcon" },
    { id: 5, img: icon1, alt: "imgIcon" },
  ];
  return (
    <>
      <Box component="div" className="TopHeader">
        <Grid container spacing={2} className="mainMenu">
          <Grid item xs={12} sm={6} md={6} lg={6} className="subMain">
            <Box component="div" className="topContent">
              <Typography variant="h4" className="top_title">
                Portfolio
              </Typography>
              <Typography variant="h6" className="top_title">
                Hi,I am FullStack Developer
              </Typography>
              <Typography variant="subtitle2" className="top_description">
                Lorem ipsum dolor, sit amen consenter adipisicing elite. Dolor
                ulema, beaten, quod militia preferences quadrat laborer
                molesting, corrupti aperiam ea inventore fuga. Iusto, eos
                tenetur rationed nostrum odio quia accusantium impedit. Modi
                neque adipisci praesentium.
              </Typography>
              <Box component="form" id="TopSubscribe">
                <TextField
                  className="EmailFilled"
                  variant="filled"
                  type="email"
                  label="Email"
                  placeholder="Enter Emailaddress..."
                  value={email}
                />
                <Button
                  variant="contained"
                  id="EmailBtn"
                  onClick={(e) => handleSubscribe()}
                >
                  <MdEmail />
                </Button>
              </Box>
            </Box>
          </Grid>
          {/* Right Side Div */}
          <Grid item xs={12} sm={6} md={6} lg={6} id="rightDiv">
            <Box component="div" className="ImgDiv">
              <Box component="div" id="mainImg">
                <img src={Logo} alt="Logo" />
              </Box>
              <Box component="div" className="sunImgDiv1"></Box>
              <Box component="div" className="sunImgDiv2"></Box>
            </Box>
          </Grid>
        </Grid>
        {/* second Section Div */}
        <Typography
          variant="h4"
          sx={{ textAlign: "center", margin: "10px auto", color: "#333eee" }}
        >
          All ICONS_IMAGE
        </Typography>
        <Box id="section2">
          <Grid container spacing={2}>
            <Grid item xs={12} className="logoDiv">
              <Box id="mainIconDiv">
                {icons.map((item) => {
                  return (
                    <Box className="IconLogo" key={item.id}>
                      <img src={item.img} alt={item.alt} />
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: "15px" }}>
          <Grid container>
            <Grid item xs={12}>
              <h1 className="mt-5 text-success text-center"> ⚛️ reduxjs/toolkit & createAsyncThunk ⚛️</h1>
              <form size="sm" className="mb-3">
                <label htmlFor="" className="h4 mt-5">
                  Search Id :{" "}
                </label>
                <br />
                <input
                  type="number"
                  className="w-50 p-2"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </form>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFetchData}
              >
                Add Data
              </Button>
              <Button
                variant="contained"
                color="warning"
                className="ms-4"
                onClick={() => navigation("/about")}
              >
                Create Data
              </Button>
            </Grid>
          </Grid>
        </Box>

        <div className="container">
          {loading ? (
            <SpinnerLoad />
          ) : (
            <>
              {post.length > 0 && (
                <>
                  <Card sx={{ maxWidth: 345, marginTop: "15px" }}>
                    <CardContent>
                      {/* <Typography gutterBottom variant="h6" component="div">
                        ID : {post[0].userId}
                      </Typography> */}
                      <Typography gutterBottom variant="h5" component="div">
                        {post[0].title}
                      </Typography>
                      {edit ? (
                        <>
                          <textarea
                            type="text"
                            className="w-100 mt-2 p-2"
                            value={textBody}
                            onChange={(e) => setTextBody(e.target.value)}
                          />
                          <CardActions>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => {
                                dispatch(
                                  updatePost({
                                    id: post[0].id,
                                    title: post[0].title,
                                    body: textBody,
                                  })
                                );
                                dispatch(setEdit({ edit: false, body: "" }));
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="warning"
                              onClick={() =>
                                dispatch(setEdit({ edit: false, body: "" }))
                              }
                            >
                              cancle
                            </Button>
                          </CardActions>
                        </>
                      ) : (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {post[0].body}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                    {!edit && (
                      <CardActions>
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="warning"
                          onClick={handleDeleteData}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer Section */}
        <Box sx={{ background: "#333", color: "#fff", marginTop: "20%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h4"
                sx={{ marginTop: "15px", textAlign: "center" }}
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
      </Box>
    </>
  );
};

export default Dashboard;
