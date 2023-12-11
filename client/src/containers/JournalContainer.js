import { useState, useEffect } from "react";
import JournalList from "../components/JournalList";

const JournalContainer = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); //come back to edit after Anna

  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`);
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error("help", error);
    }
  };

  const fetchAllEntriesByUserId = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/journal-entries/${id}/all`);
      const data = await response.json();
      setJournalEntries(data);
      console.log("get all response",data)
    } catch (error){
      console.error("error fetching entries", error);
    }
  }

  const postNewEntry = async (newEntry, userId) => {
    const response = await fetch(`http://localhost:8080/journal-entries/${userId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newEntry)
    });
    console.log("post mapping journal entries", journalEntries);
    setJournalEntries([...journalEntries, newEntry]);
  }

  const newPostObject = {
    content: "This is a test",
    weekDay: "FRIDAY",
    moodRating: "REALLYGOOD"
  }


  useEffect(() => {
    fetchUserById(1);
    fetchAllEntriesByUserId(2);
    postNewEntry(newPostObject, 2);

  }, []);
  return (
    <>
      <h1>Gratitude Journal</h1>
      <JournalList journals={journalEntries} />
    </>
  );
};

export default JournalContainer;
