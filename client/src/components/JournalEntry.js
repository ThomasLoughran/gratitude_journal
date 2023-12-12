import { useContext } from 'react';
import {UserContext} from '../containers/JournalContainer'

const JournalEntry = ({ oneEntry, deleteEntryById}) => {

    const {currentUser} = useContext(UserContext);

    const handleDeleteButton = () => {
        deleteEntryById(oneEntry.id, currentUser.id);
    }

    return (
        <article>
            <p>Day of the Week: {oneEntry.weekDay}</p>
            <p>{oneEntry.content}</p>
            <p>How I feel: {oneEntry.moodRating}</p>
            <button onClick={handleDeleteButton}>Delete</button>
        </article>
    );
}

export default JournalEntry;