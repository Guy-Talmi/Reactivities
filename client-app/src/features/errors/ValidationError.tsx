import { Message } from "semantic-ui-react";

interface ValidationErrorProps {
    errors: string[] | null;
}

const ValidationError = ({ errors }: ValidationErrorProps) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: string, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationError