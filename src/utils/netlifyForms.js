export const netlifyFormEndpoint = "/__forms.html";

export async function submitNetlifyForm(formData) {
  const body = new URLSearchParams();

  for (const [name, value] of formData.entries()) {
    if (typeof value !== "string") {
      throw new Error("This form contains an unsupported attachment.");
    }

    body.append(name, value);
  }

  const response = await fetch(netlifyFormEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("We could not send your message. Please try again.");
  }
}

export async function submitNetlifyFileForm(formData) {
  const response = await fetch(netlifyFormEndpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("We could not submit your application. Please try again.");
  }
}
