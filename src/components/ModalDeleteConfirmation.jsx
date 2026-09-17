export default function DeleteConfirmation({ product, error, isSubmitting, onCancel, onConfirm }) {
    return (
        <div>
            <p className="mb-6 text-sm text-slate-600">
                Are you sure you want to delete {product.name}?
            </p>
            {error && <p className="mb-3 text-xs text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isSubmitting}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}
