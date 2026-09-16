import ProductsTables from './components/ProductsTable'
import useProducts from './hooks/useProducts'

function App() {
    const { products, isLoading, error } = useProducts()

    return (
        <>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-7 space-y-4">
                {isLoading && <p className="text-center text-slate-500">Loading products...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}
                {!isLoading && !error && <ProductsTables products={products} />}
            </main>
        </>
    )
}

export default App
