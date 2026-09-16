export default function ButtonAction({ label, onClick }) {
    return (
        <button
            className="bg-transparent py-2 px-4 border border-gray-500 hover:scale-110 rounded"
            onClick={onClick}
        >
            {label}
        </button>
    )
}
