import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "./CustomIcon";
import Toaster from "../../components/Toaster";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? `http://localhost:8080`;

export default function RegisterPage(props) {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [disable, setDisable] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [toaster, setToaster] = useState({
        open: false,
        message: "",
        title: "",
        type: "info",
    });

    const validateInputs = async () => {
        setDisable(true);
        const email = document.getElementById("email");
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage("Please enter a valid email address.");
            setDisable(false);
            return false;
        } else {
            try {
                const response = await axios.get(`${BASE_URL}/user/get-email?email=${email.value}`);
                console.log(response);
                setEmailError(true);
                setEmailErrorMessage("Email already exists.");
                setDisable(false);
                return false;
            } catch (error) {
                setEmailError(false);
                setEmailErrorMessage("");
            }
        }

        if (!username.value || !/^[A-Za-z][A-Za-z0-9_]*$/.test(username.value) || username.value.length < 6) {
            setUsernameError(true);
            setUsernameErrorMessage(
                "User name must be at least 6 characters long and first letter must be not a number."
            );
            setDisable(false);
            return false;
        } else {
            try {
                const response = await axios.get(`${BASE_URL}/user/get-username?username=${username.value}`);
                setUsernameError(true);
                setUsernameErrorMessage("Username already exists.");
                setDisable(false);
                return false;
            } catch (error) {
                setUsernameError(false);
                setUsernameErrorMessage("");
            }
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(await validateInputs())) {
            return;
        }
        const data = new FormData(document.getElementById("register-form"));
        const payload = {
            email: data.get("email"),
            username: data.get("username"),
            password: data.get("password"),
        };
        const response = await axios.post(`${BASE_URL}/user/register`, payload);
        if (response.status === 201) {
            setToaster({
                ...toaster,
                open: true,
                message: "Register successfully. Redirecting...",
                type: "success",
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            setToaster({
                ...toaster,
                open: true,
                message: response.data.message || "Something went wrong. Please try again.",
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

    return (
        <>
            {toaster.open && <Toaster message={toaster.message} openStatus={toaster.open} type={toaster.type} />}
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", textAlign: "center" }}
                    >
                        Register
                    </Typography>
                    <Box
                        component="form"
                        id="register-form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={emailError ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                placeholder="Enter username. At least 6 characters long."
                                name="username"
                                variant="outlined"
                                error={usernameError}
                                helperText={usernameErrorMessage}
                                color={usernameError ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <div className="flex items-center">
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="Enter password. Ex: mypassword123"
                                    type={hidePassword ? "password" : "text"}
                                    id="password"
                                    autoComplete="new-password"
                                    variant="outlined"
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    color={passwordError ? "error" : "primary"}
                                />
                                <span className="cursor-pointer -ml-[10%] z-50" onClick={handleShowPassword}>
                                    <VisibilityIcon />
                                </span>
                            </div>
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" disabled={disable}>
                            <span>Sign up</span>
                            {disable && (
                                <span className="animate-spin">
                                    <AcUnitIcon />
                                </span>
                            )}
                        </Button>
                        <Typography sx={{ textAlign: "center" }}>
                            Already have an account?{" "}
                            <span>
                                <Link to="/login" className="hover:text-indigo-500">
                                    Login
                                </Link>
                            </span>
                        </Typography>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: "text.secondary" }}>or</Typography>
                    </Divider>
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
            </SignUpContainer>
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
    boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    [theme.breakpoints.up("sm")]: {
        width: "450px",
    },
    ...theme.applyStyles("dark", {
        boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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
