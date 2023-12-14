import { createContext, useContext, useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import NewEntryForm from "../forms/NewEntryForm";
import NavBar from "../components/NavBar";
import AuthenticationForm from "../forms/AuthenticationForm";
import EditEntryForm from "../forms/EditEntryForm";
import NewUserForm from "../forms/NewUserForm";

//exporting userContext so we can use it in our other files
export const UserContext = createContext();

const JournalContainer = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); //changed from null coz wasn't rendering
  const [entryToEdit, setEntryToEdit] = useState(null);
  // const [authMode, setAuthMode] = useState('sign-in');

  const selectEntryToEdit = (entry) => {
    setEntryToEdit(entry);
  };

  const postNewAccount = async (user) => {
    try {
      const response = await fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.status === 201) {
        const postedUser = await response.json();
        setCurrentUser(postedUser);
      } else {
        console.error("Failed create new entry. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error posting new user:", error);
    }
  };
  
  //second attempt at deleteAccount

  const handleDeleteAccount = async (id) => {
    if (currentUser === null) {
      alert('Not signed in!');
      return;
    }
  
    // Get the current user's ID
    const userId = currentUser.id;
  
    // Send a DELETE request to the /users/{id} endpoint
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        alert('Account deleted successfully!');
        currentUser = null;
      } else {
        console.error('Failed to delete account. Status code:', response.status);
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
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
      console.log("Grabbed user by username: ", data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchUserByUserDTO = async (user) => {
    const response = await fetch(`http://localhost:8080/users/sign-in`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.status === 200) {
      const data = await response.json();
      setCurrentUser(data);
      fetchAllEntriesByUserId(data.id);
      alert(`Welcome ${data.name}`);
      console.log(data);
    } else {
      console.error("Invalid user details:", response.status);
      alert("Invalid user details");
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
      const response = await fetch(
        `http://localhost:8080/journal-entries/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        }
      );

      if (response.status === 201) {
        const postedEntry = await response.json();
        setJournalEntries([...journalEntries, postedEntry]);
      } else {
        console.error(
          "Failed to post new entry. Status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error posting new entry:", error);
    }
  };

  const patchEntryById = async (entry) => {
    const entryDTO = {
      content: entry.content,
      weekDay: entry.weekDay,
      moodRating: entry.moodRating,
    };

    const response = await fetch(
      `http://localhost:8080/journal-entries/${entry.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryDTO),
      }
    );

    const entryIndex = journalEntries.indexOf(entry); // find the index of the entry to be replaced
    const updatedJournalEntries = journalEntries;     // make a copy
    updatedJournalEntries.splice(entryIndex, 1, entry); //We remove one entry at the index and replace it with entry
    setJournalEntries(updatedJournalEntries);
  };

  const deleteEntryById = async (entryId) => {
    const response = await fetch(
      `http://localhost:8080/journal-entries/${entryId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    setJournalEntries(journalEntries.filter((entry) => entry.id !== entryId));
  };

  const journalEntryRoutes = createBrowserRouter([
    {
      path: "/",
      element:
        <NavBar setJournalEntries = {setJournalEntries} setCurrentUser={setCurrentUser} handleDeleteAccount={handleDeleteAccount}/>,
      children: [
        {
          path: "/entries",
          element: <JournalList journalEntries={journalEntries} deleteEntryById={deleteEntryById} selectEntryToEdit={selectEntryToEdit}/>,
        },

        {
          path: "/entries/new",
          element: <NewEntryForm submitForm={postNewEntry} currentUser= {currentUser}/>,
        },
        {
          path: "/entries/:id/edit",
          element: <EditEntryForm submitForm={patchEntryById} entryToEdit={entryToEdit} currentUser={currentUser}/>,
        },
        {
          path: "/sign-in",
          element: <AuthenticationForm submitForm={fetchUserByUserDTO} currentUser={currentUser}/>
        },
        {
          path: "/users/new",
          element: <NewUserForm submitForm={postNewAccount} />,
        },
        {
          path: "/",
          element: <Home />
        }
      ],
    },
  ]);

  return (
    <>
      <div className="main-container">
        <h1 id="main-title">Gratitude Journal</h1>
        <div className="intro-section">
          <p>
            A warm welcome from the Positivity Pathfinders, where it's our
            mission to map the route to a grateful life! This is a space for you
            to express your thoughts, feelings, and experiences. Use the sidebar
            to navigate through different sections and manage your journal
            entries.
          </p>
        </div>
        <UserContext.Provider value={{ currentUser: currentUser || {} }}>
          <RouterProvider router={journalEntryRoutes} />
        </UserContext.Provider>
      </div>
    </>
  );
};

export default JournalContainer;
