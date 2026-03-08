import { useEffect, useRef, useState } from "react";
import { Task } from "../utils/usefulTypes";

import styles from "../styles/taskCard.module.css"

interface TaskCardProps {
    task: Task;
    completeTask: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
    editTask: (newTask: Task) => void;
}

export default function TaskCard(props: TaskCardProps): JSX.Element {
    const [task, setTask] = useState(props.task);
    const [isEditing, setIsEditing] = useState(false);
    const errorElementRef = useRef<HTMLSpanElement>(null);
    const taskNameInputRef = useRef<HTMLInputElement>(null);

    const handleEdit = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        /* go into focus mode as soon as the edit button is pressed */
        if (isEditing)
            taskNameInputRef.current?.focus();
    }, [isEditing]);

    if (!isEditing) {
        return (
            <div className={styles.container}>
                <div>
                    <span
                        className={
                            (task.priority == "Low") ? styles.lowPriority :
                                (task.priority == "Medium") ? styles.mediumPriority :
                                    styles.highPriority}>
                        {task.priority}
                    </span>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.checkbox}
                            type='checkbox'
                            id={task.id}
                            checked={task.isChecked}
                            onChange={() => props.completeTask(task.id)}
                        />
                        <label htmlFor={task.id}>{task.name}</label>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.editBtn}
                        onClick={() => handleEdit()}
                    >
                        Edit
                    </button>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => props.deleteTask(task.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    } else {
        const handleSaveChanges = () => {
            if (!task.name) {
                errorElementRef.current!.innerText = 'error: Task name cannot be empty';
            } else {
                errorElementRef.current!.innerText = '';
                props.editTask(task);
                setIsEditing(false);
            }
        }
        return (
            <div className={styles.container}>
                <div>
                    <span ref={errorElementRef} className={styles.errorMsg}></span>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.checkbox}
                            type='checkbox'
                            id={task.id}
                            checked={task.isChecked}
                            onChange={() => setTask({ ...task, isChecked: !task.isChecked })}
                        />
                        <input type='text' value={task.name}
                            ref={taskNameInputRef}
                            className={styles.editTaskNameInput}
                            onKeyDownCapture={(e) => {
                                if (e.key === 'Enter') {
                                    handleSaveChanges();
                                } else if (e.key === 'Escape') {
                                    taskNameInputRef.current!.blur();
                                }
                            }}
                            onChange={(e) => {
                                const newName = e.target.value;
                                setTask({ ...task, name: newName });
                            }} />
                    </div>
                    <div className={styles.editPriorityGroup}>
                        <label className={styles.editPriorityLabel}>Priority</label> {' '}
                        <select value={task.priority}
                            onChange={(e) => {
                                const newPriority = e.target.value;
                                setTask(
                                    {
                                        ...task,
                                        priority: (newPriority === 'Low')
                                            ? 'Low'
                                            : (newPriority === 'Medium')
                                                ? 'Medium'
                                                : 'High'
                                    });
                            }}
                        >
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                        </select>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.saveBtn}
                        onClick={() => handleSaveChanges()}
                    >Save</button>
                </div>
            </div>
        );
    }
}
