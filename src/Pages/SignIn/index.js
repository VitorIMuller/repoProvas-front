import {
    TopBar,
    Form,
    StyledInput,
    StyledButton,
    StyledLink,
    CenterLoader,
    Container
} from "./style"
import LogoName from "../../Assets/LogoName.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Assets/Loading"
import * as api from "../../Services/api"
import useAuth from "../../Hooks/useAuth"


export default function SignIn() {
    const { setUser } = useAuth()

    const [button, setButton] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    function handleInputChange(e) {
        formData[e.target.name] = e.target.value;
        setFormData({ ...formData })
    }

    function handleSignIn(e) {
        e.preventDefault();
        if (formData.email.length === 0 || formData.password.length === 0) {
            alert("Favor Preencher os campos")
            window.location.reload()
        }
        setButton(false)
        const promise = api.signIn(formData)
        promise.then((response) => {
            setUser(response.data)
            navigate("/home")
        })
        promise.catch((error) => {
            if (error.message === "Request failed with status code 404") {
                alert("Email/senha incorretos ou não existem")
            }
            window.location.reload()
        });
    }
    return (
        <>
            <TopBar><img src={LogoName} /></TopBar>
            <Container>
                <StyledButton > Entrar Com Github</StyledButton>
                <p>ou</p>
                <Form onSubmit={handleSignIn}>
                    <StyledInput
                        onChange={handleInputChange}
                        value={formData.email}
                        name="email"
                        placeholder="e-mail"
                        type="email"
                    />
                    <StyledInput
                        onChange={handleInputChange}
                        value={formData.password}
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                    {button ?
                        <StyledButton>Log In</StyledButton>
                        :
                        <StyledButton Loading={true}><CenterLoader><Loading height={35} width={43} /></CenterLoader></StyledButton>
                    }
                    <StyledLink to="/sign-up">Não possui cadastro? Crie sua conta aqui</StyledLink>
                </Form>
            </Container>

        </>


    )
}

