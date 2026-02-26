import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            navigate("/");
        } catch (error) {
            setError("Cadastro Falhou.");
        }
    };

    return (
        <div>
            <h1>Cadastro</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    )
}