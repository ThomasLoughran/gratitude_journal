import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const EditEntryForm = ({ submitForm, entryToEdit, currentUser }) => {

  const { id } = useParams();

  const [newEntry, setNewEntry] = useState(
    {
      id: "",
      content: "",
      weekDay: "",
      moodRating: "",
    }
  );

  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const weekdayOptions = weekdays.map((weekday) => {
    return <option value={weekday}>{weekday}</option>
  })

  const moods = ['REALLYBAD', 'NEGATIVE', 'INDIFFERENT', 'POSITIVE', 'REALLYGOOD'];
  const moodOptions = moods.map((mood) => {
    return <option value={mood}>{mood}</option>
  })

  useEffect(() => {
    if (entryToEdit && entryToEdit.id == id) {
      setNewEntry(entryToEdit);
    }
  }, [entryToEdit])


  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newEntry.content === "" || newEntry.moodRating === "" || newEntry.weekDay === "") {
      return alert("Incomplete form")
    } else {
      submitForm(newEntry, currentUser.id);
      setNewEntry(
        {
          content: "",
          weekDay: "",
          moodRating: "",
        }
      );
      console.log("Journal entry posted successfully!");
    }
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: name === "moodRating" ? value.toUpperCase() : value,
    }));
  };

  if (entryToEdit && entryToEdit.id === id) {
    return (

      <form id="new-journal-entry" onSubmit={handleFormSubmit}>
        <label>
          Content:
          <textarea
            className="input-box"
            name="content"
            value={newEntry.content}
            onChange={handleInputChange}
          />
        </label>
        <label>Mood</label>
        <select
          name="moodRating"
          onChange={handleInputChange}
        >
          <option disabled value="select-mood">Mood</option>
          {moodOptions}
        </select>
        <label>Weekday</label>
        <select
          name="weekDay"
          onChange={handleInputChange}
        >
          <option disabled value="select-weekday">Weekday</option>
          {weekdayOptions}
        </select>
        <button type="submit">Submit</button>
      </form>

    );
  } else {
    return null;
  }
  
}

export default EditEntryForm;