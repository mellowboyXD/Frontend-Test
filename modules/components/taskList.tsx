'use client'

import { Task } from "../utils/usefulTypes";
import NoTasks from "./noTasks";
import TaskCard from "./taskCard";

import styles from '../styles/taskList.module.css'

interface TaskListProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export default function TaskList(props: TaskListProps) {
    const tasks = props.tasks;
    const setTasks = props.setTasks;

    const handleCompleteTask = (id: string) => {
        setTasks(tasks.map(currentTask =>
            currentTask.id === id
                ? { ...currentTask, isChecked: !currentTask.isChecked }
                : currentTask
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
            {(tasks.length == 0) ? <NoTasks /> : <></>}

            {/* render active tasks first */}
            {tasks.map(task => (
                !task.isChecked
                    ? <li key={task.id}>
                        <TaskCard
                            task={task}
                            completeTask={handleCompleteTask}
                            deleteTask={handleDeleteTask}
                            editTask={handleEditTask}
                        />
                    </li>
                    : ''
            ))}

            {/* then render completed tasks */}
            {tasks.map(task => (
                task.isChecked
                    ? <li key={task.id}>
                        <TaskCard
                            task={task}
                            completeTask={handleCompleteTask}
                            deleteTask={handleDeleteTask}
                            editTask={handleEditTask}
                        />
                    </li>
                    : ''
            ))}
        </ul>
    );
}
