import { useState } from "react";
import { createTask } from "../api/taskApi";

interface FormProps {
    onCreated: () => void;
}

export default function TaskForm({ onCreated }: FormProps) {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");

        if (!description.trim()) {
            setError("Descrição Obrigatória!!");
            return;
        }

        try {
            setLoading(true);

            await createTask({
                description,
                date: date || undefined,
            });

            setDescription("");
            setDate("");

            onCreated();
        } catch (error) {
            setError("Falha ao criar Tarefa");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
            Criar Nova Tarefa

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Descrição..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                style={{ display: "block", marginBottom: 10, width: "100%" }}
            />

            <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                style={{ display: "block", marginBottom: 10 }}
            />

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Aguarde..." : "Criar Tarefa"}
            </button>
        </div>
    );
}