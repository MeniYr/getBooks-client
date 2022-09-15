import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import {
  booksS,
  getAllBooks,
  getBooks,
  srchBooks,
} from "../redux/features/bookSlice";
import {
  MdBook,
  MdBookmarks,
  MdHome,
  MdOutlineBookmarks,
} from "react-icons/md";
import {
  getUser,
  getUsersSlice,
  logOutFromUsers,
  readMassage,
  readNotify,
} from "../redux/features/usersSlice";
import Delivery from "../components/delivery";
import { delivery } from "../redux/features/deliverySlice";
import { AuthWithToken, logOutFromToken } from "../redux/features/tokenSlice";
import ReactConfetti from "react-confetti";
import NotifyMsgNavbar from "../components/notifyMsgNavbar";
import moment from "moment";
import { GrBook } from "react-icons/gr";
import { useEffect } from "react";
import Logout from "../auth/logOut";

// search style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

// input style
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "55ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const srchRef = React.useRef(null);
  const { token, userName, id } = useSelector((state) => state.token);
  const {
    userNotify,
    userMsg,
    countNotify,
    countMsg,
    currentUser,
    readMsg_status,
    getUser_status,
  } = useSelector(getUsersSlice);
  const {
    getBooks_status,
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
  } = useSelector(booksS);
  const { changeOwner_status, changeUserToDeliver_status } =
    useSelector(delivery);

  // const [openLogin, setOpenLogin] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false);
  const [openMsgModal, setOpenMsgModal] = React.useState(false);
  const [notify, setNotify] = React.useState({});
  const [msg, setMSg] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  const [msgRefresh, setMsgRefresh] = React.useState(false);

  const nav = useNavigate();

  React.useEffect(() => {
    currentUser && dispatch(getUser());
  }, [
    getAllMyBooks_status,
    userBooks,
    changeUserToDeliver_status,
    refresh,
    msgRefresh,
    readMsg_status,
    swichHide_status,
  ]);

  // run search resault
  const search = () => {
    dispatch(srchBooks([srchRef.current.value]));
    nav("/search");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [noteEl, setNoteEl] = React.useState(null);
  const [msgEl, setMsgEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNoteMenuOpen = Boolean(noteEl);
  const isMsgMenuOpen = Boolean(msgEl);

  // handles
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNoteMenuOpen = (event) => {
    setRefresh(!refresh);
    dispatch(getUser(currentUser?._id));
    setNoteEl(event.currentTarget);
  };

  const handleMsgMenuOpen = (event) => {
    setMsgRefresh(!refresh);
    dispatch(getUser(currentUser?._id));
    setMsgEl(event.currentTarget);
  };

  const handleMyBooksMenuOpen = (event) => {
    nav("/myBooks");
    setAnchorEl(event.currentTarget);
  };
  // const handleLogInOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuOpen = (event) => {
    // console.log("here");
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNoteMenuClose = () => {
    setNoteEl(null);
    handleMobileMenuClose();
  };

  const handleMsgMenuClose = () => {
    setMsgEl(null);
    handleMobileMenuClose();
  };

  // burger menu
  const menuId = "primary-search-account-menu";

  // notify menu

  const notyfiMenuId = "primary-search-account-menu";
  const renderNoteMenu = (
    <Menu
      anchorEl={noteEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={notyfiMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNoteMenuOpen}
      onClose={handleNoteMenuClose}
    >
      {userNotify?.map((item) => {
        return (
          <MenuItem
            sx={{
              width: 250,
            }}
            key={item?._id}
            onClick={() => {
              item?.isRead === false && dispatch(readNotify(item?._id));
              setOpenModal(true);
              setNotify(item);
              handleNoteMenuClose();
            }}
          >
            {item?.fromUserId?._id !== item?.bookID?.userID && (
              <p
                className={`text-wrap p-0 m-0 ${
                  item?.isRead === false ? "opacity-100" : "opacity-50"
                }`}
              >
                {item?.fromUserId?.name}{" "}
                {item?.isForDeliver === true
                  ? " מסר לך ספר "
                  : " מעוניין בספר "}
                {item?.bookID?.name}
              </p>
            )}
            {item?.fromUserId?._id === item?.bookID?.userID && (
              <p
                className={`text-wrap p-0 m-0 ${
                  item?.isRead === false ? "opacity-100" : "opacity-50"
                }`}
              >
                {item?.fromUserId?.name} אישר מסירת ספר {item?.bookID?.name}
              </p>
            )}
          </MenuItem>
        );
      })}
      {userNotify?.length === 0 && (
        <div className="d-flex justify-content-center text-center">
          <p>עדיין אין התראות 🙃</p>
        </div>
      )}
    </Menu>
  );

  // msg menu

  const msgMenuId = "primary-search-account-menu";
  const renderMsgMenu = (
    <Menu
      anchorEl={msgEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={msgMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMsgMenuOpen}
      onClose={handleMsgMenuClose}
    >
      {userMsg?.map((item) => {
        return (
          <MenuItem
            sx={{
              width: 250,
            }}
            key={item?._id}
            onClick={() => {
              item?.isRead === false && dispatch(readMassage(item?._id));
              setMSg(item);
              setOpenMsgModal(true);
              handleMsgMenuClose();
            }}
          >
            <p
              className={`text-wrap p-0 m-0 ${
                item?.isRead === false ? "opacity-100" : "opacity-50"
              }`}
            >
              {moment(item?.date).format("DD-MM-YYYY, HH:mm")} <br />
              {item.fromUserId?.name}
            </p>
          </MenuItem>
        );
      })}
      {userNotify?.length === 0 && (
        <div className="d-flex justify-content-center text-center">
          <p>עדיין אין התראות 🙃</p>
        </div>
      )}
    </Menu>
  );

  // mobile menu

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Messages */}
      {token !== null && (
        <MenuItem onClick={handleMsgMenuOpen}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={countMsg} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p className="my-auto">הודעות</p>
        </MenuItem>
      )}
      {/* Notifications */}
      {token !== null && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={handleNoteMenuOpen}
          >
            <Badge badgeContent={countNotify} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p className="my-auto">התראות</p>
        </MenuItem>
      )}

      {/* myBooks */}
      {token !== null && (
        <MenuItem
          className="d-flex"
          onClick={handleMyBooksMenuOpen}
          sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <MdOutlineBookmarks />
          </IconButton>
          <p>הספרים שלי</p>
        </MenuItem>
      )}

      {/* login */}
      {token !== null && (
        <MenuItem className=" p-0 m-0 h-100">
          <p className="badge text-black bg-info shadow  h-25 m-0 p-1 mx-auto">
            {currentUser?.name}
          </p>
        </MenuItem>
      )}
      <MenuItem
        className={`d-md-flex justify-content-center ${
          window.innerWidth < 768 && "d-block"
        }`}
      
      >
        {token === null ? (
          <Link
            className="btn w-100 btn-success d-md-inline-flex align-items-center"
            color={"white"}
            to={"/login"}
            onClick={handleMobileMenuClose}
          >
            התחברות
          </Link>
        ) : (
          <Link
            className="btn btn-outline-warning d-md-inline-flex align-items-center w-100"
            color={"white"}
            to={"/logOut"}
            onClick={handleMobileMenuClose}
          >
            יציאה
          </Link>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {openModal && <Delivery toOpenModal={setOpenModal} note={notify} />}
      {openMsgModal && (
        <NotifyMsgNavbar toOpenModal={setOpenMsgModal} msg={msg} />
      )}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            // noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }} //style
          >
            <Link
              className="text-white fst-italic fs-2 fw-semibold text-decoration-none"
              to={"/"}
            >
              Get books <MdHome />
            </Link>
          </Typography>
          <Typography
            variant="h6"
            // noWrap
            component="div"
            sx={{
              display: { xs: "block", sm: "block", md: "block", lg: "none" },
            }} //style
          >
            <Link
              className="text-white fst-italic fs-4 fw-semibold text-decoration-none ps-3"
              to={"/"}
            >
              <MdHome />
            </Link>
          </Typography>

          {/* search */}
          <Search
            sx={{
              width: 700,
              mr: "auto",
            }}
          >
            <SearchIcon
              style={{
                height: "100%",
                position: "absolute",
                left: "0",
                cursor: "pointer",
                pointerEvents: "painted",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "15",
                zIndex: "99",
              }}
              sx={{
                display: { xs: "none", md: "inline-flex", lg: "inline-flex" },
              }}
              onClick={search}
            />
            <StyledInputBase
              placeholder="חיפוש..."
              inputProps={{ "aria-label": "search" }}
              inputRef={srchRef}
              onKeyDown={(e) => (e.key === "Enter" ? search() : 0)}
            />
          </Search>

          {/* on web-desktop=> social menu, conection button */}
          <Box
            sx={{
              mr: "auto",
              display: { xs: "none", md: "inline-flex", lg: "inline-flex" },
            }}
          >
            {/* massages */}
            {token !== null && (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleMsgMenuOpen}
                >
                  <Badge badgeContent={countMsg} color="error">
                    <Tooltip title="הודעות">
                      <MailIcon />
                    </Tooltip>
                  </Badge>
                </IconButton>

                {/* notifications */}
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleNoteMenuOpen}
                >
                  <Badge badgeContent={countNotify} color="error">
                    <Tooltip title="התראות">
                      <NotificationsIcon />
                    </Tooltip>
                  </Badge>
                </IconButton>
                {/* { <ReactConfetti numberOfPieces={10} recycle={false} width="500px" height="500px" />} */}

                {/* personal aria */}
                <Tooltip title="הספרים שלי">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleMyBooksMenuOpen}
                    color="inherit"
                  >
                    <MdOutlineBookmarks />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {/* {openLogin&&<Login />} */}
            {/* <button onClick={()=>setOpenLogin(true)}>לחץ</button> */}
            {token === null ? (
              <Link
                className="text-bolder  text-decoration-none d-md-inline-flex align-items-center badge"
                color={"white"}
                to={"/login"}
              >
                החחברות
              </Link>
            ) : (
              <Tooltip title="יציאה">
                <Link
                  className="text-warning text-decoration-none d-md-inline-flex align-items-center "
                  color={"white"}
                  to={"/logOut"}
                >
                  {currentUser?.name}{" "}
                </Link>
              </Tooltip>
            )}
          </Box>

          {/* my account icon / more`s button  */}
          <Box
            sx={{
              mr: "auto",
              display: { xs: "flex", md: "none" },
            }}
          >
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
      {renderMsgMenu}
      {renderNoteMenu}
    </Box>
  );
}
