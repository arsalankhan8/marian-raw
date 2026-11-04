import React, { useState } from "react";
import TurnstileWidget from "../../../Pages/Careerpage/TurnstileWidget";
import {
  hasTurnstileToken,
  resetTurnstileWidget,
} from "../../../Pages/Careerpage/turnstile";
import {
  contactFormEndpoint,
  isSecureFormEndpointConfigured,
  submitSecureForm,
} from "../../../utils/secureForms";

export default function ContactPageform() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const payload = new FormData(form);
    setFormStatus({ type: "", message: "" });

    if (!isSecureFormEndpointConfigured(contactFormEndpoint)) {
      setFormStatus({
        type: "error",
        message: "The secure contact service is temporarily unavailable.",
      });
      return;
    }

    if (!hasTurnstileToken(payload)) {
      setFormStatus({
        type: "error",
        message: "Please complete the security verification.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await submitSecureForm(contactFormEndpoint, payload);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
        consent: false,
      });
      setFormStatus({
        type: "success",
        message: "Thank you. Your message has been sent.",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your message. Please try again.",
      });
    } finally {
      resetTurnstileWidget(form);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      action={contactFormEndpoint || undefined}
      method="POST"
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
        className="w-full border border-white bg-transparent text-[16px] md:text-[19px] 4k:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[40px] 4k:leading-[100px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      />

      {/* Phone */}
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone No"
        className="w-full border border-white bg-transparent text-[16px] md:text-[19px] 4k:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[40px] 4k:leading-[100px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full border border-white bg-transparent text-[16px] md:text-[19px] 4k:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] leading-[30px] md:leading-[30px] lg:leading-[40px] xl:leading-[40px] 4k:leading-[100px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      />

      {/* Message */}
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        rows="3"
        className="w-full border border-white bg-transparent text-[16px] md:text-[25px] 4k:text-[30px] px-2 py-0.5 md:px-4 md:py-3 mb-[25px] rounded-none focus:outline-none focus:border-cyan-400"
        required
      ></textarea>

      {/* Consent Checkbox */}
      <div className="flex justify-between flex-wrap">
      <label className="flex items-start text-[12px] md:text-[14px] mb-4 cursor-pointer w-full md:w-[50%]">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          checked={formData.consent}
          onChange={handleChange}
          className="mr-2 mt-1"
        />
        By clicking the check box, you consent to receive marketing and
        promotional SMS messages from Mariani Metal. Your information will be
        handled in accordance with our Privacy Policy.
      </label>

      <div className="mb-4 w-full md:w-auto">
        <TurnstileWidget action="contact_form" />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-10 md:px-16 font-unageo-semibold text-[16px] md:text-[18px] 4k:text-[26px] py-2 border border-white text-white rounded-3xl hover:bg-white hover:text-cyan-700 transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
      </div>

      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contactBotField">Leave this field empty</label>
        <input
          id="contactBotField"
          type="text"
          name="bot-field"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {formStatus.message && (
        <p
          role="status"
          className={`mt-4 text-[14px] ${
            formStatus.type === "success" ? "text-green-300" : "text-red-300"
          }`}
        >
          {formStatus.message}
        </p>
      )}
    </form>
  );
}
