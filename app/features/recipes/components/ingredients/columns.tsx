import type { ColumnDef, Getter, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";

export type Ingredient = {
    id: string;
    name: string;
    amount: number;
    unit: string;
    optional: boolean;
};

const InputCell = ({
    getValue,
    index,
    id,
    table,
}: {
    getValue: Getter<unknown>;
    index: number;
    id: string;
    table: Table<Ingredient>;
}) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <Input
            id={id}
            name={id}
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    );
};

export const columns: ColumnDef<Ingredient>[] = [
    {
        id: "name",
        accessorKey: "name",
        header: "Name",
        cell: ({ getValue, row: { index }, column: { id }, table }) => {
            return (
                <InputCell
                    getValue={getValue}
                    index={index}
                    id={id}
                    table={table}
                />
            );
        },
    },
    {
        id: "amount",
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue, row: { index }, column: { id }, table }) => {
            return (
                <InputCell
                    getValue={getValue}
                    index={index}
                    id={id}
                    table={table}
                />
            );
        },
    },
    {
        accessorKey: "unit",
        id: "unit",
        header: "Unit",
        cell: ({ getValue, row: { index }, column: { id }, table }) => {
            return (
                <InputCell
                    getValue={getValue}
                    index={index}
                    id={id}
                    table={table}
                />
            );
        },
    },
    {
        accessorKey: "optional",
        header: "Optional",
        id: "optional",
        cell: ({ getValue }) => {
            const initialValue = getValue<boolean>();
            const [value, setValue] = useState(initialValue);
            return (
                <Checkbox
                    checked={value}
                    onCheckedChange={(e) => setValue(!value)}
                />
            );
        },
    },
];
