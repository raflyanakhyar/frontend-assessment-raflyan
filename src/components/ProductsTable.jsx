import { useState } from 'react'
import ButtonAction from './ButtonAction'
import Badge from './Badge'
import Modal from './Modal'
import { CATEGORIES, STATUSES } from '../utils/constant'

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
        return <Badge title={category} color="orange" />
    } else if (category === 'Home & Kitchen') {
        return <Badge title={category} color="blue" />
    } else if (category === 'Apparel') {
        return <Badge title={category} color="violet" />
    }
}

const formatStatus = (status) => {
    if (status === 'In Stock') {
        return <Badge title={status} color="green" />
    } else if (status === 'Out of Stock') {
        return <Badge title={status} color="red" />
    }
}

export default function ProductsTables({
    products,
    onCreateProduct,
    onUpdateProduct,
    onDeleteProduct,
    onNotify,
}) {
    const [productList, setProductList] = useState(products)
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [modalMode, setModalMode] = useState('view')

    const openModal = (product, mode) => {
        setSelectedProduct(product)
        setModalMode(mode)
        setIsModalOpen(true)
    }

    const handleAdd = async (newProduct) => {
        const createdProduct = onCreateProduct ? await onCreateProduct(newProduct) : newProduct

        setProductList((currentProducts) => [...currentProducts, createdProduct])
        handleCloseModal()
        onNotify('success', 'Product added successfully.')
    }

    const handleSave = async (updatedProduct) => {
        const savedProduct = onUpdateProduct
            ? await onUpdateProduct(updatedProduct)
            : updatedProduct

        setProductList((currentProducts) =>
            currentProducts.map((product) =>
                product.id === savedProduct.id ? savedProduct : product,
            ),
        )
        handleCloseModal()
        onNotify('success', 'Product updated successfully.')
    }

    const handleDelete = async (product) => {
        if (onDeleteProduct) await onDeleteProduct(product)

        setProductList((currentProducts) =>
            currentProducts.filter((currentProduct) => currentProduct.id !== product.id),
        )
        handleCloseModal()
        onNotify('success', 'Product deleted successfully.')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedProduct(null)
    }

    const filteredProducts = productList.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = !categoryFilter || product.category === categoryFilter
        const matchesStatus = !statusFilter || product.status === statusFilter

        return matchesSearch && matchesCategory && matchesStatus
    })

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex justify-start border-b border-slate-200 p-4">
                <ButtonAction
                    label="Add Product"
                    onClick={() =>
                        openModal({ name: '', category: '', price: '', status: 'In Stock' }, 'add')
                    }
                />
            </div>
            <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-3">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search product..."
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <select
                    value={categoryFilter}
                    onChange={(event) => setCategoryFilter(event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                    <option value="">All categories</option>
                    {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                    <option value="">All statuses</option>
                    {STATUSES.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 text-left border-b border-slate-200 text-2xl">
                            <th className="px-6 py-4 text-xs">Name</th>
                            <th className="px-6 py-4 text-xs">Category</th>
                            <th className="px-6 py-4 text-xs">Price</th>
                            <th className="px-6 py-4 text-xs">Status</th>
                            <th className="px-6 py-4 text-xs">Created</th>
                            <th className="px-6 py-4 text-xs text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                    Product Not Found
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="border-b border-slate-100">
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">
                                        {formatCategory(product.category)}
                                    </td>
                                    <td className="px-6 py-4">{formatPrice(product.price)}</td>
                                    <td className="px-6 py-4">{formatStatus(product.status)}</td>
                                    <td className="px-6 py-4">{formatDate(product.createdAt)}</td>
                                    <td className="flex px-6 py-4 gap-2">
                                        <ButtonAction
                                            label="View"
                                            onClick={() => openModal(product, 'view')}
                                        />
                                        <ButtonAction
                                            label="Edit"
                                            onClick={() => openModal(product, 'edit')}
                                        />
                                        <ButtonAction
                                            label="Delete"
                                            onClick={() => openModal(product, 'delete')}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && selectedProduct && (
                <Modal
                    product={selectedProduct}
                    mode={modalMode}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    onError={(message) => onNotify('error', message)}
                />
            )}
        </div>
    )
}
