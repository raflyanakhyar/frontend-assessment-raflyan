import { useEffect, useState } from 'react'

const API_URL =
    'https://my-json-server.typicode.com/raflyanakhyar/frontend-assessment-raflyan/products'

export default function useProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                setError('')

                const response = await fetch(API_URL)
                if (!response.ok) {
                    throw new Error(`Failed to fetch products (${response.status})`)
                }

                const data = await response.json()
                setProducts(data)
            } catch (fetchError) {
                setError(fetchError.message || 'Failed to fetch products.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const createProduct = async (product) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })

        if (!response.ok) {
            throw new Error(`Failed to create product (${response.status})`)
        }

        const createdProduct = await response.json()
        setProducts((currentProducts) => [...currentProducts, createdProduct])
        return createdProduct
    }

    const updateProduct = async (product) => {
        const response = await fetch(`${API_URL}/${product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })

        if (response.status === 404) {
            setProducts((currentProducts) =>
                currentProducts.map((currentProduct) =>
                    currentProduct.id === product.id ? product : currentProduct,
                ),
            )
            return product
        }

        if (!response.ok) {
            throw new Error(`Failed to update product (${response.status})`)
        }

        const updatedProduct = await response.json()
        setProducts((currentProducts) =>
            currentProducts.map((currentProduct) =>
                currentProduct.id === updatedProduct.id ? updatedProduct : currentProduct,
            ),
        )
        return updatedProduct
    }

    const deleteProduct = async (product) => {
        const response = await fetch(`${API_URL}/${product.id}`, { method: 'DELETE' })

        if (response.status === 404) {
            setProducts((currentProducts) =>
                currentProducts.filter((currentProduct) => currentProduct.id !== product.id),
            )
            return
        }

        if (!response.ok) {
            throw new Error(`Failed to delete product (${response.status})`)
        }

        setProducts((currentProducts) =>
            currentProducts.filter((currentProduct) => currentProduct.id !== product.id),
        )
    }

    return { products, isLoading, error, createProduct, updateProduct, deleteProduct }
}
