import React, { useState } from "react";
import backgroundImg from "../../assets/vectors/Contact Us Image.png";
import styled from "styled-components";
import ContactUsRequest from "services/Requests/ContactUs"; // Import contact service
import Toaster from "../../components/Toaster/Toaster"; // Import Toaster component

// Styled component for input field without shadow
const InputField = styled.input`
  padding: 8px 12px; /* Adjust padding as needed */
  border: 1px solid #ccc; /* Add border for better visibility */
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #3182ce; /* Example focus color */
  }
`;

const TextAreaField = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  height: 100px;
  resize: vertical;
  &:focus {
    border-color: #3182ce;
  }
`;

function ContactField({ label, id, type, value, onChange }) {
  return (
    <div className="flex flex-col justify-center mt-4">
      <label className="mb-2 text-gray-700 font-bold" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <TextAreaField
          id={id}
          placeholder={label}
          aria-label={label}
          value={value}
          onChange={onChange}
        />
      ) : (
        <InputField
          id={id}
          type={type}
          placeholder={label}
          aria-label={label}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send contact form data to the API
      await ContactUsRequest.addAContactUs(formData);

      // Show success message
      setToasterMessage("Your message has been sent successfully!");
      setToasterType("success");
      setShowToaster(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.error("Error submitting contact form:", error);
      setToasterMessage("Failed to send message. Please try again.");
      setToasterType("error");
      setShowToaster(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section>
        {/* Background image */}
        <div
          id="contact"
          className="relative flex justify-center items-center h-full z-10"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <section className="px-[150px] py-5 bg-white bg-opacity-90 rounded-[40px] max-md:px-5 mt-[100px]">
            <div className="flex gap-20  lg:flex-row max-md:flex-col max-md:gap-0 flex-col">
              {/* Form section */}
              <div className="w-full lg:w-1/2">
                <header className="flex flex-col lg:flex-row-reverse mt-20 max-md:mt-10 max-md:max-w-full">
                  <h1 className="text-4xl font-semibold tracking-wide leading-6 max-md:max-w-full">
                    Get in <span className="text-yellow-400">touch</span>
                  </h1>
                </header>
                <p className="flex flex-col justify-center mt-11 text-sm tracking-normal leading-6 text-black max-md:mt-10 max-md:max-w-full">
                  Have questions or feedback? Reach out to us and we'll get back to you as soon as possible.
                </p>
                <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
                  <ContactField
                    label="Contact Name"
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <ContactField
                    label="E-mail"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <ContactField
                    label="Your Message"
                    id="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex justify-center items-center px-6 py-3 mt-6 text-sm font-bold text-white uppercase rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-SurasaYellow"
                      }`}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
              </div>

              {/* Image section */}
              <div className="w-full lg:w-1/2">
                <img
                  src={backgroundImg}
                  alt="Contact Us Image"
                  className="w-full"
                />
              </div>
            </div>

            {/* Map section */}
            <div className="relative mt-10 h-96 max-md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d882.5517247125711!2d80.78660499175767!3d6.705657787771506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae38af5553d5aa7%3A0x8f0647dbd6e5cf54!2sFaculty%20of%20Agricultural%20Sciences!5e0!3m2!1sen!2slk!4v1718021824342!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full rounded-[40px]"
              ></iframe>
            </div>
          </section>
          {/* Toaster for notifications */}
          {showToaster && (
            <Toaster
              message={toasterMessage}
              type={toasterType}
              onClose={() => setShowToaster(false)}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999
              }}
            />
          )}
        </div>


      </section>
    </>
  );
};

export default Contact;