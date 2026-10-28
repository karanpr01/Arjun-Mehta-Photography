
import { ButtonLink } from "~/components/ui/ButtonLink";
import type { Service } from "~/data/services";

type Props = {
    service: Service;
    index: number;
};

export function ServiceCard({ service, index }: Props) {
    const headingId = `service-${service.id}`;

    return (
        <article
            id={service.id}
            aria-labelledby={headingId}
            className="bg-surface border-line flex flex-col border p-6 md:p-8"
        >
            <p className="label-caps text-accent">
                {String(index + 1).padStart(2, "0")}
            </p>

            <p className="label-caps text-muted mt-4">
                {service.tier}
            </p>

            <h3
                id={headingId}
                className="mt-3 text-3xl leading-snug"
            >
                {service.title}
            </h3>

            <p className="text-muted mt-4">
                {service.summary}
            </p>

            <dl className="mt-8 space-y-6 text-sm">
                <div>
                    <dt className="label-caps text-muted">
                        For
                    </dt>
                    <dd className="mt-2">
                        {service.reach}
                    </dd>
                </div>

                <div>
                    <dt className="label-caps text-muted">
                        Includes
                    </dt>

                    <dd>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                            {service.scope.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </dd>
                </div>

                <div>
                    <dt className="label-caps text-muted">
                        Starting from
                    </dt>

                    <dd className="mt-2 font-serif text-xl">
                        {service.price}
                    </dd>
                </div>
            </dl>

            <div className="mt-auto pt-10">
                <ButtonLink
                    to={`/contact?service=${service.id}`}
                    variant="outline"
                >
                    {service.cta}
                    <span className="sr-only">
                        : {service.title}
                    </span>
                </ButtonLink>
            </div>
        </article>
    );
}
