import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../containers/JournalContainer';

      

const AuthenticationForm = ({ onSignIn, onCreateAccount, fetchAllEntriesByUserId}) => {
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
  });
  const {currentUser} = useContext(UserContext);
  const [isCreateAccount, setIsCreateAccount] = useState(false); //need to pass down as prop

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreateAccount) {
      onCreateAccount(formData.name, formData.emailAddress);
    } else {
      onSignIn(formData);
    }
  };

  return (
    <>
      <div>
        <h2>{isCreateAccount ? 'Create Account' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </label>
          <button type="submit">{isCreateAccount ? 'Create Account' : 'Sign In'}</button>
        </form>
      </div>
    </>
  );
};

export default AuthenticationForm;
