import { useState, useCallback } from 'react'
import styles from './searchBar-snippet.module.scss'
import { debounce } from 'lodash'
import { searchData } from '../../../services/userService'
import { RelocateFromSearchBar } from './relocate/relocateFromSearchBar'

export function SearchBar({
    searchBarState,
    menuState
}) {
    const [querry, setQuerry] = useState('')
    const [results, setResults] = useState([])

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            if (value.trim() !== '') {
                try {
                    const data = await searchData(value);
                    setResults(data);
                } catch(error) {
                    console.error('error fetching search results:', error)
                }
            } else {
                setResults([]);
            }
        }, 300), []
    )
    
    const handleChange = (e) => {
        const value = e.target.value;
        setQuerry(value);
        debouncedSearch(value);
    }

    return (
        <div className={styles.bar}>
            <div className={styles.bar__container} onFocus={searchBarState}>
                <input type="text" onChange={handleChange} value={querry}/>
                {menuState && <div className={styles.results}>
                    <p>Results: </p>
                    {Array.isArray(results) && results.length > 0 ? (
                    results.map((result, index) => (
                        <RelocateFromSearchBar result={result} index={index}/>
                    ))
                    ) : (
                    <li>No results available</li>
                    )}
                </div>}
            </div>
        </div>
    )
}