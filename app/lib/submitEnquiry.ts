import { budgetOptions, type EnquiryValues } from "./enquirySchema";

export type SubmitResult =
  | { ok: true; demo: boolean }
  | { ok: false; message: string };

type Options = {
  formId?: string; // the Formspree form ID, from the environment
  projectTypeLabel?: string; // readable name of the chosen project type
  briefReference?: string; // the reference number shown to the visitor, so you can match it
  fetchImpl?: typeof fetch; // can be swapped in tests
  fallbackEmail?: string; // shown in the error message
};

// A short reference such as "AM-2026-7F3A9C", shown to the visitor and sent with the enquiry.
export function makeReference(year = new Date().getFullYear()): string {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  const code = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `AM-${year}-${code}`;
}

// Sends one enquiry to Formspree and turns every possible outcome into a simple result.
export async function submitEnquiry(
  values: EnquiryValues,
  options: Options = {},
): Promise<SubmitResult> {
  const {
    formId = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined,
    projectTypeLabel = values.projectType,
    briefReference = "(none)",
    fetchImpl = fetch,
    fallbackEmail = "us by email",
  } = options;

  // The hidden trap field was filled in: almost certainly a bot. Pretend it worked, send nothing.
  if (values.company.trim() !== "") return { ok: true, demo: false };

  // No Formspree form ID yet: run in demo mode so the whole flow can still be tested.
  if (!formId) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { ok: true, demo: true };
  }

  const genericError = `Sorry, your message could not be sent. Please try again, or contact ${fallbackEmail}.`;
  const budgetLabel = budgetOptions.find(
    (option) => option.value === values.budget,
  )?.label;

  try {
    const response = await fetchImpl(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New website enquiry (${briefReference})`,
        brief_reference: briefReference,
        name: values.fullName,
        email: values.email,
        phone: values.phone || "(not given)",
        organisation: values.organisation || "(not given)",
        project_type: projectTypeLabel,
        timeframe: values.timeframe,
        location: values.location || "(not given)",
        budget: budgetLabel ?? values.budget,
        message: values.message,
        reference_link: values.reference || "(not given)",
        found_us_via: values.referral || "(not given)",
        consent: "agreed",
      }),
    });

    if (response.ok) return { ok: true, demo: false };
    if (response.status === 422) {
      return {
        ok: false,
        message:
          "Some details were not accepted. Please check the form and try again.",
      };
    }
    if (response.status === 429) {
      return {
        ok: false,
        message: "Too many attempts. Please wait a little and try again.",
      };
    }
    return { ok: false, message: genericError };
  } catch {
    // No internet, or the request was blocked.
    return { ok: false, message: genericError };
  }
}
