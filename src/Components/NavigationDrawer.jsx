import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Calendar from './Calendar'
import ChartComponent from './ChartComponent';
import BarChartIcon from '@mui/icons-material/BarChart';

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


    export default function NavigationDrawer() {
        const theme = useTheme();
        const [open, setOpen] = React.useState(false);
        const [selectedPage, setSelectedPage] = React.useState('CustomerList');
      
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
                <Typography variant="h6" noWrap component="div">
                  Personal Trainer
                </Typography>
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
              <List>
                {[
                  { text: 'Customer', value: 'CustomerList' },
                  { text: 'Trainings', value: 'TrainingList' },
                  { text: 'Calendar', value: 'Calendar' },
                  {text: 'Activity Chart', value: 'Chart'}
                ].map((item, index) => (
                  <ListItem key={item.text} onClick={() => setSelectedPage(item.value)}>
                    <ListItemButton>
                      <ListItemIcon>
                        {index === 0 ? <PeopleIcon /> : index === 1 ? <AccessibilityIcon /> : index === 2 ? <CalendarMonthIcon /> : <BarChartIcon />}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Main open={open}>
              <DrawerHeader />
              {selectedPage === 'CustomerList' && <CustomerList />}
              {selectedPage === 'TrainingList' && <TrainingList />}
              {selectedPage === 'Calendar' && <Calendar />}
              {selectedPage === 'Chart' && <ChartComponent />}
            </Main>
          </Box>
        );
      }