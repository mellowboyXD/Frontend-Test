'use client'
import { useState } from 'react';

import AddTask from './components/addTask';
import FilterButtons from './components/filterButtons';
import TaskList from './components/taskList';

import styles from './styles/test.module.css';
import { FilterOptions, Task } from './utils/usefulTypes';
import useLocalStorage from './utils/useLocalStorage';
import SearchBar from './components/searchBar';

// Your Test Starts Here
// Ok
export default function TaskManager(): JSX.Element {
    const [tasks, setTasks] = useLocalStorage('tasks', new Array<Task>());
    const [filter, setFilter] = useState(FilterOptions.ALL);
    const [searchTerm, setSearchTerm] = useState('');

    const filterByStatus = (tasks: Task[], filter: FilterOptions) => {
        switch (filter) {
            case FilterOptions.ALL:
                return tasks;
            case FilterOptions.ACTIVE:
                return tasks.filter(task => !task.isChecked);
            case FilterOptions.COMPLETED:
                return tasks.filter(task => task.isChecked);
        }
    };

    const filterBySearchTerm = (tasks: Task[], searchTerm: string) => {
        return (!searchTerm) ? tasks : tasks.filter(task => task.name.includes(searchTerm.trim()));
    }

    return (
        <div className={styles.container}>
            <h1>Task Management</h1>
            <div className={styles.content}>
                <AddTask tasks={tasks} setTasks={setTasks} />
                <FilterButtons tasks={tasks} filter={filter} setFilter={setFilter} />
                <SearchBar setSearchTerm={setSearchTerm} />
                <TaskList tasks={filterBySearchTerm(filterByStatus(tasks, filter), searchTerm)}
                    setTasks={setTasks} />
            </div>
        </div>
    );
};
