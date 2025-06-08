import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

export interface RecipeCardProps {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    recipient: string;
}

export function RecipeCard({
    id,
    name,
    description,
    recipient,
    createdAt,
}: RecipeCardProps) {
    return (
        <Link to={`/recipes/${id}`}>
            <Card className="bg-transparent hover:bg-card/50 transition-colors">
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardContent className="space-x-2">
                    <p>{description}</p>
                    <p>{createdAt}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                            Sent to: {recipient}
                        </span>
                    </div>
                    <Button variant="secondary" size="sm">
                        <Link to={"/recipes/:recipeId"}>View</Link>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
