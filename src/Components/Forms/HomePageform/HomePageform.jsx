import React from "react";

export default function HomePageform({
  isDark = false,
}) {
  const textColour = isDark
    ? "text-white"
    : "text-black";

  const borderColour = isDark
    ? "border-white"
    : "border-black";

  const checkboxColour = isDark
    ? "accent-white"
    : "accent-black";

  const buttonStyles = isDark
    ? "border-white text-white hover:bg-white hover:text-black"
    : "border-black text-black hover:bg-black hover:text-white";

  const inputStyles = `
    border-b-2
    ${borderColour}
    ${textColour}
    focus:outline-none
    bg-transparent
    py-1
    placeholder:opacity-60
  `;

  return (
    <div className="p-5 md:p-10 rounded-xl md:max-w-[70vw] mx-auto">
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8 text-[12px] md:text-[14px] lg:text-[15px] 3xl:text-[24px]">
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className={`mb-2 font-unageo ${textColour}`}
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              className={inputStyles}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className={`mb-2 font-unageo ${textColour}`}
            >
              Phone No
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputStyles}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={`mb-2 font-unageo ${textColour}`}
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputStyles}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className={`mb-2 font-unageo ${textColour}`}
            >
              Message
            </label>

            <input
              id="message"
              name="message"
              type="text"
              className={inputStyles}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start justify-between gap-6">
          <label className="flex items-start gap-3 cursor-pointer md:max-w-[75%]">
            <input
              type="checkbox"
              name="smsConsent"
              className={`w-5 h-5 mt-1 shrink-0 ${checkboxColour}`}
            />

            <span
              className={`text-[12px] leading-relaxed font-unageo ${textColour}`}
            >
              By clicking the checkbox, you consent to receive marketing and
              promotional SMS messages from Mariani Metal. Your information
              will be handled in accordance with our Privacy Policy.
            </span>
          </label>

          <button
            type="submit"
            className={`shrink-0 px-6 py-2 border rounded-full font-unageo-medium transition duration-300 ${buttonStyles}`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}