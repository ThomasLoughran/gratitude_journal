import JournalEntry from './JournalEntry';

const JournalList = ({ journalEntries, deleteEntryById }) => {

    const mappedEntries = journalEntries.map((oneEntry) => {
        return <JournalEntry key={oneEntry.id} oneEntry={oneEntry} deleteEntryById={deleteEntryById} />
    })
    return (
        <>
            <h2>My Posts</h2>
            {mappedEntries}
        </>
    );
}

export default JournalList;