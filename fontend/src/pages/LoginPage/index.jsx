import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "./../RegisterPage/CustomIcon.jsx";
import Toaster from "../../components/Toaster";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useDispatch } from "react-redux";
import { updateUser } from "../../stateManagement/slice/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? `http://localhost:8080`;

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [disable, setDisable] = useState(false);
    const [toaster, setToaster] = useState({
        open: false,
        message: "",
        title: "",
        type: "info",
    });

    // const [open, setOpen] = useState(false);
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(await validateInputs())) {
            return;
        }
        const data = new FormData(document.getElementById("login-form"));
        const payload = {
            email: data.get("email"),
            password: data.get("password"),
        };
        // Call api using axios
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, payload);
            console.log(response.data);
            console.log(response.status);
            if (response.status === 200) {
                setToaster({
                    ...toaster,
                    open: true,
                    message: "Login successfully. Redirecting to homepage in 2 seconds...",
                    type: "success",
                });
                setTimeout(() => {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    dispatch(updateUser(response.data));
                    navigate("/");
                }, 2000);
            } else {
                setToaster({
                    ...toaster,
                    open: true,
                    message: response.data.message || "Login failed",
                    type: "error",
                });
                setTimeout(() => {
                    setToaster({
                        ...toaster,
                        open: false,
                        message: "",
                        type: "info",
                    });
                }, 2000);
            }
        } catch (error) {
            setToaster({
                ...toaster,
                open: true,
                message: error.response.data.message || "Login failed! Please try again.",
                type: "error",
            });
            setTimeout(() => {
                setToaster({
                    ...toaster,
                    open: false,
                    message: "",
                    type: "info",
                });
            }, 2000);
            setDisable(false);
        }
    };
    const handleShowPassword = () => {
        setHidePassword(!hidePassword);
    };

    const validateInputs = () => {
        setDisable(true);
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage("Please enter a valid email address.");
            setDisable(false);
            return false;
        } else {
            setEmailError(false);
            setEmailErrorMessage("");
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage("Password must be at least 6 characters long.");
            setDisable(false);
            return false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
        return true;
    };

    useEffect(() => {
        const cause = sessionStorage.getItem("unauthenticated") || sessionStorage.getItem("accessDenied") || "";
        if (cause) {
            setToaster({
                ...toaster,
                open: true,
                message: cause,
                type: "error",
            });
            setTimeout(() => {
                setToaster({
                    ...toaster,
                    open: false,
                    message: "",
                    type: "info",
                });
            }, 2000);
            sessionStorage.removeItem("unauthenticated");
            sessionStorage.removeItem("accessDenied");
        }
    }, []);

    return (
        <>
            {toaster.open && <Toaster openStatus={toaster.open} message={toaster.message} type={toaster.type} />}
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", textAlign: "center" }}
                    >
                        Login
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        id="login-form"
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter email."
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? "error" : "primary"}
                                sx={{ ariaLabel: "email" }}
                            />
                        </FormControl>
                        <FormControl>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                {/* <Link
                                    component="button"
                                    type="button"
                                    onClick={handleClickOpen}
                                    variant="body2"
                                    sx={{ alignSelf: "baseline" }}
                                >
                                    Forgot your password?
                                </Link> */}
                            </Box>
                            <div className="flex items-center">
                                <TextField
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    name="password"
                                    placeholder="Enter password. Ex: mypassword123"
                                    type={hidePassword ? "password" : "text"}
                                    id="password"
                                    autoComplete="current-password"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={passwordError ? "error" : "primary"}
                                />
                                <span className="cursor-pointer -ml-[10%] z-50" onClick={handleShowPassword}>
                                    <VisibilityIcon />
                                </span>
                            </div>
                        </FormControl>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
                        <Button type="submit" fullWidth variant="contained" disabled={disable}>
                            <span className="pr-2">Login</span>
                            {disable && (
                                <span className="animate-spin">
                                    <AcUnitIcon />
                                </span>
                            )}
                        </Button>
                        <Typography sx={{ textAlign: "center" }}>
                            Don&apos;t have an account?{" "}
                            <Link to="/register" variant="body2" sx={{ alignSelf: "center" }}>
                                <span className="hover:text-indigo-500">Register</span>
                            </Link>
                        </Typography>
                    </Box>
                    <Divider>or</Divider>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <a href="#">
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 2,
                                    border: "1px solid #e0e0e0",
                                    padding: "0.5rem 1rem",
                                    borderRadius: ".5rem",
                                }}
                            >
                                <GoogleIcon />
                                <span>Google</span>
                            </Box>
                        </a>
                        <a href="#">
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 2,
                                    border: "1px solid #e0e0e0",
                                    padding: "0.5rem 1rem",
                                    borderRadius: ".5rem",
                                }}
                            >
                                <FacebookIcon />
                                <span>Github</span>
                            </Box>
                        </a>
                    </Box>
                </Card>
            </SignInContainer>
        </>
    );
}

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));
