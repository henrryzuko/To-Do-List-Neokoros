import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { registerRequest } from "../api/authApi";

interface FormProps {
    onSubmit: () => void;
}

export default function RegisterForm({ onSubmit }: FormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register } = useAuth();

    const handleSubmit = async () => {
        setError("");

        if (!name.trim() && !email.trim() && password.trim()) {
            setError("Credenciais Obrigatórias!!");
            return;
        }

        try {
            setLoading(true);

            const data = await registerRequest(
                name,
                email,
                password,
            );

            register(data)

            setName("");
            setEmail("");
            setPassword("");

            onSubmit();
        } catch (error) {
            setError("Falha ao cadastrar Usuário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                style={{ margin: 5 }}
                placeholder="Nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <input
                style={{ margin: 5 }}
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <input
                style={{ margin: 5 }}
                placeholder="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button style={{ margin: 5 }} onClick={handleSubmit} disabled={loading}>
                {loading ? "Aguarde..." : "Criar Usuário"}
            </button>

            <p>
                Já tem uma conta? Faça <Link to="/login">Login</Link>
            </p>
        </div>
    )
}