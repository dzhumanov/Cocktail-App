import React, { useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { NavLink } from "react-router-dom";
import { logout } from "../../../features/users/usersThunk";
import { apiURL } from "../../../constants";

interface Props {
  user: User;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let avatar;

  if (!user.googleID) {
    avatar = apiURL + "/" + user.avatar;
  } else {
    avatar = user.avatar;
  }

  return (
    <>
      <Avatar alt={user.displayName} src={avatar} />
      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            <Link to="/trackHistory">My cocktails</Link>
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            <Link to="/cocktails/create">Post new cocktail</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
