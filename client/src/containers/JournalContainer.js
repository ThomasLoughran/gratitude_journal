import { createContext, useContext, useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import NewEntryForm from "../forms/NewEntryForm";
import NavBar from "../components/NavBar";
import AuthenticationForm from "../forms/AuthenticationForm";
import EditEntryForm from "../forms/EditEntryForm";

//exporting userContext so we can use it in our other files
export const UserContext = createContext();

const JournalContainer = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState({}); //changed from null coz wasn't rendering
  const [entryToEdit, setEntryToEdit] = useState(null);
  // const [authMode, setAuthMode] = useState('sign-in');

  const selectEntryToEdit = (entry) => {
    setEntryToEdit(entry);
  }

//   const handleSignIn = async (name, email) => {
//     try {
//       console.log('Signing in:', { name, email });
//     } catch (error) {
//       console.error('Error signing in:', error.message);
//     }
//   };

  const handleCreateAccount = async (name, email) => {
    try {
      // Implement create account logic
      console.log('Creating account:', { name, email });
    } catch (error) {
      console.error('Error creating account:', error.message);
    }
  };

  // Set user function
  const setUser = (user) => {
    setCurrentUser(user);
  };

  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`);
      const data = await response.json();
      setUser(data);
      fetchAllEntriesByUserId(data.id);
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
      console.log(data);
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

  // useEffect(() => {
  //   fetchUserById(2);
  //   fetchAllEntriesByUserId(2);
  // }, []);


  const journalEntryRoutes = createBrowserRouter([
    {
      path: "/",
      element: <>
        <NavBar />
        <Home />
      </>,
      children: [
        {
          path: "/entries",
          element: <JournalList journalEntries={journalEntries} deleteEntryById={deleteEntryById} selectEntryToEdit={selectEntryToEdit}/>,
        },

        {
          path: "/entries/new",
          element: <NewEntryForm submitForm={postNewEntry} />,
        },
        {
          path: "/entries/:id/edit",
          element: <EditEntryForm submitForm={patchEntryById} entryToEdit={entryToEdit}/>,
        },
        {
          path: "/sign-in",
          element: <AuthenticationForm authMode='sign-in' onSignIn={fetchUserById} fetchAllEntriesByUserId={fetchAllEntriesByUserId}/>
        },
        
      ],
    },
  ]);

  return (
    <>
      <h1>Gratitude Journal</h1>
      <UserContext.Provider value={{ currentUser: currentUser || {} }}>
        <RouterProvider router={journalEntryRoutes} />
      </UserContext.Provider>
    </>
  );
};

export default JournalContainer;

