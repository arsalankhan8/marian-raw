import React, { useState } from "react";

export default function ContactPageform() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  p-4 text-white mt-[30px]"
    >
      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border border-white bg-transparent text-[16px] md:text-[19px] 3xl:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[40px] 3xl:leading-[100px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      />

      {/* Phone */}
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone No"
        className="w-full border border-white bg-transparent text-[16px] md:text-[19px] 3xl:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[40px] 3xl:leading-[100px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full border border-white bg-transparent text-[16px] md:text-[19px] 3xl:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[40px] 3xl:leading-[100px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      />

      {/* Message */}
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        rows="3"
        className="w-full border border-white bg-transparent text-[16px] md:text-[25px] 3xl:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      ></textarea>

      {/* Consent Checkbox */}
      <div className="flex justify-between flex-wrap">
      <label className="flex items-start text-[12px] md:text-[14px] mb-4 cursor-pointer w-full md:w-[50%]">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mr-2 mt-1"
        />
        By clicking the check box, you consent to receive marketing and
        promotional SMS messages from Mariani Metal. Your information will be
        handled in accordance with our Privacy Policy.
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-10 md:px-16 font-unageo-semibold text-[16px] md:text-[18px] 3xl:text-[26px] py-2 border border-white text-white rounded-3xl hover:bg-white hover:text-cyan-700 transition"
      >
        Send
      </button>
      </div>
    </form>
  );
}
