import { data, Form } from "react-router";
import type { Route } from "./+types/home-page";
import InputPair from "../components/input-pair";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/features/recipes/components/ingredients/data-table";
import {
    columns,
    type Ingredient,
} from "~/features/recipes/components/ingredients/columns";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
    return [
        {
            title: "Home | Yum Send",
        },
        {
            name: "description",
            content: "Send your yummy recipes",
        },
    ];
};

const initialData: Ingredient = {
    id: "",
    name: "",
    amount: 0,
    unit: "",
    optional: false,
};

export default function HomePage() {
    const [image, setImage] = useState<string | null>(null);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // The file is in the memory of browser
            const file = event.target.files?.[0];
            // url that only works for browsers to allocate the file in the memory
            setImage(URL.createObjectURL(file));
        }
    };
    return (
        <div className="space-y-20 mt-20">
            <hgroup className="flex justify-center flex-col items-center gap-2">
                <h1 className="text-4xl text-primary">Yum Send</h1>
                <p>Send your yummy recipes</p>
            </hgroup>
            <section className="m-auto max-w-2xl">
                <Form>
                    <div className="space-y-5">
                        <InputPair
                            label="Name"
                            description="This is the name of your recipe"
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Name of your recipe"
                        />
                        <InputPair
                            label="Description"
                            description="(100 characters or less)"
                            id="description"
                            name="description"
                            type="text"
                            placeholder="A consie description of your recipe"
                        />
                        <InputPair
                            label="Instruction"
                            description="A detailed instruction of your recipe"
                            id="description"
                            name="description"
                            required
                            textArea
                            type="text"
                            placeholder="A detailed description of your recipe"
                        />

                        <div className="flex flex-col space-y-2 items-start">
                            <div className="size-50 rounded-xl shadow-xl overflow-hidden">
                                {image ? (
                                    <img
                                        src={image}
                                        alt="logo"
                                        className="object-cover w-full h-full"
                                    />
                                ) : null}
                            </div>

                            <Label className="flex flex-col items-start gap-0">
                                Photo
                                <small className="text-muted-foreground">
                                    The photo of your recipe
                                </small>
                            </Label>
                            <Input
                                type="file"
                                className=""
                                onChange={onChange}
                                required
                                name="image"
                            />
                            <div className="flex flex-col text-xs">
                                <span className="text-muted-foreground">
                                    Allowed formats: PNG, JPEG
                                </span>
                                <span className="text-muted-foreground">
                                    Max file size: 1MB
                                </span>
                            </div>
                        </div>
                        <DataTable
                            caption="Ingredients"
                            columns={columns}
                            initialData={initialData}
                        />

                        <DataTable
                            caption="Sauce"
                            columns={columns}
                            initialData={initialData}
                        />

                        <InputPair
                            label="Email"
                            description="Recipient's email"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="abc@abc.abc"
                        />
                        <Button type="submit" className="w-full" size="lg">
                            Send
                        </Button>
                    </div>
                </Form>
            </section>
        </div>
    );
}
