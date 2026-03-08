import { useRef } from 'react';

import styles from '../styles/searchBar.module.css'

interface SearchBarProps {
    setSearchTerm: (searchTerm: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.container}>
            <input
                ref={searchInputRef}
                className={styles.searchBar}
                type='text'
                placeholder='Search for task...'
                onKeyDownCapture={(e) => {
                    if (e.key === 'Escape')
                        searchInputRef.current?.blur();
                }}
                onChange={() => {
                    const searchTerm = searchInputRef.current?.value;
                    if (searchTerm !== undefined)
                        props.setSearchTerm(searchTerm);
                }}
            />
            <button
                className={styles.clearBtn}
                onClick={() => {
                    props.setSearchTerm('');
                    searchInputRef.current!.value = '';
                }}
            >Clear</button>
        </div>
    );
}
