import axios from "axios"

const BASE_URL = "http://localhost:4000"


async function signUp(formaData) {
    console.log(formaData)
    const promise = await axios.post(`${BASE_URL}/signUp`, formaData)
    return promise
}

export {
    signUp
}