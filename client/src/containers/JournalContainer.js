import { createContext, useContext, useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import NewEntryForm from "../forms/NewEntryForm";

//exporting userContext so we can use it in our other files
const UserContext = createContext();

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
      // console.log(data);
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

  const patchEntryById = async (entry) => {

    const entryDTO = {
      content: entry.content,
      weekDay: entry.weekDay,
      moodRating: entry.moodRating
    }

    const response = await fetch(`http://localhost:8080/journal-entries/${entry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entryDTO)
    });

    const entryIndex = journalEntries.indexOf(entry);
    const updatedJournalEntries = journalEntries;
    updatedJournalEntries.splice(entryIndex, 1, entry);
    setJournalEntries(updatedJournalEntries);
  };

  useEffect(() => {
    fetchUserById(1);
    fetchAllEntriesByUserId(2);
  }, []);

  const journalEntryRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/entries",
          element: <JournalList
            journalEntries={journalEntries}
            patchEntryById={patchEntryById} />,
        children: [
            {
                path: "edit/:id",
                element: <NewEntryForm submitForm={patchEntryById} />,
            }
        ]
        },

        {
          path: "/entries/new",
          element: <NewEntryForm submitForm={postNewEntry} />,
        },
      ],
    },
  ]);

  return (
    <>
      <h1>Gratitude Journal</h1>
      <UserContext.Provider value={{ user: currentUser }}>
        <RouterProvider router={journalEntryRoutes} />
      </UserContext.Provider>
    </>
  );
};

export default JournalContainer;
