import ButtonAction from './ButtonAction'
import Badge from './Badge'
import Modal from './Modal'
import { useState } from 'react'

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

export default function ProductsTables(products) {
    const [productList, setProductList] = useState(products.products)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [modalMode, setModalMode] = useState('view')

    const openModal = (product, mode) => {
        setSelectedProduct(product)
        setModalMode(mode)
        setIsModalOpen(true)
    }

    const handleAdd = (newProduct) => {
        setProductList((currentProducts) => [...currentProducts, newProduct])
        handleCloseModal()
    }

    const handleSave = (updatedProduct) => {
        setProductList((currentProducts) =>
            currentProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product,
            ),
        )
        handleCloseModal()
    }

    const handleDelete = (product) => {
        setProductList((currentProducts) =>
            currentProducts.filter((currentProduct) => currentProduct.id !== product.id),
        )
        handleCloseModal()
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedProduct(null)
    }
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
                        {productList.map((product) => (
                            <tr key={product.id} className="border-b border-slate-100">
                                <td className="px-6 py-4">{product.name}</td>
                                <td className="px-6 py-4">{formatCategory(product.category)}</td>
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
                        ))}
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
                />
            )}
        </div>
    )
}
