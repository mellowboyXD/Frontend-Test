'use client'
import { useState } from 'react';

import AddTask from './components/addTask';
import FilterButtons from './components/filterButtons';
import TaskList from './components/taskList';

import styles from './styles/test.module.css';
import { FilterOptions, Task } from './types/usefulTypes';

// Your Test Starts Here
// Ok
export default function TaskManager(): JSX.Element {
    const [tasks, setTasks] = useState(new Array<Task>());
    const [filter, setFilter] = useState(FilterOptions.ALL);

    return (
        <div className={styles.container}>
            <h1>Task Management</h1>
            <div className={styles.content}>
                <AddTask tasks={tasks} setTasks={setTasks} />
                <FilterButtons tasks={tasks} filter={filter} setFilter={setFilter} />
                <TaskList tasks={
                    (filter == FilterOptions.ALL)
                        ? tasks
                        : (filter == FilterOptions.ACTIVE)
                            ? tasks.filter(task => task.isChecked == false)
                            : tasks.filter(task => task.isChecked == true)}
                    setTasks={setTasks} />
            </div>
        </div>
    );
};
