export type Database = {
    public: {
        Tables: {
            recipes: {
                Row: {
                    recipe_id: number;
                    created_at: string;
                    name: string;
                    description: string;
                    recipient: string;
                    photo: string;
                    instructions: string;
                    updated_at: string;
                };
                Insert: {
                    recipe_id: number;
                    created_at: string;
                    name: string;
                    description: string;
                    recipient: string;
                    photo: string;
                    instructions: string;
                    updated_at: string;
                };
                Update: {
                    recipe_id: number;
                    created_at: string;
                    name: string;
                    description: string;
                    recipient: string;
                    photo: string;
                    instructions: string;
                    updated_at: string;
                };
                Relationships: [];
            };
        };
    };
};
