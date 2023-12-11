import { useState, useEffect } from "react";
import JournalList from "../components/JournalList";

const JournalContainer = () => {

    const [journalEntries, setJournalEntries] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); //come back to edit after Anna
    
    return ( 
        <>
        <h1>Gratitude Journal</h1>
         <JournalList journals={journalEntries}/>
        </>

     );
}
 
export default JournalContainer;