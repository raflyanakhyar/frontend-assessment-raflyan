import { CATEGORIES, STATUSES } from '../utils/constant'

export default function ProductForm({
    product,
    errors = {},
    touchedFields = {},
    disabled = false,
    formError = '',
    isSubmitting = false,
    submitLabel,
    onChange,
    onBlur,
    onSubmit,
}) {
    return (
        <form onSubmit={onSubmit}>
            <FormField
                label="Name"
                name="name"
                value={product.name}
                error={touchedFields.name && errors.name}
                disabled={disabled || isSubmitting}
                onChange={onChange}
                onBlur={onBlur}
            />
            <FormField
                as="select"
                label="Category"
                name="category"
                value={product.category}
                error={touchedFields.category && errors.category}
                disabled={disabled || isSubmitting}
                onChange={onChange}
                onBlur={onBlur}
                options={CATEGORIES}
                placeholder="Select category"
            />
            <FormField
                label="Price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={product.price}
                error={touchedFields.price && errors.price}
                disabled={disabled || isSubmitting}
                onChange={onChange}
                onBlur={onBlur}
            />
            <FormField
                as="select"
                label="Status"
                name="status"
                value={product.status}
                error={touchedFields.status && errors.status}
                disabled={disabled || isSubmitting}
                onChange={onChange}
                onBlur={onBlur}
                options={STATUSES}
            />
            {!disabled && formError && <p className="mb-2 text-xs text-red-600">{formError}</p>}
            {!disabled && (
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : submitLabel}
                </button>
            )}
        </form>
    )
}

function FormField({
    as = 'input',
    label,
    name,
    value,
    error,
    disabled,
    onChange,
    onBlur,
    options = [],
    placeholder,
    ...inputProps
}) {
    const fieldProps = {
        id: name,
        name,
        value,
        disabled,
        onChange: (event) => onChange(name, event.target.value),
        onBlur: () => onBlur(name),
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? `${name}-error` : undefined,
        className: `w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
            disabled ? 'cursor-not-allowed bg-slate-50' : ''
        }`,
        ...inputProps,
    }

    return (
        <div className="mb-3">
            <label htmlFor={name} className="mb-1 block text-xs font-semibold">
                {label}
            </label>
            {as === 'select' ? (
                <select {...fieldProps}>
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input type={inputProps.type || 'text'} {...fieldProps} />
            )}
            {error && (
                <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    )
}
