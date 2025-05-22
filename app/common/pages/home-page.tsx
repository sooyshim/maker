import { Form } from "react-router";
import type { Route } from "./+types/home-page";
import InputPair from "../components/input-pair";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/features/recipes/components/ingredients/data-table";
import {
    columns,
    type Ingredient,
} from "~/features/recipes/components/ingredients/columns";

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

const data: Ingredient = {
    id: "",
    name: "",
    amount: 0,
    unit: "",
    optional: false,
};

export default function HomePage() {
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
                        <InputPair
                            label="Email"
                            description="Recipient's email"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="abc@abc.abc"
                        />

                        <DataTable
                            caption="Ingredients"
                            columns={columns}
                            initialData={data}
                        />

                        <DataTable
                            caption="Sauce"
                            columns={columns}
                            initialData={data}
                        />

                        <Button type="submit" className="w-full" size="lg">
                            Submit
                        </Button>
                    </div>
                </Form>
            </section>
        </div>
    );
}
