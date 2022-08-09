import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doApiMethod } from '../services/apiService';
import { boxSizing } from '@mui/system';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',

  },
}));

const SearchIconWrapper = () => ({
  height: '100%',
  position: 'absolute',
  left: "0",
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {

  const srchRef = React.useRef(null)
  const userLogIn = useSelector((state) => state.token.token)
  const nav = useNavigate()

  React.useEffect(() => {
    console.log(userLogIn);
  }, [userLogIn])

  const search = () => {
    doApiMethod()
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    nav("/myProfile")
    setAnchorEl(event.currentTarget);
  };
  const handlePersonalAriaMenuOpen = (event) => {
    // nav("/myAccount")
    setAnchorEl(event.currentTarget);

  };
  const handlePopUpMenuOpen = (event) => {

    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    // console.log("here");
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleHomeMenuClose = () => {
    nav("/home")
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleUsersMenuClose = () => {
    nav("/allUsers")
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMyBooksMenuClose = () => {
    nav("/myBooks")
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleAddBookMenuClose = () => {
    nav("/addBook")
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handleUsersMenuClose}>כל המשתמשים</MenuItem>
      <MenuItem onClick={handleAddBookMenuClose}>הוספת ספר</MenuItem>
      <MenuItem onClick={handleMyBooksMenuClose}>הספרים שלי</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}

      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}


      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
      //TODO ICON HOME
        className='d-flex justify-content-center'
        onClick={handleHomeMenuClose}
      >
        בית
      </MenuItem>
      <MenuItem
        onClick={handlePersonalAriaMenuOpen}
        sx={{display: { xs: 'block', sm:"block", md: "none",lg:"none" } }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          // aria-haspopup="true"
          color="inherit"

        >
          <AccountCircle />
        </IconButton>
        <p>איזור אישי</p>
      </MenuItem>

      <MenuItem className='d-flex justify-content-center'>
        {/* <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          >
          <Badge badgeContent={17} color="error">
          <NotificationsIcon />
          </Badge>
        </IconButton> */}
        {userLogIn === null ? <Link className='btn w-100 btn-success d-md-inline-flex align-items-center' color={'white'} to={"/login"}>החחברות</Link> : <Link className='btn btn-outline-warning d-md-inline-flex align-items-center w-100' color={'white'} to={"/logOut"}>יציאה</Link>}
      </MenuItem>

    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static"
      >

        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 1, display: { xs: 'none', md: "block" } }}//style

            onClick={handleProfileMenuOpen}

          >
            <MenuIcon />

          </IconButton>


          <Typography
            variant="h6"
            // noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', md: "block" } }} //style
          >
            <Link className='text-white fst-italic fs-2 fw-semibold text-decoration-none' to={"/"}>get books</Link>
          </Typography>


          <Search
          >

            {/* <SearchIconWrapper */}
            {/* </SearchIconWrapper> */}
            <SearchIcon
              style={{
                height: '100%',
                position: 'absolute',
                left: "0",
                cursor: "pointer",
                pointerEvents: 'painted',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: "15",
                zIndex: "99"
              }}
              onClick={search}
            />

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              inputRef={srchRef}
              onKeyDown={(e) => (e.key === "Enter") ? search() : 0}
            />


          </Search>

          {/* linkes */}
          <Box
            paddingX={5}
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none', md: 'inline-flex', lg: "inline-flex"
              }
            }}
          >

            {/* <Link className='btn' color={'white'} to={"/signUp"}>הרשמה</Link>
            <Link className='btn' color={'white'} to={"/allUsers"}>כל המשתמשים</Link>
            <Link className='btn' color={'white'} to={"/addBook"}>הוספת ספר</Link> */}
            {/* <Link className='btn' color={'white'} to={"/msg"}>הודעות</Link> */}

            {/* <Link className='btn' color={'white'} to={"/myAccount"}>אזור אישי</Link> */}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'inline-flex', lg: "inline-flex" } }}>

            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            {userLogIn === null ? <Link className='btn btn-success d-md-inline-flex align-items-center' color={'white'} to={"/login"}>החחברות</Link> : <Link className='btn btn-outline-warning d-md-inline-flex align-items-center' color={'white'} to={"/logOut"}>יציאה</Link>}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

        </Toolbar>

      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
