import ProductsTable from './components/ProductsTable'
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
            <main className="mx-auto h-screen sm:px-6 lg:px-8 bg-gray-200">
                <div className="flex justify-center items-center h-30">
                    <h1 className="text-3xl font-bold text-gray-800">
                        E-Commerce Product Dashboard
                    </h1>
                </div>
                {isLoading && <ProductLoader />}
                {error && <p className="text-center text-red-600">{error}</p>}
                {!isLoading && !error && (
                    <div className="flex justify-center items-center">
                        <ProductsTable
                            products={products}
                            onCreateProduct={createProduct}
                            onUpdateProduct={updateProduct}
                            onDeleteProduct={deleteProduct}
                            onNotify={showToast}
                        />
                    </div>
                )}
            </main>
            <Toast toast={toast} onClose={closeToast} />
        </>
    )
}

export default App
