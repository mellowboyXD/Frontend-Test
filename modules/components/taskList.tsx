import NoTasks from "./noTasks";
import TaskCard from "./taskCard";

import { Task } from "../utils/usefulTypes";
import useMounted from "../utils/useMounted";

import styles from '../styles/taskList.module.css'

interface TaskListProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export default function TaskList(props: TaskListProps) {
    const tasks = props.tasks;
    const setTasks = props.setTasks;
    const mounted = useMounted();

    const handleCompleteTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, isChecked: !task.isChecked }
                : task
        ));
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEditTask = (newTask: Task) => {
        setTasks(tasks.map(task =>
            task.id === newTask.id
                ? newTask
                : task
        ));
    };

    return (
        <ul className={styles.container}>
            {!mounted || (tasks.length == 0)
                ? <NoTasks />
                : [...tasks].sort((a, b) => Number(a.isChecked) - Number(b.isChecked))
                    .map(task => (
                        <li key={task.id}>
                            <TaskCard
                                task={task}
                                completeTask={handleCompleteTask}
                                deleteTask={handleDeleteTask}
                                editTask={handleEditTask}
                            />
                        </li>
                    ))
            }
        </ul>
    );
}
