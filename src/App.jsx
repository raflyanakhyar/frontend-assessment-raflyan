import { Flex, Space, Table, Tag } from 'antd'
import data from './data.json'

const colors = ['blue', 'magenta', 'cyan', 'purple']

const categories = [...new Set(data.products.map((product) => product.category))]

const columns = [
    {
        title: 'No',
        key: 'no',
        render: (text, record, index) => {
            return index + 1
        },
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => {
            const color = colors[categories.indexOf(category)]
            return (
                <Flex gap="small" align="center" wrap>
                    <Tag color={color}>{category?.toUpperCase()}</Tag>
                </Flex>
            )
        },
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) =>
            Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(text),
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (text) => {
            const color = text === 'In Stock' ? 'green' : 'volcano'

            return (
                <Flex gap="small" align="center" wrap>
                    <Tag color={color}>{text.toUpperCase()}</Tag>
                </Flex>
            )
        },
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) =>
            Intl.DateTimeFormat('id-ID', {
                dateStyle: 'medium',
            }).format(new Date(text)),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="medium">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
]

function App() {
    return (
        <>
            <div className="flex justify-center items-center h-screen p-5 bg-gray-100">
                <Table columns={columns} dataSource={data.products} />
            </div>
        </>
    )
}

export default App
