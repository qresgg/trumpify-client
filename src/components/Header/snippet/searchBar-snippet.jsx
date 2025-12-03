import styles from './searchBar-snippet.module.scss'
import { debounce } from 'lodash'
import { searchData } from '../../../services/search.service'
import { RelocateFromSearchBar } from './relocate/relocateFromSearchBar'

import { useModal } from '../../../hooks/global/useModal'
import { useSelector } from 'react-redux'
import { useState, useCallback, Fragment } from 'react'

export function SearchBar() {
    const [querry, setQuerry] = useState('')
    const [results, setResults] = useState([])
    const modal = useModal();
    const { modalStateSearchMenu } = useSelector((state) => state.view.modal);

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
            <div className={styles.bar__container}>
                <input type="text" onChange={handleChange} value={querry} onFocus={() => modal.openModal('searchMenu')}/>
                {modalStateSearchMenu && Array.isArray(results) && results.length > 0 && (
                    <div className={styles.results}>
                         {results.map((result, index) => (
                             <Fragment key={index}>
                                 <RelocateFromSearchBar result={result} index={index}/>
                             </Fragment>
                         ))}
                    </div>
                )}
            </div>
        </div>
    )
}