import ProductsTables from './components/ProductsTable'
import products from '../db.json'

function App() {
    return (
        <>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-7 space-y-4">
                <ProductsTables products={products.products} />
            </main>
        </>
    )
}

export default App
