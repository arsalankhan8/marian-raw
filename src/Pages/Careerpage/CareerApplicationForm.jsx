import { useState } from "react";
import { CAREER_AREAS } from "./careersData";

function FormIcon({ name, className = "h-5 w-5" }) {
  const commonProps = {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  if (name === "upload") {
    return (
      <svg {...commonProps}>
        <path d="M12 16V4" />
        <path d="m8 8 4-4 4 4" />
        <path d="M4 20h16" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function CareerApplicationForm({ application, region }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedResumeName, setSelectedResumeName] = useState("");
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const talentEndpoint =
    import.meta.env.VITE_TALENT_API_ENDPOINT?.trim() ||
    "/api/career-application.php";

  const inputClassName =
    "w-full rounded-[12px] border border-[#D5D9DB] bg-white px-4 py-4 text-[15px] text-black outline-none transition-colors duration-300 placeholder:text-[#8C9295] focus:border-[#00688F]";

  const regionLabel = region === "us" ? "United States" : "Canada";
  const positionLabel =
    application.kind === "job"
      ? application.title
      : `General Application - ${application.title}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const resume = formData.get("resume");

    setFormStatus({ type: "", message: "" });

    if (!(resume instanceof File) || resume.size === 0) {
      setFormStatus({ type: "error", message: "Please select your resume." });
      return;
    }

    if (resume.size > 10 * 1024 * 1024) {
      setFormStatus({
        type: "error",
        message: "Please upload a resume smaller than 10 MB.",
      });
      return;
    }

    const extension = resume.name.split(".").pop()?.toLowerCase();

    if (!extension || !["pdf", "doc", "docx"].includes(extension)) {
      setFormStatus({
        type: "error",
        message: "Please upload a PDF, DOC, or DOCX file.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(talentEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const responseText = await response.text();
      let result = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = {};
        }
      }

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Unable to submit the application.");
      }

      form.reset();
      setSelectedResumeName("");
      setFormStatus({
        type: "success",
        message:
          result.message ||
          "Thank you. Your application has been submitted to our hiring team.",
      });
    } catch (error) {
      console.error("Career application submission error:", error);
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not submit your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      action={talentEndpoint}
      method="POST"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="rounded-[24px] bg-white p-6 text-black shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10"
    >
      <div className="mb-7 rounded-[14px] border border-[#B9D9E4] bg-[#EDF7FA] p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00688F]">
          {application.kind === "job" ? "Applying For" : "Area of Interest"}
        </span>
        <h2 className="mt-2 text-[22px] font-semibold text-black">
          {application.title}
        </h2>
        <p className="mt-2 text-[13px] text-[#606A6E]">
          {application.location} · {application.type}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-[13px] font-semibold">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="mb-2 block text-[13px] font-semibold">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last name"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-semibold">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@email.com"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[13px] font-semibold">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="areaOfInterest" className="mb-2 block text-[13px] font-semibold">
            Area of Interest *
          </label>
          <select
            id="areaOfInterest"
            name="areaOfInterest"
            required
            defaultValue={application.department || application.title}
            className={inputClassName}
          >
            {CAREER_AREAS.map((area) => (
              <option key={area.title} value={area.title}>
                {area.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="preferredLocationDisplay" className="mb-2 block text-[13px] font-semibold">
            Application Region
          </label>
          <input
            id="preferredLocationDisplay"
            type="text"
            value={regionLabel}
            readOnly
            className={`${inputClassName} cursor-not-allowed bg-[#F3F5F6] text-[#626A6E]`}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="resume" className="mb-2 block text-[13px] font-semibold">
          Upload Resume *
        </label>
        <label
          htmlFor="resume"
          className="flex cursor-pointer flex-col items-center justify-center rounded-[14px] border border-dashed border-[#AEB7BB] bg-[#F6F8F9] px-5 py-8 text-center transition-colors duration-300 hover:border-[#00688F] hover:bg-[#EEF6F8]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#00688F] shadow-sm">
            <FormIcon name="upload" />
          </div>
          <span className="mt-4 max-w-full truncate text-[14px] font-semibold">
            {selectedResumeName || "Choose your resume"}
          </span>
          <span className="mt-1 text-[12px] text-[#727A7E]">
            PDF, DOC or DOCX. Maximum 10 MB.
          </span>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) =>
            setSelectedResumeName(event.target.files?.[0]?.name || "")
          }
          className="sr-only"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-[13px] font-semibold">
          Additional Information
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us briefly about your experience."
          className={`${inputClassName} resize-none`}
        />
      </div>

      <input type="hidden" name="positionAppliedFor" value={positionLabel} />
      <input type="hidden" name="positionLocation" value={application.location || regionLabel} />
      <input type="hidden" name="positionDepartment" value={application.department || application.title} />
      <input type="hidden" name="preferredLocation" value={regionLabel} />
      <input type="hidden" name="applicationRegion" value={regionLabel} />

      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Leave this field empty</label>
        <input
          id="companyWebsite"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-7">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#00688F] px-7 py-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#005472] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
          {!isSubmitting && (
            <FormIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>

        {formStatus.message && (
          <p
            role="status"
            className={`mt-4 text-[14px] ${
              formStatus.type === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {formStatus.message}
          </p>
        )}
      </div>
    </form>
  );
}
