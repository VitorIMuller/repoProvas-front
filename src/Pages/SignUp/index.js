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


export default function SignUp() {

    const [button, setButton] = useState(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();


    function handleSignIn(e) {
        e.preventDefault();
        const formData = {
            email: email,
            password: password
        }
        if (formData.email.length === 0 || formData.password.length === 0) {
            alert("Favor Preencher os campos")
            window.location.reload()
        }
        if (formData.password !== confirmPassword) {
            alert("As Senhas não coincidem")
        }
        setButton(false)
        const promise = api.signUp(formData)
        promise.then(() => {
            navigate("/")
        })
        promise.catch((error) => {
            alert(error.message)
            window.location.reload()
        });
    }
    return (
        <>
            <TopBar><img src={LogoName} /></TopBar>
            <Container>
                <StyledButton >Entrar Com Github</StyledButton>
                <p>ou</p>
                <Form onSubmit={handleSignIn}>
                    <StyledInput
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        placeholder="e-mail"
                        type="email"
                    />
                    <StyledInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                    <StyledInput
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        name="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                    />
                    {button ?
                        <StyledButton>Sign Up!</StyledButton>
                        :
                        <StyledButton Loading={true}><CenterLoader><Loading height={35} width={43} /></CenterLoader></StyledButton>
                    }
                    <StyledLink to="/">Já possui cadastro? Faça o login!</StyledLink>
                </Form>
            </Container>
        </>
    )
}

