const JournalEntry = ({oneEntry}) => {
    return ( 
        <article>
            <p>Day of the Week: {oneEntry.weekDay}</p>
            <p>{oneEntry.content}</p>
            <p>How I feel:{oneEntry.moodRating}</p>
        </article>
     );
}
 
export default JournalEntry;