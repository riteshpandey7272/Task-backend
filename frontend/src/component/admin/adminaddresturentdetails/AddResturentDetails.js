import React, { useState } from "react";
import axios from "axios";
import "./AddResturentDetails.css";
import { useNavigate } from "react-router-dom"; 

const AddResturentDetails = () => {
  const storedData = localStorage.getItem("user");
  const userObject = JSON.parse(storedData);
  const userId = userObject.Userid;
  const navigate = useNavigate();
  console.log(userId);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resturentName: "",
    resturentContact: "",
    resturentEmailid: "", // Change to resturentEmailid
    resturentAddress: "",
    numberOfTables: "",
    ownerName: "",
    ownerContact: "",
    ownerAlternateContact: "",
    ownerEmail: ""
  });
  

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const { resturentContact, ownerContact, ownerAlternateContact } = formData;

    if (!/^\d{10}$/.test(resturentContact)) {
      errors.resturentContact = "Resturent Contact must be exactly 10 digits.";
    }
    if (!/^\d{10}$/.test(ownerContact)) {
      errors.ownerContact = "Owner Contact must be exactly 10 digits.";
    }
    if (!/^\d{10}$/.test(ownerAlternateContact)) {
      errors.ownerAlternateContact = "Owner Alternate Contact must be exactly 10 digits.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/addResturent", {
        Userid: userId,
        ...formData
      });

      setFormData({
        resturentName: "",
        resturentContact: "",
        resturentEmail: "",
        resturentAddress: "",
        numberOfTables: "",
        ownerName: "",
        ownerContact: "",
        ownerAlternateContact: "",
        ownerEmail: ""
      });
      setMessage("Resturent added successfully!");

      setTimeout(() => setMessage(""), 3000);
      navigate('/welcome');
    } catch (error) {
      console.error("Error in submitting form:", error);
      setMessage("Failed to add resturent. Please try again.");
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="resturentcontainer">
      <div className="resturentcard">
        <form onSubmit={handleSubmit}>
          <h2>Add Resturent Details</h2>

          {step === 1 && (
            <>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="text"
                  name="resturentName"
                  value={formData.resturentName}
                  onChange={handleInputChange}
                  required
                />
                <label>Resturent Name</label>
              </div>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="text"
                  name="resturentContact"
                  value={formData.resturentContact}
                  onChange={handleInputChange}
                  pattern="\d{10}"
                  title="Resturent Contact must be exactly 10 digits."
                  maxLength="10"
                  required
                />
                <label>Resturent Contact</label>
                {errors.resturentContact && <span className="error-message">{errors.resturentContact}</span>}
              </div>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="email"
                  name="resturentEmail"
                  value={formData.resturentEmail}
                  onChange={handleInputChange}
                  required
                />
                <label>Resturent Email</label>
              </div>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="text"
                  name="resturentAddress"
                  value={formData.resturentAddress}
                  onChange={handleInputChange}
                  required
                />
                <label>Resturent Address</label>
              </div>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="text"
                  name="numberOfTables"
                  value={formData.numberOfTables}
                  onChange={handleInputChange}
                  required
                />
                <label>Number Of Tables</label>
              </div>
              <div className="next-button">
                <button className = "Button" type="button" onClick={handleNext}>
                    Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  required
                />
                <label>Owner Name</label>
              </div>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="text"
                  name="ownerContact"
                  value={formData.ownerContact}
                  onChange={handleInputChange}
                  pattern="\d{10}"
                  title="Owner Contact must be exactly 10 digits."
                  maxLength="10"
                  required
                />
                <label>Owner Contact</label>
                {errors.ownerContact && <span className="error-message">{errors.ownerContact}</span>}
              </div>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="text"
                  name="ownerAlternateContact"
                  value={formData.ownerAlternateContact}
                  onChange={handleInputChange}
                  pattern="\d{10}"
                  title="Owner Alternate Contact must be exactly 10 digits."
                  maxLength="10"
                  required
                />
                <label>Owner Alternate Contact</label>
                {errors.ownerAlternateContact && <span className="error-message">{errors.ownerAlternateContact}</span>}
              </div>
              <div className="input-group">
                <input
                  className="restro-input"
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  required
                />
                <label>Owner Email</label>
              </div>
              <div className="submit-button">
                <button className = "Button" type="button" onClick={handleBack}>
                    Back
                </button>
                <button className = "Button" type="submit">Submit</button>
              </div>
            </>
          )}

          {message && (
            <div className="popup-message">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddResturentDetails;
