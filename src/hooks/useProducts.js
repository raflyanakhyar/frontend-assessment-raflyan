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

    return { products, isLoading, error }
}
