import { zodResolver } from "@hookform/resolvers/zod";
import {
    Building2,
    Check,
    Heart,
    Shirt,
    Sparkles,
    UserRound,
    type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Field, controlClass } from "~/components/ui/Field";
import { services } from "~/data/services";
import { site } from "~/data/site";
import {
    budgetOptions,
    emptyEnquiry,
    enquirySchema,
    timeframeOptions,
    type EnquiryValues,
} from "~/lib/enquirySchema";
import { makeReference, submitEnquiry } from "~/lib/submitEnquiry";

const OTHER = "other";

const typeIcons: Record<string, LucideIcon> = {
    "editorial-fashion": Shirt,
    "portraiture-branding": UserRound,
    "architecture-spaces": Building2,
    "weddings-celebrations": Heart,
    [OTHER]: Sparkles,
};

const projectOptions = [
    ...services.map((service) => ({ value: service.id, label: service.title })),
    { value: OTHER, label: "Something else" },
];

type Choice = { value: string; label: string; hint?: string; icon?: LucideIcon };

// A group of big "pick one" cards. It is a real set of radio buttons underneath, so the
// keyboard (arrow keys) and screen readers work as they should.
function ChoiceGroup({
    id,
    legend,
    error,
    choices,
    columns,
    field,
}: {
    id: string;
    legend: string;
    error?: string;
    choices: readonly Choice[];
    columns: string;
    field: UseFormRegisterReturn;
}) {
    return (
        <fieldset aria-describedby={error ? `${id}-error` : undefined}>
            <legend className="label-caps text-muted">
                {legend}
                <span aria-hidden="true" className="text-accent">
                    {" "}
                    *
                </span>
            </legend>
            <div className={`mt-3 grid gap-3 ${columns}`}>
                {choices.map((choice) => {
                    const Icon = choice.icon;
                    return (
                        <label
                            key={choice.value}
                            className="border-line hover:border-accent has-:checked:border-accent has-:checked:bg-surface has-:focus-visible:outline-accent relative flex cursor-pointer items-start gap-3 border p-4 transition-colors has-:focus-visible:outline-2 has-:focus-visible:outline-offset-2"
                        >
                            <input type="radio" value={choice.value} className="peer sr-only" {...field} />
                            {Icon && (
                                <Icon
                                    size={18}
                                    strokeWidth={1.25}
                                    aria-hidden="true"
                                    className="text-muted mt-0.5 shrink-0"
                                />
                            )}
                            <span className="block">
                                <span className="block text-sm">{choice.label}</span>
                                {choice.hint && (
                                    <span className="text-muted mt-1 block text-xs">{choice.hint}</span>
                                )}
                            </span>
                            <Check
                                size={16}
                                strokeWidth={1.5}
                                aria-hidden="true"
                                className="text-accent absolute top-3 right-3 opacity-0 peer-checked:opacity-100"
                            />
                        </label>
                    );
                })}
            </div>
            {error && (
                <p id={`${id}-error`} className="text-error mt-2 text-sm">
                    {error}
                </p>
            )}
        </fieldset>
    );
}

