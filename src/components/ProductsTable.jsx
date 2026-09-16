import data from '../data.json'

const formatPrice = (value) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)

const formatDate = (value) =>
    new Date(value).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

export default function ProductsTables() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 text-left border-b border-slate-200 text-2xl">
                            <th className="px-6 py-4 text-xs">Name</th>
                            <th className="px-6 py-4 text-xs">Category</th>
                            <th className="px-6 py-4 text-xs">Price</th>
                            <th className="px-6 py-4 text-xs">Status</th>
                            <th className="px-6 py-4 text-xs">Created</th>
                            <th className="px-6 py-4 text-xs">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.products.map((product) => (
                            <tr className="border-b border-slate-100">
                                <td className="px-6 py-4">{product.name}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{formatPrice(product.price)}</td>
                                <td className="px-6 py-4">{product.status}</td>
                                <td className="px-6 py-4">{formatDate(product.createdAt)}</td>
                                <td className="flex px-6 py-4 gap-2">
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        View
                                    </button>
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Edit
                                    </button>
                                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
