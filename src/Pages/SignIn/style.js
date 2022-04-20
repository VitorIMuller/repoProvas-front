import { Link } from "react-router-dom";
import styled from "styled-components";
const TopBar = styled.div`
    width: 100vw;
    height: 65px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 20px;

    
`

const Form = styled.form`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    @media (min-width: 767px){
        position: relative;
        top: 30%;
        
    }
`;

const StyledInput = styled.input`
    all: unset;
    box-sizing: border-box;
    width: 80%;
    height: 40px;
    padding: 18px;
    border-radius: 5px;
    background-color: #ffffff;
    color: #000000;
    border: #000000 2px solid;
    ::placeholder {
        color:#9F9F9F;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Oswald', sans-serif;
    }
`;

const StyledButton = styled.button`
    border: none;
    text-align: center;
    width: 80%;
    height: 35px;
    border-radius: 5px;
    background-color: #1877F2;
    font-size: 18px;
    font-weight: bold;
    color: white;
    font-family: 'Oswald', sans-serif;
    width: 400px;
    margin-bottom: 20px;
`;
const StyledLink = styled(Link)`
    font-family: 'Lato', sans-serif;
    color: #ffffff;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    margin-top: 20px;
`;
const CenterLoader = styled.div`
display:flex;
align-items: center;
justify-content: center;
`
const Container = styled.div`

    
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    margin-top: 80px;


    
    
    `



export {
    TopBar,
    Form,
    StyledInput,
    StyledButton,
    StyledLink,
    CenterLoader,
    Container
}