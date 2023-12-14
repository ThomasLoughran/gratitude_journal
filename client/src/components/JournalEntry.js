import { Link, Outlet } from "react-router-dom";

const JournalEntry = ({ oneEntry, deleteEntryById, selectEntryToEdit}) => {

    const handleDeleteButton = () => {
        deleteEntryById(oneEntry.id);
    }
    const handleEdit = () => {
        selectEntryToEdit(oneEntry);
    }

    return (
        <article>
            <p>Day of the Week: {oneEntry.weekDay}</p>
            <p>{oneEntry.content}</p>
            <p>How I feel: {oneEntry.moodRating}</p>
            <button onClick={handleEdit}><Link to= {`/entries/${oneEntry.id}/edit`} state={{oneEntry} }>Edit</Link></button>
            <button onClick={handleDeleteButton}>Delete</button>
            <Outlet />
        </article>
    );
}

export default JournalEntry;