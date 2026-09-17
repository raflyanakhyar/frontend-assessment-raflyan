import { useEffect } from 'react'

export default function Toast({ toast, onClose }) {
    useEffect(() => {
        if (!toast) return undefined

        const timeoutId = setTimeout(onClose, 3000)
        return () => clearTimeout(timeoutId)
    }, [toast, onClose])

    if (!toast) return null

    const isSuccess = toast.type === 'success'

    return (
        <div
            role="status"
            className={`fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${
                isSuccess ? 'bg-green-600' : 'bg-red-600'
            }`}
        >
            <div className="flex items-center gap-3">
                <span>{toast.message}</span>
                <button type="button" onClick={onClose} aria-label="Close notification">
                    Close
                </button>
            </div>
        </div>
    )
}
