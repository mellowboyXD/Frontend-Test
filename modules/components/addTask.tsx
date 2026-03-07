'use client'

import { useRef } from 'react';
import styles from '../styles/addTask.module.css'

import { Task } from '../types/usefulTypes';

interface AddTaskProps {
    tasks: Task[];
    setTasks: (newTaskList: Task[]) => void;
}

export default function AddTask(props: AddTaskProps) {
    const taskNameRef = useRef<HTMLInputElement>(null);
    const taskPriorityRef = useRef<HTMLSelectElement>(null)
    const errorMsgRef = useRef<HTMLSpanElement>(null);

    const createTask = () => {
        const name = taskNameRef.current?.value;
        const priority = taskPriorityRef.current?.value;
        if (!name || !priority) {
            errorMsgRef.current!.innerText = 'error: Task name cannot be empty!';
            return null;
        } else {
            errorMsgRef.current!.innerText = '';
        }

        // reset the inputs
        taskNameRef.current.value = '';
        taskPriorityRef.current.value = 'Low';

        const task: Task = {
            id: String(props.tasks.length),
            name: name,
            priority: (priority == 'Low') ? 'Low' : (priority == 'Medium') ? 'Medium' : 'High',
            timestamp: Date.now(),
            isChecked: false
        }

        return task;
    }

    const handleAddTask = () => {
        const newTask = createTask();
        if (newTask)
            props.setTasks([newTask, ...props.tasks]);
    }

    return (
        <div className={styles.container}>
            <span ref={errorMsgRef} className={styles.error}></span>
            <div className={styles.bottomGroup}>
                <div className={styles.inputGroup}>
                    <input
                        ref={taskNameRef}
                        type='text'
                        className={styles.taskInput}
                        placeholder='Type your task here...'
                        onKeyDownCapture={(e) => {
                            if (e.key === 'Enter') {
                                handleAddTask();
                            } else if (e.key === 'Escape') {
                                taskNameRef.current?.blur();
                            }
                        }}
                    />
                    <div className={styles.priorityInput}>
                        <label htmlFor='priority'>Priority</label> {' '}
                        <select id='priority' ref={taskPriorityRef}>
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                        </select>
                    </div>
                </div>
                <button
                    className={styles.btnPrimary}
                    type='button'
                    onClick={() => { handleAddTask() }}
                >
                    + Add
                </button>
            </div>
        </div>
    );
}
