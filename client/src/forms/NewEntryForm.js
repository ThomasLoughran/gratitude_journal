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
    }

    return (
        <>

        </>
    );
}

export default NewEntryForm;