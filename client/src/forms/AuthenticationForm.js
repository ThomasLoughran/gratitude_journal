import React, { useState } from 'react';

const AuthenticationForm = ({ submitForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
  };

  return (
    <>
      <div>
        <h2>Sign In</h2>
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
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default AuthenticationForm;
