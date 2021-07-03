import styled from "styled-components/macro";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, TextField } from "@material-ui/core";
import Computer from "../components/Computer";

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
      <div class="centerpiece">
        <Form onSubmit={handleSubmit}>
          <Computer />

          <TextField
            label="Username"
            defaultValue="Username"
            variant="outlined"
            name="username"
            onChange={handleChange}
            value={credentials.username}
          />

          <TextField
            label="Password"
            defaultValue="password"
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

  button {
    width: 30%;
  }
`;

/*
.login{
 padding:2em;
 width: min(30rem,80%);
 min-height:150px;
 display:flex;
 flex-direction:column;
 justify-content:center;

background: rgba( 5, 0, 0, 0.35 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 9.5px );
-webkit-backdrop-filter: blur( 9.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
*/
