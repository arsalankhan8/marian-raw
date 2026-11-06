import React, { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  netlifyFormEndpoint,
  submitNetlifyForm,
} from "../../../utils/netlifyForms";

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

  useEffect(() => {
    if (formStatus.type !== "success") return undefined;

    const timeoutId = window.setTimeout(() => {
      setFormStatus({ type: "", message: "" });
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [formStatus.type]);

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

    try {
      setIsSubmitting(true);
      await submitNetlifyForm(payload);
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
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="contact-form"
      name="contact"
      action={netlifyFormEndpoint}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="mt-[30px] w-full scroll-mt-28 p-4 font-unageo text-white"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <div className="grid gap-5 md:gap-6">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-white bg-transparent px-3 py-3 text-[16px] leading-[30px] text-white placeholder:text-white/55 focus:border-cyan-300 focus:outline-none md:px-4 md:py-3 md:text-[19px] lg:leading-[40px] 4k:text-[30px] 4k:leading-[100px]"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone No"
            className="w-full border border-white bg-transparent px-3 py-3 text-[16px] leading-[30px] text-white placeholder:text-white/55 focus:border-cyan-300 focus:outline-none md:px-4 md:py-3 md:text-[19px] lg:leading-[40px] 4k:text-[30px] 4k:leading-[100px]"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border border-white bg-transparent px-3 py-3 text-[16px] leading-[30px] text-white placeholder:text-white/55 focus:border-cyan-300 focus:outline-none md:px-4 md:py-3 md:text-[19px] lg:leading-[40px] 4k:text-[30px] 4k:leading-[100px]"
            required
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows="8"
          className="min-h-[210px] w-full resize-y border border-white bg-transparent px-3 py-3 text-[16px] text-white placeholder:text-white/55 focus:border-cyan-300 focus:outline-none md:h-full md:min-h-full md:px-4 md:py-4 md:text-[19px] 4k:text-[30px]"
          required
        ></textarea>
      </div>

      {/* Consent Checkbox */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <label className="flex w-full cursor-pointer items-start text-[12px] leading-relaxed md:w-[58%] md:text-[14px]">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            checked={formData.consent}
            onChange={handleChange}
            className="mr-3 mt-1 h-4 w-4 shrink-0 accent-white"
          />
          By clicking the check box, you consent to receive marketing and
          promotional SMS messages from Mariani Metal. Your information will be
          handled in accordance with our Privacy Policy.
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full border border-white px-10 py-2 font-unageo-semibold text-[16px] text-white transition hover:bg-white hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 md:px-16 md:text-[18px] 4k:text-[26px]"
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

      {formStatus.type === "error" && formStatus.message && (
        <p
          role="alert"
          className="mt-4 text-[14px] text-red-200"
        >
          {formStatus.message}
        </p>
      )}

      <AnimatePresence>
        {formStatus.type === "success" && (
          <Motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed right-4 top-24 z-[100] w-[calc(100%-2rem)] max-w-[420px] overflow-hidden rounded-2xl border border-emerald-200 bg-white text-[#17211c] shadow-[0_20px_60px_rgba(0,0,0,0.28)] md:right-8"
          >
            <div className="flex items-start gap-4 p-5 pr-12">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </span>

              <div>
                <p className="font-unageo-semibold text-[18px] text-emerald-900">
                  Message sent successfully
                </p>
                <p className="mt-1 text-[14px] leading-6 text-slate-600">
                  Thank you for contacting Mariani Metal. Our team will get
                  back to you shortly.
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close confirmation"
              onClick={() => setFormStatus({ type: "", message: "" })}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <Motion.div
              className="h-1 origin-left bg-emerald-500"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </Motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
