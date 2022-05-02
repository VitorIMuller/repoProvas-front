import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as api from "../../../Services/api"
import Divider from '@mui/material/Divider';
import useAuth from '../../../Hooks/useAuth';


export function TestItemTeacher({ name, url, discipline, id, views }) {
  const { user } = useAuth()

  const handleClick = () => {
    window.open(url, "_blank");
    handleAddViewCount()
  };

  async function handleAddViewCount() {

    try {
      await api.addViewCount(user, id)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <ListItemButton sx={{ pl: 8 }} onClick={handleClick}>
        <ListItemText primary={
          <Typography component="h1" variant="body1" >
            {name}
          </Typography>
        } secondary={
          <Typography component="h1" variant="body2" >
            {discipline}
          </Typography>
        } />
        <Typography component="h1" variant="body2" >
          {`Views: ${views}`}
        </Typography>
      </ListItemButton>
      <Divider></Divider>
    </>
  )
}