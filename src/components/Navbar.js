import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: "inherit",
  fontWeight: isActive ? 700 : 500,
});

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Stock Portfolio
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={NavLink} to="/" style={linkStyle}>
            Dashboard
          </Button>
          <Button color="inherit" component={NavLink} to="/portfolio" style={linkStyle}>
            Portfolio
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}