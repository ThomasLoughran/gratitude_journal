import JournalEntry from './JournalEntry';


const JournalList = ({ journalEntries, patchEntryById, deleteEntryById, selectEntryToEdit }) => {

    const mappedEntries = journalEntries.map((oneEntry) => {
        return <JournalEntry
            key={oneEntry.id}
            oneEntry={oneEntry}
            patchEntryById={patchEntryById}
            deleteEntryById={deleteEntryById}
            selectEntryToEdit={selectEntryToEdit}
        />

    })

    return (
        <>
            <h2>My Posts</h2>
            {mappedEntries}
        </>
    );
}

export default JournalList;