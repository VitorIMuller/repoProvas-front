import axios from "axios"

const BASE_URL = "http://localhost:5000"


async function signUp(formaData) {
    const promise = await axios.post(`${BASE_URL}/signUp`, formaData)
    return promise
}
async function signIn(formaData) {
    const promise = await axios.post(`${BASE_URL}/signIn`, formaData)
    return promise
}

export {
    signUp,
    signIn
}