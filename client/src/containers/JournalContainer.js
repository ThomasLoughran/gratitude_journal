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
      console.log(data);
    } catch (error) {
      console.error("help", error);
    }
  };
  useEffect(() => {
    fetchUserById(1);
  }, []);
  return (
    <>
      <h1>Gratitude Journal</h1>
      <JournalList journals={journalEntries} />
    </>
  );
};

export default JournalContainer;
