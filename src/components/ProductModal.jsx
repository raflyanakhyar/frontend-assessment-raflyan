import { useState } from 'react'
import { LuX } from 'react-icons/lu'
import ModalDeleteConfirmation from './ModalDeleteConfirmation'
import ProductForm from './ProductForm'
import { CATEGORIES, STATUSES } from '../utils/constant'

const MODE_TITLES = {
    add: 'Add Product',
    edit: 'Edit Product',
    delete: 'Delete Product',
    view: 'Product Details',
}

const FORM_FIELDS = ['name', 'category', 'price', 'status']

const getInitialProduct = (product = {}) => ({
    ...product,
    name: product.name ?? '',
    category: product.category ?? '',
    price: product.price ?? '',
    status: product.status ?? 'In Stock',
})

const validateProduct = (product) => {
    const errors = {}
    const name = String(product.name ?? '').trim()
    const price = Number(product.price)

    if (!name) errors.name = 'Name is required.'
    if (!CATEGORIES.includes(product.category)) errors.category = 'Category is required.'
    if (!product.price || !Number.isFinite(price) || price <= 0) {
        errors.price = 'Price must be greater than 0.'
    }
    if (!STATUSES.includes(product.status)) errors.status = 'Status is required.'

    return { errors, normalizedProduct: { ...product, name, price } }
}

export default function ProductModal({ product, mode, onClose, onSave, onDelete, onError }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [formData, setFormData] = useState(() => getInitialProduct(product))
    const [fieldErrors, setFieldErrors] = useState({})
    const [touchedFields, setTouchedFields] = useState({})
    const isDeleteMode = mode === 'delete'
    const isViewMode = mode === 'view'

    const updateField = (field, value) => {
        const nextFormData = { ...formData, [field]: value }
        const fieldError = validateProduct(nextFormData).errors[field] || ''

        setFormData(nextFormData)
        setTouchedFields((current) => ({ ...current, [field]: true }))
        setFieldErrors((current) => ({ ...current, [field]: fieldError }))
    }

    const validateField = (field) => {
        const fieldError = validateProduct(formData).errors[field] || ''

        setTouchedFields((current) => ({ ...current, [field]: true }))
        setFieldErrors((current) => ({ ...current, [field]: fieldError }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const { errors, normalizedProduct } = validateProduct(formData)
        setTouchedFields(Object.fromEntries(FORM_FIELDS.map((field) => [field, true])))
        setFieldErrors(errors)

        if (Object.keys(errors).length > 0) return

        await handleSave(normalizedProduct)
    }

    const handleSave = async (nextProduct) => {
        setIsSubmitting(true)
        setSubmitError('')

        try {
            const productToSave =
                mode === 'add'
                    ? { ...nextProduct, createdAt: new Date().toISOString() }
                    : nextProduct
            await onSave(productToSave)
        } catch (error) {
            handleError(error, 'Failed to save product.')
        }
    }

    const handleDelete = async () => {
        setIsSubmitting(true)
        setSubmitError('')

        try {
            await onDelete(product)
        } catch (error) {
            handleError(error, 'Failed to delete product.')
        }
    }

    const handleError = (error, fallbackMessage) => {
        const message = error instanceof Error ? error.message : fallbackMessage
        setSubmitError(message)
        setIsSubmitting(false)
        onError(message)
    }

    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
        >
            <div className="my-auto max-h-[calc(100vh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:max-h-none sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                    <h2 id="product-modal-title" className="text-xl font-semibold">
                        {MODE_TITLES[mode] || MODE_TITLES.view}
                    </h2>
                    <button
                        type="button"
                        aria-label="Close dialog"
                        onClick={onClose}
                        className="rounded p-1 hover:bg-slate-100"
                    >
                        <LuX aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                {isDeleteMode ? (
                    <ModalDeleteConfirmation
                        product={product}
                        error={submitError}
                        isSubmitting={isSubmitting}
                        onCancel={onClose}
                        onConfirm={handleDelete}
                    />
                ) : (
                    <ProductForm
                        product={formData}
                        errors={fieldErrors}
                        touchedFields={touchedFields}
                        disabled={isViewMode}
                        formError={submitError}
                        isSubmitting={isSubmitting}
                        submitLabel={mode === 'add' ? 'Add Product' : 'Save Changes'}
                        onChange={updateField}
                        onBlur={validateField}
                        onSubmit={handleFormSubmit}
                    />
                )}
            </div>
        </div>
    )
}
