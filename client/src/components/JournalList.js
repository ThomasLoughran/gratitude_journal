import JournalEntry from './JournalEntry';

const JournalList = ({journalEntries}) => {

    const mappedEntries = journalEntries.map((oneEntry) => {
        return <JournalEntry key={oneEntry.id} oneEntry={oneEntry} />
    })
    return ( 
        <>
        <h2>My Posts</h2>
        {mappedEntries}
        </>
     );
}
 
export default JournalList;