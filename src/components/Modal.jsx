import { useState } from 'react'

export default function Modal({ product, mode, onClose, onSave, onDelete }) {
    const [formData, setFormData] = useState(product)

    const isEditMode = mode === 'edit'
    const isDeleteMode = mode === 'delete'

    const handleChange = (field, value) => {
        setFormData((currentData) => ({ ...currentData, [field]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSave({ ...formData, price: Number(formData.price) })
    }

    return (
        <>
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/50 p-4">
                <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            {isEditMode
                                ? 'Edit Product'
                                : isDeleteMode
                                  ? 'Delete Product'
                                  : 'Product Details'}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-900"
                        >
                            Close
                        </button>
                    </div>
                    {isDeleteMode ? (
                        <div>
                            <p className="mb-6 text-sm text-slate-600">
                                Are you sure you want to delete {product.name}?
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(product)}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="block text-xs font-semibold mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(event) => handleChange('name', event.target.value)}
                                    readOnly={!isEditMode}
                                    className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none transition"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-xs font-semibold mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(event) =>
                                        handleChange('category', event.target.value)
                                    }
                                    disabled={!isEditMode}
                                    className="w-full px-3.5 py-2 border rounded-lg text-sm bg-white"
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Home & Kitchen">Home & Kitchen</option>
                                    <option value="Apparel">Apparel</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block text-xs font-semibold mb-1">Price</label>
                                <input
                                    type="number"
                                    step="1"
                                    value={formData.price}
                                    onChange={(event) => handleChange('price', event.target.value)}
                                    readOnly={!isEditMode}
                                    className="w-full px-3.5 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block text-xs font-semibold mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(event) => handleChange('status', event.target.value)}
                                    disabled={!isEditMode}
                                    className="w-full px-3.5 py-2 border rounded-lg text-sm bg-white"
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>
                            {isEditMode && (
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
