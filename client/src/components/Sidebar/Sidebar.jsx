import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Navbar from '../Navbar/Navbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PercentIcon from '@mui/icons-material/Percent';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import {useContext} from 'react';
import { ColorModeContext } from '../Theme/Theme';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {mode, toggleMode} = useContext(ColorModeContext)

  console.log(mode);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Navbar/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <List sx={{textDecoration:"none"}}>
          <Link to={"/colection"}>
            <ListItem sx={{textDecoration:"none"}} >
              <ListItemButton sx={{color: "black", textDecoration:"none"}}>
                  <ListItemIcon > 
                    <VideogameAssetIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"My collection"} sx={{textDecoration:"none"}}/>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List sx={{textDecoration:"none"}}>
          <Link to={"/wishes"}>
            <ListItem sx={{textDecoration:"none"}} >
              <ListItemButton sx={{color: "black", textDecoration:"none"}}>
                <ListItemIcon > 
                  <FavoriteIcon/>
                </ListItemIcon>
                <ListItemText primary={"Wish List"} sx={{textDecoration:"none"}}/>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List sx={{textDecoration:"none"}}>
          <Link to={"/discounts"}>
            <ListItem sx={{textDecoration:"none"}} >
              <ListItemButton sx={{color: "black", textDecoration:"none"}}>
                <ListItemIcon > 
                  <PercentIcon />
                </ListItemIcon>
                <ListItemText primary={"Discounts"} sx={{textDecoration:"none"}}/>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <ListItem >
            <ListItemButton>
                <ListItemIcon > 
                  <QuestionMarkIcon/>
                </ListItemIcon>
                <ListItemText primary={"About"}/>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem >
            <ListItemButton>
                <ListItemIcon > 
                  <QuestionAnswerIcon/>
                </ListItemIcon>
                <ListItemText primary={"Contact us"}/>
            </ListItemButton>
          </ListItem>
        </List>
        <List >
          <ListItem sx={{display: "flex" ,justifyContent: "center", textAlign:"center"}} >
                
                  <Switch onChange={toggleMode} color={"secondary"}/>
                <ListItemIcon > 
                  <Brightness5Icon/>
                </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}


export default Sidebar;