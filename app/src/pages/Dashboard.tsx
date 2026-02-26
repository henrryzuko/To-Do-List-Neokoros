import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "../components/TaskFrom";

export default function Dashboard() {
    const [tasks, setTasks] = useState<any[]>([]);

    const { logout } = useAuth();

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    return (
        <div>
            <h1>Tarefas</h1>

            {tasks.map((task) => (
                <div key={task.id}>
                    <strong>{task.description}</strong>

                    {task.date && (
                        <span style={{ marginLeft: "10px", color: "gray" }}>
                            {new Date(task.date).toLocaleDateString()}
                        </span>
                    )}
                </div>
            ))}

            <TaskForm onCreated={loadTasks}/>

            <button onClick={() => logout()}>Sair</button>
        </div>
    );
}