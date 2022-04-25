import { useNavigate } from "react-router-dom";
import LogoName from "../../Assets/LogoName.png"
import useAuth from '../../Hooks/useAuth';
import { Container } from "@mui/material"
import Grid from '@mui/material/Grid';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Avatar from '@mui/material/Avatar';
import Divider from "@mui/material/Divider";


function Header() {

    const { logOut, user } = useAuth()


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

            >
                <Grid item xs={12}
                    display="flex"


                >
                    <img src={LogoName} alt="" />
                    {user &&
                        <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}
                            display="flex"


                        >
                            <LogoutOutlinedIcon onClick={() => logOut()} />
                        </Avatar>
                    }
                    {user &&
                        <Divider sx={{ m: 1 }}></Divider>
                    }
                </Grid>
            </Grid>
        </Container >
    )
}

export default Header