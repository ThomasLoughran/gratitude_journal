import React, { useState } from 'react';

const AuthenticationForm = ({ onSignIn, onCreateAccount, userId}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

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
      onCreateAccount(formData.name, formData.email);
    } else {
      onSignIn(formData.name, formData.email);
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
              name="email"
              value={formData.email}
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
