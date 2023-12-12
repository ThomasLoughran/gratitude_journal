import { Link, Outlet } from "react-router-dom";

const JournalEntry = ({ oneEntry, patchEntryById }) => {
    
    const handleEdit = () => {
        patchEntryById(oneEntry);
    }

    return (
        <article>
            <p>Day of the Week: {oneEntry.weekDay}</p>
            <p>{oneEntry.content}</p>
            <p>How I feel: {oneEntry.moodRating}</p>
            <button><Link to= {`/entries/edit/${oneEntry.id}`} state={{oneEntry} }>Edit</Link></button>
            <Outlet />
        </article>
    );
}

export default JournalEntry;