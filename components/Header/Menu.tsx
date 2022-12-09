import Button from "@mui/material/Button";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="md:!hidden relative">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="!normal-case !text-white/80"
      >
        Browse
      </Button>
      <div
        className={`absolute flex flex-col items-center w-5 overflow-hidden translate-x-[1.35rem] -translate-y-2 ${
          !open && "hidden"
        }`}
      >
        <div className="w-2 h-2 origin-bottom-left transform rotate-45 bg-gray-300 self-centerr" />
      </div>
      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transitionDuration={0}
        className="menu"
      >
        <MenuItem onClick={handleClose} className="menu-item">
          Home
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-item">
          TV Shows
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-item">
          Movies
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-item">
          New & Popular
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-item">
          My List
        </MenuItem>
      </MuiMenu>
    </div>
  );
}
