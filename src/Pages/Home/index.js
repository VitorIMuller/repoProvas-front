import Container from '@mui/material/Container';
import TopMenu from '../../Components/TopMenu';
import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function Home() {

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState({})

    const handleClick = () => {
        setOpen(!open);
        setColor(!open
            ? { color: '#3F61D7', }
            : {})
    };

    return (

        <Container component="main" maxWidth="xl">
            <TopMenu />
            <Container component="main" maxWidth="xl" sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <List
                    sx={{ width: '100%', maxWidth: "none", bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Repositório
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary={<Typography component="h1" variant="body1" >
                            Item 1
                        </Typography>
                        } />
                        {open ? <ExpandLess color="secondary" /> : <ExpandMore sx={color} />}
                    </ListItemButton>
                    <Divider></Divider>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Nested Item" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary={<Typography component="h1" variant="body1" >
                            Item 2
                        </Typography>
                        } />
                        {open ? <ExpandLess color="secondary" /> : <ExpandMore sx={color} />}
                    </ListItemButton>
                    <Divider></Divider>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Nested Item" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary={<Typography sx={color} component="h1" variant="body1" >
                            Item 3
                        </Typography>
                        } />
                        {open ? <ExpandLess color="secondary" /> : <ExpandMore sx={color} />}
                    </ListItemButton>
                    <Divider></Divider>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Nested Item" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary={<Typography component="h1" variant="body1" >
                            Item 4
                        </Typography>
                        } />
                        {open ? <ExpandLess color="secondary" /> : <ExpandMore sx={color} />}
                    </ListItemButton>
                    <Divider></Divider>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Nested Item" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Container >
        </Container>
    );
}


