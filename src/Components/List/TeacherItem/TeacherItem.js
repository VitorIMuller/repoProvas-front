import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import Divider from '@mui/material/Divider';


export function TeacherItem({ children, name }) {


  const [open, setOpen] = useState(false);
  const [color, setColor] = useState({})

  const handleClick = () => {
    setOpen(!open);
    setColor(!open
      ? { color: '#3F61D7', }
      : {})
  };

  if (children.length === 0) {
    return (<></>)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={<Typography sx={color} component="h1" variant="body1" >
          {name}
        </Typography>
        } />
        {open ? <ExpandLess color="secondary" /> : <ExpandMore color='secondary' />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.length !== 0
            ? children
            : <Typography component="h1" variant="body1" >Não temos informações sobre esse período :(</Typography>}
        </List>
      </Collapse>
      <Divider></Divider>
    </>
  )
}