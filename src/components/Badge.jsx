export default function Badge({ title, color }) {
    const colorVariant = {
        blue: 'bg-blue-200 text-blue-600',
        red: 'bg-red-200 text-red-600',
        orange: 'bg-orange-200 text-orange-600',
        violet: 'bg-violet-200 text-violet-600',
        green: 'bg-green-200 text-green-600',
    }
    return (
        <span className={`${colorVariant[color]} rounded-2xl py-0.5 px-2 text-center`}>
            {title}
        </span>
    )
}
