'use client'

import { useEffect, useState } from 'react';
import styles from '../styles/filterButtons.module.css'
import { FilterOptions, Task } from '../utils/usefulTypes';

interface FilterProps {
    tasks: Task[];
    filter: FilterOptions;
    setFilter: (filter: FilterOptions) => void;
}

export default function FilterButtons(props: FilterProps) {
    const tasks = props.tasks.filter(t => t.isChecked == false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        /* component has successfully mounted on the client */
        setMounted(true);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <span
                    className={(props.filter === FilterOptions.ALL) ? styles.active : ''}
                    onClick={() => props.setFilter(FilterOptions.ALL)}
                >
                    All
                </span>
                <span className={styles.divider}>|</span>
                <span
                    className={(props.filter === FilterOptions.ACTIVE) ? styles.active : ''}
                    onClick={() => props.setFilter(FilterOptions.ACTIVE)}
                >
                    Active
                </span>
                <span className={styles.divider}>|</span>
                <span
                    className={(props.filter === FilterOptions.COMPLETED) ? styles.active : ''}
                    onClick={() => props.setFilter(FilterOptions.COMPLETED)}
                >
                    Completed
                </span>
            </div>
            <div>
                {mounted &&
                    <span className={styles.tasksRemaining}>
                        {(tasks.length < 2) ? `${tasks.length} task left` : `${tasks.length} tasks left`}
                    </span>
                }
            </div>
        </div>
    );
}
