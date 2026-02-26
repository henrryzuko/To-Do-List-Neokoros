import { useState } from "react";
import { loginRequest } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await loginRequest(email, password)
            login(data);
            navigate("/");
        } catch (error) {
            setError("Login Falhou.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input style={{ margin: 5 }} placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
            <input style={{ margin: 5 }} placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
            <button style={{ margin: 5 }} onClick={handleLogin}>Login</button>
            <button style={{ margin: 5 }} onClick={() => navigate("/register")}>Cadastre-se</button>
        </div>
    );
}
