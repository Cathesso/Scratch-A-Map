import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const history = useHistory();
  const [jwtDecoded, setJwtDecoded] = useState();

  const login = (credentials) => {
    axios
      .post("/auth/login", credentials)
      .then((response) => response.data)
      .then((data) => {
        setToken(data);
        setJwtDecoded(jwt_decode(data.toString()));
      })
      .then(() => history.push("/home"))
      .catch((error) => console.error(error.message));
  };

  const register = (registerCredentials) => {
    let registerData = {
      username: registerCredentials.username,
      password: registerCredentials.password,
    };
    axios
      .post(`/auth/register`, registerData)
      .then((response) => response.data)
      .then(() => history.push("/"))
      .catch((error) => console.log(error));
  };

  return (
    <AuthContext.Provider value={{ token, login, jwtDecoded, register }}>
      {children}
    </AuthContext.Provider>
  );
}
