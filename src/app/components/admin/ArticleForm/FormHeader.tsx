interface FormHeaderProps {
    error: string;
}

export default function FormHeader({ error }: FormHeaderProps) {
    if (!error) return null;

    return (
        <div className="error-message">
            ❌ {error}
        </div>
    );
}
