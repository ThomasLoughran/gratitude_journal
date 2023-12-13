import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const EditEntryForm = ({ submitForm, entryToEdit }) => {

  // const location = useLocation();
  // const oneEntry = location.state;
  // console.log(oneEntry);

  const {id} = useParams();
  console.log(id);
  
    const [newEntry, setNewEntry] = useState(
        {
            id: "",
            content: "",
            weekDay: "",
            moodRating: "",
        }
    );

    useEffect(() => {
      if (entryToEdit && entryToEdit.id == id){
        setNewEntry(entryToEdit);
      }
    }, [entryToEdit])

    const handleFormSubmit = (event) => {
        event.preventDefault();
        submitForm(newEntry, 2); // remove dis line in d future
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

      if(entryToEdit && entryToEdit.id == id){
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
      } else {
        return null;
      }

    
}

export default EditEntryForm;