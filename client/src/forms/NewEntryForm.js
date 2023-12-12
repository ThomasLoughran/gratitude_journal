import { useState } from "react";

const NewEntryForm = ({ postNewEntry }) => {

    const [newEntry, setNewEntry] = useState(
        {
            content: "",
            weekDay: "",
            moodRating: "",
        }
    );

    const handleFormSubmit = (event) => {
        event.preventDefault();
        postNewEntry(newEntry, 2); // remove dis line in d future
        setNewEntry(
            {
                content: "",
                weekDay: "",
                moodRating: "",
            }
        );
        console.log("Journal entry posted successfully!");
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEntry((prevEntry) => ({
          ...prevEntry,
          [name]: name === "moodRating" ? value.toUpperCase() : value,
        }));
      };

    return (
        <>
         <form id="new-journal-entry" onSubmit={handleFormSubmit}>
      <label>
        Content:
        <textarea
          name="content"
          value={newEntry.content}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Weekday:
        <input
          type="text"
          name="weekDay"
          value={newEntry.weekDay}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Mood Rating:
        <input
          type="text"
          name="moodRating"
          value={newEntry.moodRating}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
        </>
    );
}

export default NewEntryForm;