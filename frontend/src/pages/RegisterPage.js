import styled from "styled-components/macro";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, TextField } from "@material-ui/core";
import SaMLoadingSpinnerAndMascot from "../components/SaMLoadingSpinnerAndMascot";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage({ setIsLoggedIn }) {
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    password: "",
    passwordChecked: "",
  });
  const [errorMessage, setErrorMessage] = useState("Please register below");
  const [passwordIsNotCorrect, setPasswordIsNotCorrect] = useState();
  const [
    passwordCheckIsNotTheSameAsPassword,
    setPasswordCheckIsNotTheSameAsPassword,
  ] = useState();
  setIsLoggedIn(false);
  const { register } = useContext(AuthContext);
  const timerId = useRef(0);
  const [usernameAlreadyRegistered, setUsernameAlreadyRegistered] = useState();

  const handleChange = (event) => {
    setRegisterCredentials({
      ...registerCredentials,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (registerCredentials.username !== "") {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        axios
          .get(`/auth/checkUsername?username=${registerCredentials.username}`)
          .then((response) => response.data)
          .then((data) => setUsernameAlreadyRegistered(data))
          .catch((error) => console.log(error));
      }, 600);
    }
    if (registerCredentials.password !== "") {
      checkPassword(registerCredentials.password);
    }
    if (registerCredentials.passwordChecked !== "") {
      if (
        registerCredentials.passwordChecked !== "" &&
        registerCredentials.passwordChecked === registerCredentials.password
      ) {
        setPasswordCheckIsNotTheSameAsPassword(false);
      } else {
        setPasswordCheckIsNotTheSameAsPassword(true);
      }
    }
  }, [registerCredentials]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (usernameAlreadyRegistered !== undefined) {
      if (usernameAlreadyRegistered) {
        setErrorMessage("Username already taken :C");
      } else {
        setErrorMessage("Great username! :)");
      }
    }
  }, [usernameAlreadyRegistered]);

  useEffect(() => {
    if (passwordIsNotCorrect !== undefined) {
      if (passwordIsNotCorrect) {
        setErrorMessage("You need a more secure password. :0");
      } else {
        setErrorMessage("This password is perfect! :)");
      }
    }
  }, [passwordIsNotCorrect]);

  useEffect(() => {
    if (passwordCheckIsNotTheSameAsPassword !== undefined) {
      if (passwordCheckIsNotTheSameAsPassword) {
        setErrorMessage("The passwords don't match yet.");
      } else {
        setErrorMessage("Perfect!");
      }
    }
  }, [passwordCheckIsNotTheSameAsPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      passwordIsNotCorrect === false &&
      passwordCheckIsNotTheSameAsPassword === false &&
      registerCredentials.passwordChecked !== "" &&
      registerCredentials.password !== "" &&
      registerCredentials.username !== ""
    ) {
      register(registerCredentials);
    } else {
      setErrorMessage(
        "There is something wrong \n with your chosen username and/or password"
      );
    }
  };

  function checkPassword() {
    const matcher =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    if (registerCredentials.password.match(matcher)) {
      setPasswordIsNotCorrect(false);
    } else {
      setPasswordIsNotCorrect(true);
    }
  }

  return (
    <Wrapper>
      <div className="centerpiece">
        <Form onSubmit={handleSubmit}>
          <SaMLoadingSpinnerAndMascot message={errorMessage} />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth={true}
            name="username"
            error={usernameAlreadyRegistered}
            onChange={handleChange}
            value={registerCredentials.username}
          />

          <TextField
            label="Enter a Password"
            fullWidth={true}
            variant="outlined"
            type="password"
            name="password"
            error={passwordIsNotCorrect}
            onChange={handleChange}
            value={registerCredentials.password}
          />
          <p>
            (8-50 charakters and at least one uppercase, lowercase, numeric and
            special character)
          </p>

          <TextField
            label="Reenter Password"
            fullWidth={true}
            variant="outlined"
            type="password"
            name="passwordChecked"
            error={passwordCheckIsNotTheSameAsPassword}
            onChange={handleChange}
            value={registerCredentials.passwordChecked}
          />
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <Button
          className="loginButton"
          fullWidth={true}
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
        >
          Back to Login
        </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
  margin: 3%;
  grid-template-columns: 1fr auto 1fr;

  .loginButton {
    margin: 10px 0;
  }

  .MuiFormControl-root {
    margin: 10px 0;
  }

  .centerpiece {
    grid-column-start: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Form = styled.form`
  color: white;
  background: rgba(128, 128, 128, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  p {
    margin: 0;
    font-size: small;
  }
`;
