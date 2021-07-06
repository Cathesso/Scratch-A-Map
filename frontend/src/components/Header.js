import styled from "styled-components/macro";
import ExploreIcon from "@material-ui/icons/Explore";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  center: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

export default function Header({ isLoggedIn }) {
  const classes = useStyles();
  return (
    <Wrapper>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn && (
            <div id="menuToggle">
              <input type="checkbox" />
              <span className="menuline" />
              <span className="menuline" />
              <span className="menuline" />
              <ul id="menu">
                <li>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/home"
                  >
                    Home
                  </Button>
                </li>
                <li>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/about"
                  >
                    About
                  </Button>
                </li>
                <li>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/"
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          )}
          <Typography variant="h5" component="h2" className={classes.center}>
            Scratch-A-Map
          </Typography>
          {isLoggedIn && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="map"
              component={Link}
              to={"/explore"}
            >
              <ExploreIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0;
  width: 100vw;

  #menuToggle {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 9997;
    -webkit-user-select: none;
    user-select: none;
  }

  #menuToggle input {
    display: flex;
    width: 40px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    opacity: 0;
    z-index: 9998;
  }

  #menuToggle .menuline {
    display: flex;
    width: 29px;
    height: 2px;
    margin-bottom: 5px;
    position: relative;
    background: #ffffff;
    border-radius: 3px;
    z-index: 9997;
    transform-origin: 5px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }

  #menuToggle .menuline:first-child {
    transform-origin: 0% 0%;
  }

  #menuToggle .menuline:nth-last-child(2) {
    transform-origin: 0% 100%;
  }

  #menuToggle input:checked ~ .menuline {
    opacity: 1;
    transform: rotate(45deg) translate(-3px, -1px);
    background: #36383f;
  }
  #menuToggle input:checked ~ .menuline:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  #menuToggle input:checked ~ .menuline:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }

  #menu {
    position: absolute;
    width: 33vw;
    height: 80vh;
    box-shadow: 0 0 10px #85888c;
    margin: -50px 0 0 -50px;
    color: white;
    padding: 50px;
    padding-top: 125px;
    background-color: #f5f6fa;
    background-color: #03a9f4;
    background-color: #a3764c;
    background: rgba(128, 128, 128, 0.35);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(9.5px);
    -webkit-backdrop-filter: blur(9.5px);
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    list-style: none;
  }

  #menu li {
    transition-delay: 2s;
    margin: 10px 0;
  }

  #menuToggle input:checked ~ ul {
    transform: none;
  }
`;
