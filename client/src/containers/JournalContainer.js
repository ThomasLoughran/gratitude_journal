import { createContext, useContext, useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import NewEntryForm from "../forms/NewEntryForm";
import NavBar from "../components/NavBar";

//exporting userContext so we can use it in our other files
export const UserContext = createContext();

const JournalContainer = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

   // Set user function
   const setUser = (user) => {
    setCurrentUser(user);
  };

    const fetchUserById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`);
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user:", error);
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
    try {
      const response = await fetch(`http://localhost:8080/journal-entries/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (response.status === 201) {
        const postedEntry = await response.json();
        setJournalEntries([...journalEntries, postedEntry]);
      } else {
        console.error("Failed to post new entry. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error posting new entry:", error);
    }

  };

  const deleteEntryById = async (entryId) => {
    const response = await fetch(
      `http://localhost:8080/journal-entries/${entryId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    );
      setJournalEntries(journalEntries.filter((entry) => entry.id !== entryId));
  };

//   const newPostObject = {
//     content: "This is a test",
//     weekDay: "FRIDAY",
//     moodRating: "REALLYGOOD",
//   };

  useEffect(() => {
    fetchUserById(1);
    fetchAllEntriesByUserId(2);
    // postNewEntry(newPostObject, 2);
  }, []);

  const journalEntryRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/entries",
          element: <JournalList journalEntries={journalEntries} deleteEntryById={deleteEntryById} />,
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
    <NavBar />
      <h1>Gratitude Journal</h1>
      <UserContext.Provider value={{ currentUser: currentUser || {} }}>
    <RouterProvider router={journalEntryRoutes} />
    </UserContext.Provider>
    </>
  );
};

export default JournalContainer;

