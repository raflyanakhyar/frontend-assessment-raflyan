export default function ButtonAction({ label, onClick, icon }) {
    return (
        <button
            type="button"
            aria-label={label}
            className="flex shrink-0 items-center gap-2 rounded border border-gray-500 bg-transparent px-3 py-2 text-sm hover:scale-105 sm:px-4"
            onClick={onClick}
        >
            {icon}
            {label}
        </button>
    )
}
