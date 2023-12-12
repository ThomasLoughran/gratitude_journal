const JournalEntry = ({ oneEntry, patchEntryById }) => {

    const handleEdit = (oneEntry) => {
        patchEntryById(oneEntry);
    }

    return (
        <article>
            <p>Day of the Week: {oneEntry.weekDay}</p>
            <p>{oneEntry.content}</p>
            <p>How I feel: {oneEntry.moodRating}</p>
            <button onClick={handleEdit}>Edit</button>
        </article>
    );
}

export default JournalEntry;