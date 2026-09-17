import { useEffect } from 'react'
import { LuX } from 'react-icons/lu'

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
            className={`fixed left-3 right-3 top-3 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg sm:left-auto sm:right-4 sm:top-4 ${
                isSuccess ? 'bg-green-600' : 'bg-red-600'
            }`}
        >
            <div className="flex items-center gap-3">
                <span className="min-w-0 flex-1 wrap-break-word">{toast.message}</span>
                <button type="button">
                    <LuX onClick={onClose} className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}
