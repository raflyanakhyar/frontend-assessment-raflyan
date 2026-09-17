import { useState } from 'react'

const CATEGORIES = ['Electronics', 'Home & Kitchen', 'Apparel']
const STATUSES = ['In Stock', 'Out of Stock']

const validateProduct = (product) => {
    const errors = {}
    const trimmedName = product.name.trim()
    const numericPrice = Number(product.price)

    if (!trimmedName) errors.name = 'Name is required.'
    if (!CATEGORIES.includes(product.category)) errors.category = 'Category is required.'
    if (!product.price || !Number.isFinite(numericPrice) || numericPrice <= 0) {
        errors.price = 'Price must be greater than 0.'
    }
    if (!STATUSES.includes(product.status)) errors.status = 'Status is required.'

    return { errors, trimmedName, numericPrice }
}

export default function Modal({
    product,
    mode,
    onClose,
    onSave,
    onDelete,
    onAdd,
    onError = () => {},
}) {
    const isEditMode = mode === 'edit'
    const isAddMode = mode === 'add'
    const isDeleteMode = mode === 'delete'
    const isFormMode = isEditMode || isAddMode

    const [formData, setFormData] = useState(product)
    const [errors, setErrors] = useState({})
    const [touchedFields, setTouchedFields] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isFormInvalid = Object.keys(validateProduct(formData).errors).length > 0

    const handleChange = (field, value) => {
        const nextFormData = { ...formData, [field]: value }
        const fieldError = validateProduct(nextFormData).errors[field] || ''

        setFormData(nextFormData)
        setTouchedFields((currentFields) => ({ ...currentFields, [field]: true }))
        setErrors((currentErrors) => ({ ...currentErrors, [field]: fieldError }))
    }

    const handleBlur = (field) => {
        const fieldError = validateProduct(formData).errors[field] || ''

        setTouchedFields((currentFields) => ({ ...currentFields, [field]: true }))
        setErrors((currentErrors) => ({ ...currentErrors, [field]: fieldError }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const { errors: nextErrors, trimmedName, numericPrice } = validateProduct(formData)
        setTouchedFields({ name: true, category: true, price: true, status: true })
        setErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) return

        setIsSubmitting(true)
        const normalizedProduct = { ...formData, name: trimmedName, price: numericPrice }

        try {
            if (isAddMode) {
                await onAdd({
                    ...normalizedProduct,
                    createdAt: new Date().toISOString(),
                })
            } else {
                await onSave(normalizedProduct)
            }
        } catch (submitError) {
            const message = submitError.message || 'Failed to save product.'
            setErrors({ form: message })
            onError(message)
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/50 p-4">
                <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {isAddMode
                                ? 'Add Product'
                                : isEditMode
                                  ? 'Edit Product'
                                  : isDeleteMode
                                    ? 'Delete Product'
                                    : 'Product Details'}
                        </h2>
                        <button type="button" onClick={onClose} className="hover:scale-105">
                            Close
                        </button>
                    </div>
                    {isDeleteMode ? (
                        <div>
                            <p className="mb-6 text-sm text-slate-600">
                                Are you sure you want to delete {product.name}?
                            </p>
                            {errors.form && (
                                <p className="mb-3 text-xs text-red-600">{errors.form}</p>
                            )}
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
                                    onClick={async () => {
                                        setIsSubmitting(true)
                                        try {
                                            await onDelete(product)
                                        } catch (submitError) {
                                            const message =
                                                submitError.message || 'Failed to delete product.'
                                            setErrors({
                                                form: message,
                                            })
                                            onError(message)
                                            setIsSubmitting(false)
                                        }
                                    }}
                                    disabled={isSubmitting}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                                    onBlur={() => handleBlur('name')}
                                    readOnly={!isFormMode}
                                    required={isFormMode}
                                    className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none transition ${!isFormMode ? 'cursor-not-allowed bg-slate-50' : ''}`}
                                />
                                {touchedFields.name && errors.name && (
                                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="block text-xs font-semibold mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(event) =>
                                        handleChange('category', event.target.value)
                                    }
                                    onBlur={() => handleBlur('category')}
                                    disabled={!isFormMode}
                                    required={isFormMode}
                                    className={`w-full px-3.5 py-2 border rounded-lg text-sm ${!isFormMode ? 'cursor-not-allowed bg-slate-50' : ''}`}
                                >
                                    <option value="">Select category</option>
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {touchedFields.category && errors.category && (
                                    <p className="mt-1 text-xs text-red-600">{errors.category}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="block text-xs font-semibold mb-1">Price</label>
                                <input
                                    type="number"
                                    step="1"
                                    value={formData.price}
                                    onChange={(event) => handleChange('price', event.target.value)}
                                    onBlur={() => handleBlur('price')}
                                    readOnly={!isFormMode}
                                    required={isFormMode}
                                    className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none transition ${!isFormMode ? 'cursor-not-allowed bg-slate-50' : ''}`}
                                />
                                {touchedFields.price && errors.price && (
                                    <p className="mt-1 text-xs text-red-600">{errors.price}</p>
                                )}
                            </div>
                            <div className="mb-5">
                                <label className="block text-xs font-semibold mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(event) => handleChange('status', event.target.value)}
                                    onBlur={() => handleBlur('status')}
                                    disabled={!isFormMode}
                                    required={isFormMode}
                                    className={`w-full px-3.5 py-2 border rounded-lg text-sm ${!isFormMode ? 'cursor-not-allowed bg-slate-50' : ''}`}
                                >
                                    {STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {touchedFields.status && errors.status && (
                                    <p className="mt-1 text-xs text-red-600">{errors.status}</p>
                                )}
                            </div>
                            {isFormMode && (
                                <>
                                    {errors.form && (
                                        <p className="mb-2 text-xs text-red-600">{errors.form}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isFormInvalid || isSubmitting}
                                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isSubmitting
                                            ? 'Saving...'
                                            : isAddMode
                                              ? 'Add Product'
                                              : 'Save Changes'}
                                    </button>
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