type Status =
    | { state: "editing" }
    | { state: "error"; message: string }
    | { state: "sent"; demo: boolean; reference: string };

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
        const reference = makeReference();
        const result = await submitEnquiry(values, {
            projectTypeLabel: label,
            briefReference: reference,
            fallbackEmail: site.email,
        });

        if (result.ok) {
            setStatus({ state: "sent", demo: result.demo, reference });
            reset(emptyEnquiry);
        } else {
            setStatus({ state: "error", message: result.message });
        }
    }

    if (status.state === "sent") {
        return (
            <div role="status" className="bg-surface border-line border p-8 md:p-10">
                <p className="label-caps text-accent">Brief received</p>
                <h2 ref={successRef} tabIndex={-1} className="mt-3 text-4xl leading-tight outline-none">
                    Thank you. Your enquiry has been received.
                </h2>
                <p className="label-caps text-muted mt-4">Brief reference: {status.reference}</p>
                <p className="text-muted mt-4 max-w-xl">
                    {status.demo
                        ? "Demo mode: nothing was actually sent, because no Formspree form ID has been set up yet."
                        : `I will read it and reply to the email address you gave, ${site.replyTime}. Quote the reference above if you write to follow up.`}
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
            {/* The trap field: invisible to people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Leave this field empty</label>
                <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
            </div>

            <div className="space-y-8">
                <h3 className="label-caps text-accent border-line border-b pb-3">01 // About you</h3>
                <div className="grid gap-8 md:grid-cols-2">
                    <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
                        {(control) => (
                            <input
                                type="text"
                                autoComplete="name"
                                className={controlClass}
                                {...control}
                                {...register("fullName")}
                            />
                        )}
                    </Field>
                    <Field id="email" label="Email" required error={errors.email?.message}>
                        {(control) => (
                            <input
                                type="email"
                                autoComplete="email"
                                className={controlClass}
                                {...control}
                                {...register("email")}
                            />
                        )}
                    </Field>
                    <Field id="phone" label="Phone or WhatsApp" error={errors.phone?.message}>
                        {(control) => (
                            <input
                                type="tel"
                                autoComplete="tel"
                                className={controlClass}
                                {...control}
                                {...register("phone")}
                            />
                        )}
                    </Field>
                    <Field
                        id="organisation"
                        label="Brand, label or publication"
                        error={errors.organisation?.message}
                    >
                        {(control) => (
                            <input
                                type="text"
                                autoComplete="organization"
                                className={controlClass}
                                {...control}
                                {...register("organisation")}
                            />
                        )}
                    </Field>
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="label-caps text-accent border-line border-b pb-3">02 // The commission</h3>

                <ChoiceGroup
                    id="projectType"
                    legend="Type of project"
                    error={errors.projectType?.message}
                    choices={projectOptions.map((option) => ({ ...option, icon: typeIcons[option.value] }))}
                    columns="sm:grid-cols-2 xl:grid-cols-3"
                    field={register("projectType")}
                />

                <div className="grid gap-8 md:grid-cols-2">
                    <Field
                        id="timeframe"
                        label="Preferred timeframe"
                        required
                        error={errors.timeframe?.message}
                    >
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
                    <Field id="location" label="City or venue of the shoot" error={errors.location?.message}>
                        {(control) => (
                            <input type="text" className={controlClass} {...control} {...register("location")} />
                        )}
                    </Field>
                </div>

                <ChoiceGroup
                    id="budget"
                    legend="Estimated investment"
                    error={errors.budget?.message}
                    choices={budgetOptions}
                    columns="sm:grid-cols-2 xl:grid-cols-3"
                    field={register("budget")}
                />
            </div>

            <div className="space-y-8">
                <h3 className="label-caps text-accent border-line border-b pb-3">03 // The story</h3>
                <Field
                    id="message"
                    label="Tell me about your project"
                    required
                    hint="The mood, the place, the purpose. A few sentences is plenty."
                    error={errors.message?.message}
                >
                    {(control) => (
                        <textarea
                            rows={6}
                            className={`${controlClass} resize-y`}
                            {...control}
                            {...register("message")}
                        />
                    )}
                </Field>
                <div className="grid gap-8 md:grid-cols-2">
                    <Field
                        id="reference"
                        label="Moodboard or reference link"
                        hint="For example a Pinterest board or a shared folder."
                        error={errors.reference?.message}
                    >
                        {(control) => (
                            <input
                                type="url"
                                inputMode="url"
                                className={controlClass}
                                {...control}
                                {...register("reference")}
                            />
                        )}
                    </Field>
                    <Field id="referral" label="How did you find this site?" error={errors.referral?.message}>
                        {(control) => (
                            <input type="text" className={controlClass} {...control} {...register("referral")} />
                        )}
                    </Field>
                </div>
            </div>

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