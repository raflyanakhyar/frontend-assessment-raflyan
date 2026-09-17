import { useMemo, useState } from 'react'
import ButtonAction from './ButtonAction'
import Badge from './Badge'
import Modal from './Modal'
import { CATEGORIES, STATUSES } from '../utils/constant'
import { LuSearch, LuPlus, LuTrash, LuPen, LuEye } from 'react-icons/lu'

const formatPrice = (value) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)

const formatDate = (value) =>
    new Date(value).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

const EMPTY_PRODUCT = { name: '', category: '', price: '', status: 'In Stock' }

const CATEGORY_COLORS = {
    Electronics: 'orange',
    'Home & Kitchen': 'blue',
    Apparel: 'violet',
}

const STATUS_COLORS = {
    'In Stock': 'green',
    'Out of Stock': 'red',
}

export default function ProductsTables({
    products,
    onCreateProduct,
    onUpdateProduct,
    onDeleteProduct,
    onNotify,
}) {
    const [filters, setFilters] = useState({ search: '', category: '', status: '' })
    const [modal, setModal] = useState(null)

    const filteredProducts = useMemo(() => {
        const search = filters.search.trim().toLowerCase()

        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(search)
            const matchesCategory = !filters.category || product.category === filters.category
            const matchesStatus = !filters.status || product.status === filters.status

            return matchesSearch && matchesCategory && matchesStatus
        })
    }, [products, filters])

    console.log(products)

    const updateFilter = (field, value) => {
        setFilters((current) => ({ ...current, [field]: value }))
    }

    const openModal = (product, mode) => setModal({ product, mode })
    const closeModal = () => setModal(null)

    const handleSave = async (product) => {
        if (modal.mode === 'add') {
            await onCreateProduct(product)
            onNotify('success', 'Product added successfully.')
        } else {
            await onUpdateProduct(product)
            onNotify('success', 'Product updated successfully.')
        }
        closeModal()
    }

    const handleDelete = async (product) => {
        if (onDeleteProduct) await onDeleteProduct(product)
        onNotify('success', 'Product deleted successfully.')
        closeModal()
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-200 p-3 sm:p-4">
                <ButtonAction
                    label="Add Product"
                    icon={<LuPlus aria-hidden="true" />}
                    onClick={() => openModal(EMPTY_PRODUCT, 'add')}
                />
            </div>
            <ProductFilters filters={filters} onChange={updateFilter} />
            <div className="overflow-x-auto">
                <table className="w-full min-w-212.5">
                    <caption className="sr-only">Products</caption>
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-left">
                            {['Name', 'Category', 'Price', 'Status', 'Created'].map((heading) => (
                                <th key={heading} className="px-6 py-4 text-xs">
                                    {heading}
                                </th>
                            ))}
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
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                    onAction={openModal}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {modal && (
                <Modal
                    product={modal.product}
                    mode={modal.mode}
                    onClose={closeModal}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onError={(message) => onNotify('error', message)}
                />
            )}
        </div>
    )
}

function ProductRow({ product, onAction }) {
    return (
        <tr className="border-b border-slate-100">
            <td className="px-6 py-4">{product.name}</td>
            <td className="px-6 py-4">
                <Badge title={product.category} color={CATEGORY_COLORS[product.category]} />
            </td>
            <td className="px-6 py-4">{formatPrice(product.price)}</td>
            <td className="px-6 py-4">
                <Badge title={product.status} color={STATUS_COLORS[product.status]} />
            </td>
            <td className="px-6 py-4">{product.createdAt ? formatDate(product.createdAt) : '-'}</td>
            <td className="px-4 py-4 sm:px-6">
                <div className="flex min-w-max gap-2">
                    <ButtonAction
                        label="View"
                        icon={<LuEye aria-hidden="true" />}
                        onClick={() => onAction(product, 'view')}
                    />
                    <ButtonAction
                        label="Edit"
                        icon={<LuPen aria-hidden="true" />}
                        onClick={() => onAction(product, 'edit')}
                    />
                    <ButtonAction
                        label="Delete"
                        icon={<LuTrash aria-hidden="true" />}
                        onClick={() => onAction(product, 'delete')}
                    />
                </div>
            </td>
        </tr>
    )
}

function ProductFilters({ filters, onChange }) {
    return (
        <div className="grid gap-3 border-b border-slate-200 p-3 sm:grid-cols-3 sm:p-4">
            <div className="relative">
                <LuSearch
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                />
                <input
                    type="search"
                    value={filters.search}
                    onChange={(event) => onChange('search', event.target.value)}
                    placeholder="Search product..."
                    aria-label="Search products"
                    className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm"
                />
            </div>
            <FilterSelect
                value={filters.category}
                onChange={(value) => onChange('category', value)}
                label="Filter by category"
                emptyLabel="All categories"
                options={CATEGORIES}
            />
            <FilterSelect
                value={filters.status}
                onChange={(value) => onChange('status', value)}
                label="Filter by status"
                emptyLabel="All statuses"
                options={STATUSES}
            />
        </div>
    )
}

function FilterSelect({ value, onChange, label, emptyLabel, options }) {
    return (
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={label}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
            <option value="">{emptyLabel}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}
