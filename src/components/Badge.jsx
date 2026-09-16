export default function Badge({ title, color }) {
    return (
        <div className={`bg-${color}-100 text-${color}-600 rounded-2xl py-0.5 px-2 text-center`}>
            {title}
        </div>
    )
}
