import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserInfo } from '../../user/UserSlice';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';

import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: "Home", to: "/" },
    { name: "Profile", to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile" },
    { name: loggedInUser?.isAdmin ? "Orders" : "My orders", to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders" },
    { name: "Logout", to: "/logout" },
  ];

  const firstName = userInfo?.name?.split(" ")[0] || "";

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", boxShadow: "none", color: "text.primary" }}>
      <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-around" }}>

        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          MERN SHOP
        </Typography>

        {/* Right side */}
        <Stack flexDirection="row" alignItems="center" justifyContent="center" columnGap={2}>

          {/* Avatar + Menu */}
          <Tooltip title="Open menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userInfo?.name} src={null} />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >

            {/* Admin-only menu item */}
            {loggedInUser?.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  to="/admin/add-product"
                  color="text.primary"
                  sx={{ textDecoration: "none" }}
                >
                  Add New Product
                </Typography>
              </MenuItem>
            )}

            {/* General menu items */}
            {settings.map((setting, index) => (
              <MenuItem key={index} onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  to={setting.to}
                  color="text.primary"
                  sx={{ textDecoration: "none" }}
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Greeting */}
          <Typography variant="h6" fontWeight={300}>
            {is480 ? firstName : `Hey 👋, ${userInfo?.name}`}
          </Typography>

          {/* Admin badge */}
          {loggedInUser?.isAdmin && (
            <Button variant="contained" onClick={() => navigate("/admin/dashboard")}>
              Admin
            </Button>
          )}

          {/* Cart + Wishlist + Filters */}
          <Stack flexDirection="row" columnGap="1rem" alignItems="center" justifyContent="center">

            {/* Cart */}
            {cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color="error">
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {/* Wishlist */}
            {!loggedInUser?.isAdmin && (
              <Badge badgeContent={wishlistItems?.length} color="error">
                <IconButton component={Link} to="/wishlist">
                  <FavoriteBorderIcon />
                </IconButton>
              </Badge>
            )}

            {/* Filters */}
            {isProductList && (
              <IconButton onClick={handleToggleFilters}>
                <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
              </IconButton>
            )}

          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
