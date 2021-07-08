import styled from "styled-components/macro";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, TextField } from "@material-ui/core";
import SaMLoadingSpinnerAndMascot from "../components/SaMLoadingSpinnerAndMascot";
import { Link } from "react-router-dom";

export default function LoginPage({ setIsLoggedIn }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  setIsLoggedIn(false);
  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(credentials);
  };

  return (
    <Wrapper>
      <div className="centerpiece">
        <Form onSubmit={handleSubmit}>
          <SaMLoadingSpinnerAndMascot
            message={
              "Hey, I'm SaM. \n Please log in or register \n to explore the world!"
            }
          />

          <TextField
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleChange}
            value={credentials.username}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Form>
        <Button
          className="registerButton"
          fullWidth={true}
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
        >
          Register
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

  .registerButton {
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
