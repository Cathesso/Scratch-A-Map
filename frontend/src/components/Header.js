import styled from "styled-components/macro";
import MenuIcon from "@material-ui/icons/Menu";
import ExploreIcon from "@material-ui/icons/Explore";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  center: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <Wrapper>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            href="/"
            color="inherit"
            aria-label="menu"
            fontSize="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="h2" className={classes.center}>
            Scratch-A-Map
          </Typography>
          <IconButton
            edge="end"
            href="/explore"
            color="inherit"
            aria-label="map"
          >
            <ExploreIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0;
  width: 100vw;
`;
