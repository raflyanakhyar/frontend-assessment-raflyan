import ProductsTables from './components/ProductsTable'
import ProductLoader from './components/ProductLoader'
import Toast from './components/Toast'
import useProducts from './hooks/useProducts'
import { useCallback, useState } from 'react'

function App() {
    const [toast, setToast] = useState(null)
    const { products, isLoading, error, createProduct, updateProduct, deleteProduct } =
        useProducts()

    const showToast = useCallback((type, message) => {
        setToast({ type, message })
    }, [])

    const closeToast = useCallback(() => setToast(null), [])

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-7 space-y-4">
                {isLoading && <ProductLoader />}
                {error && <p className="text-center text-red-600">{error}</p>}
                {!isLoading && !error && (
                    <ProductsTables
                        products={products}
                        onCreateProduct={createProduct}
                        onUpdateProduct={updateProduct}
                        onDeleteProduct={deleteProduct}
                        onNotify={showToast}
                    />
                )}
            </main>
            <Toast toast={toast} onClose={closeToast} />
        </>
    )
}

export default App
