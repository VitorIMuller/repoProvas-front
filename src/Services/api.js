import axios from "axios"

const BASE_URL = "http://localhost:5000"


function createConfig(token) {

    return { headers: { 'Authorization': `${token}` } }
}


async function signUp(formaData) {
    const promise = await axios.post(`${BASE_URL}/signUp`, formaData)
    return promise
}
async function signIn(formaData) {
    const promise = await axios.post(`${BASE_URL}/signIn`, formaData)
    return promise
}
async function getAllCategories(token) {
    const config = createConfig(token)


    const categories = await axios.get(`${BASE_URL}/category`, config)

    return categories.data
}

async function getAllTerms(token) {
    const config = createConfig(token)

    const term = await axios.get(`${BASE_URL}/term`, config)

    return term.data
}

async function getAllTeachers(token) {
    const config = createConfig(token)

    const teachers = await axios.get(`${BASE_URL}/teacher`, config)

    return teachers.data
}

async function getAllTests(token) {
    const config = createConfig(token)

    const tests = await axios.get(`${BASE_URL}/test`, config)

    return tests.data
}

async function getAllDisciplines(token) {
    const config = createConfig(token)

    const data = await axios.get(`${BASE_URL}/discipline`, config)

    return data.data
}

async function addViewCount(token, id) {
    const config = createConfig(token)

    await axios.patch(`${BASE_URL}/test/${id}/addView`, {}, config)

}
async function createTest(token, data) {
    const config = createConfig(token)

    await axios.post(`${BASE_URL}/test`, data, config)

}

export {
    signUp,
    signIn,
    getAllCategories,
    getAllTerms,
    getAllTeachers,
    getAllTests,
    getAllDisciplines,
    addViewCount,
    createTest
}