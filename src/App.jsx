import ProductsTables from './components/ProductsTable'
import products from '../db.json'

function App() {
    return (
        <>
            <div className="flex flex-col min-h-screen justify-center items-center gap-5">
                <ProductsTables products={products.products} />
            </div>
        </>
    )
}

export default App
