import data from '../data.json'
import ButtonAction from './ButtonAction'
import Badge from './Badge'

const formatPrice = (value) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)

const formatDate = (value) =>
    new Date(value).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

const formatCategory = (category) => {
    if (category === 'Electronics') {
        return <Badge title={category} color="red" />
    } else if (category === 'Home & Kitchen') {
        return <Badge title={category} color="blue" />
    } else if (category === 'Apparel') {
        return <Badge title={category} color="green" />
    }
}

const formatStatus = (status) => {
    if (status === 'In Stock') {
        return <Badge title={status} color="green" />
    } else if (status === 'Out of Stock') {
        return <Badge title={status} color="red" />
    }
}

const handleView = () => {
    console.log('view')
}
const handleEdit = () => {
    console.log('edit')
}
const handleDelete = () => {
    console.log('delete')
}

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
                                <td className="px-6 py-4">{formatCategory(product.category)}</td>
                                <td className="px-6 py-4">{formatPrice(product.price)}</td>
                                <td className="px-6 py-4">{formatStatus(product.status)}</td>
                                <td className="px-6 py-4">{formatDate(product.createdAt)}</td>
                                <td className="flex px-6 py-4 gap-2">
                                    <ButtonAction label="View" onClick={handleView} />
                                    <ButtonAction label="Edit" onClick={handleEdit} />
                                    <ButtonAction label="Delete" onClick={handleDelete} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
