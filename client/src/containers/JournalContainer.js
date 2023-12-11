import { useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import NewEntryForm from "../forms/NewEntryForm";

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
      const response = await fetch(
        `http://localhost:8080/journal-entries/${id}/all`
      );
      const data = await response.json();
      setJournalEntries(data);
    } catch (error) {
      console.error("error fetching entries", error);
    }
  };

  const postNewEntry = async (newEntry, userId) => {
    await fetch(`http://localhost:8080/journal-entries/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      }
    );
    setJournalEntries([...journalEntries, newEntry]);
  };

  const newPostObject = {
    content: "This is a test",
    weekDay: "FRIDAY",
    moodRating: "REALLYGOOD",
  };

  useEffect(() => {
    fetchUserById(1);
    fetchAllEntriesByUserId(2);
    postNewEntry(newPostObject, 2);
  }, []);

  const journalEntryRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/entries",
          element: <JournalList journalEntries={journalEntries} />,
        },

        {
          path: "/entries/new",
          element: <NewEntryForm postNewEntry={postNewEntry} />,
        },
      ],
    },
  ]);

  return (
    <>
      <h1>Gratitude Journal</h1>
      <RouterProvider router={journalEntryRoutes} />
    </>
  );
};

export default JournalContainer;
