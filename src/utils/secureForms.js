export const careerFormEndpoint =
  import.meta.env.VITE_TALENT_API_ENDPOINT?.trim() || "";

export const contactFormEndpoint =
  import.meta.env.VITE_CONTACT_API_ENDPOINT?.trim() || "";

export function isSecureFormEndpointConfigured(endpoint) {
  return Boolean(endpoint && !endpoint.endsWith("/__forms.html"));
}

export async function submitSecureForm(endpoint, formData) {
  if (!isSecureFormEndpointConfigured(endpoint)) {
    throw new Error("This form is temporarily unavailable.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
    credentials: "omit",
    redirect: "error",
    referrerPolicy: "strict-origin-when-cross-origin",
  });

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("The secure form service returned an invalid response.");
  }

  const result = await response.json();

  if (!response.ok || result?.success !== true) {
    throw new Error(
      typeof result?.message === "string" && result.message.trim()
        ? result.message
        : "The form could not be submitted. Please try again.",
    );
  }

  return result;
}
