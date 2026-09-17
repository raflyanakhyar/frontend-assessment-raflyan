export default function ProductLoader() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading products"
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                <span className="text-sm font-medium text-slate-600">Loading products...</span>
            </div>
            <div className="space-y-4 p-4">
                {[1, 2, 3].map((row) => (
                    <div key={row} className="grid gap-3 sm:grid-cols-6">
                        {[1, 2, 3, 4, 5, 6].map((cell) => (
                            <span key={cell} className="h-4 animate-pulse rounded bg-slate-100" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
