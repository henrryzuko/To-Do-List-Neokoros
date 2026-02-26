import { useEffect, useState } from "react";
import { deactivateTask, getTasks, updateTaskStatus } from "../api/taskApi";
import { TaskStatuses, type TaskStatus } from "../types/taskStatus";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "../components/TaskForm";

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

    const handleTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
        await updateTaskStatus(taskId, newStatus);
        loadTasks();
    };

    return (
        <div>
            <h1>Tarefas</h1>

            <TaskForm onCreated={loadTasks}/>
            <br/>
            {tasks.map((task) => (
                <div key={task.id}>
                    <strong>{task.description}</strong>

                    {task.date && (
                        <span style={{ marginLeft: "10px", marginRight: "10px", color: "gray" }}>
                            {new Date(task.date).toLocaleDateString()}
                        </span>
                    )}

                    <select value={task.status} onChange={(event) => handleTaskStatus(task.id, event.target.value as TaskStatus)}>
                        {TaskStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}

                    </select>

                    <span style={{ marginLeft: "10px" }}>Progresso: {task.status}</span>

                    <span style={{ marginLeft: "10px", color: "red", cursor: "pointer"  }} onClick={async () => {
                        try {
                            
                            await deactivateTask(task.id);
                            setTasks((taskList) => taskList.filter((t) => t.id !== task.id));
                        } catch (err) {
                            console.log("fail", err)
                        }
                    }}>Remover</span>
                </div>
            ))}

            <button style={{ margin: 10 }} onClick={() => logout()}>Sair</button>
        </div>
    );
}