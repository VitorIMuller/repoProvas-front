import "./Styles/reset.css"
import "./Styles/styles.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import { AuthProvider } from "./Contexts/authContext"


export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}