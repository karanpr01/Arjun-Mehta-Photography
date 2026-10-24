import { z } from "zod";

// One place that says what a valid enquiry looks like.
// The form shows these messages, and the tests (Day 6) check them.
export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || /^[+()\d][\d\s().-]{5,}$/.test(value), {
      message: "Please enter a valid phone number, or leave this empty.",
    }),
  projectType: z.string().min(1, "Please choose a project type."),
  timeframe: z.string().min(1, "Please choose a timeframe."),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(2000, "Please keep your message under 2000 characters."),
  referral: z
    .string()
    .trim()
    .max(200, "Please keep this under 200 characters."),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm that you agree before sending.",
  }),
  // A hidden "trap" field. Real visitors never see it, so only bots fill it in.
  company: z.string(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export const emptyEnquiry: EnquiryValues = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  timeframe: "",
  message: "",
  referral: "",
  consent: false,
  company: "",
};

export const timeframeOptions = [
  "As soon as possible",
  "Within 1 to 3 months",
  "In 3 to 6 months",
  "Later, or still flexible",
] as const;
