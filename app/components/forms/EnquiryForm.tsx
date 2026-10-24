import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Field, controlClass } from "~/components/ui/Field";
import { services } from "~/data/services";
import { site } from "~/data/site";
import { emptyEnquiry, enquirySchema, timeframeOptions, type EnquiryValues } from "~/lib/enquirySchema";
import { submitEnquiry } from "~/lib/submitEnquiry";

const OTHER = "other";
const projectOptions = [
    ...services.map((service) => ({ value: service.id, label: service.title })),
    { value: OTHER, label: "Something else" },
];

type Status =
    | { state: "editing" }
    | { state: "error"; message: string }
    | { state: "sent"; demo: boolean };

export function EnquiryForm() {
    const [status, setStatus] = useState<Status>({ state: "editing" });
    const [searchParams] = useSearchParams();
    const successRef = useRef<HTMLHeadingElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<EnquiryValues>({
        resolver: zodResolver(enquirySchema),
        defaultValues: emptyEnquiry,
    });

    // Coming from "Enquire about this service"? Pre-select that service once the page is live.
    useEffect(() => {
        const wanted = searchParams.get("service");
        if (wanted && projectOptions.some((option) => option.value === wanted)) {
            setValue("projectType", wanted);
        }
    }, [searchParams, setValue]);

    // After sending, move keyboard and screen-reader focus to the confirmation message.
    useEffect(() => {
        if (status.state === "sent") successRef.current?.focus();
    }, [status]);

    async function onSubmit(values: EnquiryValues) {
        const label = projectOptions.find((option) => option.value === values.projectType)?.label;
        const result = await submitEnquiry(values, {
            projectTypeLabel: label,
            fallbackEmail: site.email,
        });

        if (result.ok) {
            setStatus({ state: "sent", demo: result.demo });
            reset(emptyEnquiry);
        } else {
            setStatus({ state: "error", message: result.message });
        }
    }

    if (status.state === "sent") {
        return (
            <div role="status" className="bg-surface border-line border p-8 md:p-10">
                <p className="label-caps text-accent">Message sent</p>
                <h2 ref={successRef} tabIndex={-1} className="mt-3 text-4xl leading-tight outline-none">
                    Thank you. Your enquiry has been received.
                </h2>
                <p className="text-muted mt-4 max-w-xl">
                    {status.demo
                        ? "Demo mode: nothing was actually sent, because no Formspree form ID has been set up yet."
                        : "We will read it and reply to the email address you gave."}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <ButtonLink to="/portfolio">View the portfolio</ButtonLink>
                    <button
                        type="button"
                        onClick={() => setStatus({ state: "editing" })}
                        className="label-caps border-line hover:border-accent border px-8 py-4 transition-colors"
                    >
                        Send another enquiry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            {/* The trap field: invisible to people, tempting to bots. */}
            <div aria-hidden="true" className="absolute left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Leave this field empty</label>
                <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
                    {(control) => (
                        <input type="text" autoComplete="name" className={controlClass} {...control} {...register("fullName")} />
                    )}
                </Field>
                <Field id="email" label="Email" required error={errors.email?.message}>
                    {(control) => (
                        <input type="email" autoComplete="email" className={controlClass} {...control} {...register("email")} />
                    )}
                </Field>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Field id="phone" label="Phone" error={errors.phone?.message}>
                    {(control) => (
                        <input type="tel" autoComplete="tel" className={controlClass} {...control} {...register("phone")} />
                    )}
                </Field>
                <Field id="referral" label="How did you find this site?" error={errors.referral?.message}>
                    {(control) => <input type="text" className={controlClass} {...control} {...register("referral")} />}
                </Field>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Field id="projectType" label="Type of project" required error={errors.projectType?.message}>
                    {(control) => (
                        <select className={controlClass} {...control} {...register("projectType")}>
                            <option value="">Choose one</option>
                            {projectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </Field>
                <Field id="timeframe" label="Preferred timeframe" required error={errors.timeframe?.message}>
                    {(control) => (
                        <select className={controlClass} {...control} {...register("timeframe")}>
                            <option value="">Choose one</option>
                            {timeframeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </Field>
            </div>

            <Field
                id="message"
                label="Tell us about your project"
                required
                hint="The mood, the place, the purpose. A few sentences is plenty."
                error={errors.message?.message}
            >
                {(control) => <textarea rows={6} className={`${controlClass} resize-y`} {...control} {...register("message")} />}
            </Field>

            <div>
                <div className="flex items-start gap-3">
                    <input
                        id="consent"
                        type="checkbox"
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="accent-accent mt-1 size-5 shrink-0"
                        {...register("consent")}
                    />
                    <label htmlFor="consent" className="text-sm">
                        I agree that my details are sent to Formspree and used to reply to my enquiry. See the{" "}
                        <Link to="/privacy" className="hover:text-accent underline underline-offset-4">
                            Privacy Policy
                        </Link>
                        .
                    </label>
                </div>
                {errors.consent && (
                    <p id="consent-error" className="text-error mt-2 text-sm">
                        {errors.consent.message}
                    </p>
                )}
            </div>

            {status.state === "error" && (
                <p role="alert" className="border-error text-error border p-4 text-sm">
                    {status.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-btn text-btn-fg hover:bg-btn-hover label-caps px-8 py-4 transition-colors disabled:cursor-wait disabled:opacity-70"
            >
                {isSubmitting ? "Sending…" : "Send enquiry"}
            </button>
        </form>
    );
}