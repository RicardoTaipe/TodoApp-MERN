import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { validEmailRegex } from "../../utils/validators";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    validateFields(name, value);
    setUserInfo((userInfo) => {
      return { ...userInfo, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/signup`,
          userInfo
        );
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.response.data.error.message);
      }
    }
  };

  const validateForm = () => {
    let valid = false;
    Object.entries(userInfo).forEach(([key, value]) => {
      validateFields(key, value);
    });
    //test there no errors -> convert objet to array and evalute
    valid = Object.values(errors).every((error) => {
      return error === "";
    });
    return valid;
  };

  const validateFields = (name, value) => {
    let errorLabel = "";
    switch (name) {
      case "name":
        errorLabel = value === "" ? "Required" : "";
        break;
      case "username":
        errorLabel = value === "" ? "Required" : "";
        break;
      case "email":
        errorLabel =
          value === ""
            ? "Required"
            : validEmailRegex.test(value)
            ? ""
            : "Email is not valid";
        break;
      case "password":
        errorLabel =
          value === ""
            ? "Required"
            : value.length < 4
            ? "Password must be 4 characters long!"
            : "";
        break;
      case "confirmPassword":
        errorLabel =
          value === ""
            ? "Required"
            : value === userInfo.password
            ? ""
            : "Passwords must match";
        break;
      default:
        break;
    }
    setErrors((errors) => {
      return { ...errors, [name]: errorLabel };
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessage && (
          <Alert
            sx={{ m: 1 }}
            severity="error"
            onClose={() => {
              setErrorMessage("");
            }}
          >
            {errorMessage}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                error={errors.name ? true : false}
                helperText={errors.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                error={errors.username ? true : false}
                helperText={errors.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors.email ? true : false}
                helperText={errors.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                error={errors.password ? true : false}
                helperText={errors.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
            {loading && <CircularProgress size={30} />}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
