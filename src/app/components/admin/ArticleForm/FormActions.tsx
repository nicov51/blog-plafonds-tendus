interface FormActionsProps {
    mode: 'create' | 'edit';
    isSubmitting: boolean;
    onCancel: () => void;
}

export default function FormActions({
                                        mode,
                                        isSubmitting,
                                        onCancel,
                                    }: FormActionsProps) {
    return (
        <div className="form-actions">
            <button
                type="button"
                onClick={onCancel}
                className="btn-outline-gold"
                disabled={isSubmitting}
            >
                Annuler
            </button>
            <button
                type="submit"
                className="btn-gold"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? 'Enregistrement...'
                    : mode === 'create'
                        ? 'Créer l\'article'
                        : 'Mettre à jour'
                }
            </button>
        </div>
    );
}
