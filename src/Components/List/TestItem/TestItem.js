
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import * as api from "../../../Services/api"
import useAuth from '../../../Hooks/useAuth';

export function TestItem({ name, url, teacher, id, views }) {

  const { user } = useAuth()

  const handleClick = async () => {
    window.open(url, "_blank");
    await handleAddViewCount()
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
            {teacher.name}
          </Typography>
        } />
        <Typography sx={{ opacity: 0.5 }} component="h1" variant="body2" >
          {`Views: ${views} `}
        </Typography>
      </ListItemButton>
      <Divider></Divider>
    </>
  )
}