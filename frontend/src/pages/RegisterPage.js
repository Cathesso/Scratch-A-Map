import styled from "styled-components/macro";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, FormHelperText, TextField } from "@material-ui/core";
import Computer from "../components/Computer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage({ setIsLoggedIn }) {
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    password: "",
    passwordChecked: "",
  });
  const [passwordIsNotCorrect, setPasswordIsNotCorrect] = useState(true);
  const [
    passwordCheckIsNotTheSameAsPassword,
    setPasswordCheckIsNotTheSameAsPassword,
  ] = useState(true);
  setIsLoggedIn(false);
  const { register } = useContext(AuthContext);
  const timerId = useRef(0);
  const [usernameAlreadyRegistered, setUsernameAlreadyRegistered] =
    useState(false);

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
    if (
      registerCredentials.passwordChecked !== "" &&
      registerCredentials.passwordChecked === registerCredentials.password
    ) {
      setPasswordCheckIsNotTheSameAsPassword(false);
    } else {
      setPasswordCheckIsNotTheSameAsPassword(true);
    }
  }, [registerCredentials]); //eslint-disable-line react-hooks/exhaustive-deps

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
      alert("There is something wrong with your chosen Username or Password");
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
          <Computer />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth={true}
            name="username"
            error={usernameAlreadyRegistered}
            onChange={handleChange}
            value={registerCredentials.username}
          />

          {usernameAlreadyRegistered && (
            <FormHelperText variant="outlined" margin="dense">
              Username already taken :C
            </FormHelperText>
          )}

          <TextField
            label="Enter a Password"
            fullWidth={true}
            variant="outlined"
            type="password"
            name="password"
            error={passwordIsNotCorrect}
            onChange={handleChange}
            value={registerCredentials.password}
            helperText="Please use 8-50 charakters and at least one uppercase, lowercase, numeric and special character."
          />

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
`;
