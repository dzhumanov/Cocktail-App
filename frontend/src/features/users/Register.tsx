import React, { useState } from "react";
import { RegisterMutation } from "../../types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRegisterError, selectRegisterLoading } from "./usersSlice";
import { register } from "./usersThunk";
import FileInput from "../../components/FileInput/FileInput";
import Preloader from "../../components/Preloader/Preloader";

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: "",
    password: "",
    displayName: "",
    avatar: null,
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {loading && <Preloader loading={loading} />}
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
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={state.email}
                onChange={inputChangeHandler}
                autoComplete="new-email"
                error={Boolean(getFieldError("email"))}
                helperText={getFieldError("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Display name"
                name="displayName"
                value={state.displayName}
                onChange={inputChangeHandler}
                autoComplete="new-displayName"
                error={Boolean(getFieldError("displayName"))}
                helperText={getFieldError("displayName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="new-password"
                error={Boolean(getFieldError("password"))}
                helperText={getFieldError("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput
                label="Image"
                name="image"
                onChange={fileInputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mr: "20px",
              mt: 3,
              mb: 2,
              bgcolor: "#F86060",
              color: "#fff",
              "&:hover": {
                bgcolor: "#fff",
                color: "#000",
              },
              "&:active": {
                bgcolor: "#000",
                color: "#fff",
              },
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
