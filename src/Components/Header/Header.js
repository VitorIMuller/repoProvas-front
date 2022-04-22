import { useNavigate } from "react-router-dom";
import LogoName from "../../Assets/LogoName.png"
import LogOut from "../../Assets/LogOut.png"
import useAuth from '../../Hooks/useAuth';
import { Container } from "@mui/material"
import Grid from '@mui/material/Grid';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Avatar from '@mui/material/Avatar';


function Header(Props) {

    const { logOff, auth } = useAuth()
    const navigate = useNavigate();

    function handleLogOff() {
        logOff()
        navigate("/")
    }

    return (
        <Container maxWidth={false} sx={{
            padding: 2,
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: (theme) =>
                theme.palette.background.default,

        }}>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignContent="center"
            >
                <Grid item xs={12}>
                    <img src={LogoName} alt="" />
                </Grid>
                {auth &&
                    <Avatar sx={{ m: 2.5, bgcolor: 'secondary.main' }}>
                        <LogoutOutlinedIcon onClick={handleLogOff} />
                    </Avatar>
                }
            </Grid>
        </Container >
    )
}

export default Header