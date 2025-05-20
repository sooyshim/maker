import type { InputHTMLAttributes } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function InputPair({
    label,
    description,
    textArea = false,
    ...rest
}: {
    label: string;
    description: string;
    textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
    return (
        <div className="space-y-2 flex flex-col text-left">
            <Label
                className="flex flex-col gap-0 items-start"
                htmlFor={rest.id}
            >
                {label}
                <small className="text-muted-foreground">{description}</small>
            </Label>
            {textArea ? (
                <Textarea {...rest} rows={4} className="resize-none" />
            ) : (
                <Input {...rest} />
            )}
        </div>
    );
}
