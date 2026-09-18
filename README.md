# Junior Frontend Developer Technical Assessment

This application built for the Junior Frontend Developer Technical Assessment BIAENERGI

This application helps users manage a product list in one dashboard. Users can search and filter products, view product details, add new products, edit existing products, and delete products with confirmation.

## Setup

### Requirements

- Bun 1.1 or newer

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

Other commands:

```bash
bun run build    # Create a production build
bun run preview  # Preview the production build
bun run lint     # Run ESLint
```

## API Endpoint

### Base Endpoint

```text
https://my-json-server.typicode.com/raflyanakhyar/frontend-assessment-raflyan/products
```

### API Routes

| Method   | Route           | Purpose            |
| -------- | --------------- | ------------------ |
| `GET`    | `/products`     | Fetch all products |
| `POST`   | `/products`     | Add a new product  |
| `PUT`    | `/products/:id` | Update a product   |
| `DELETE` | `/products/:id` | Delete a product   |

The full item URL follows this format:

```text
https://my-json-server.typicode.com/raflyanakhyar/frontend-assessment-raflyan/products/:id
```

The application uses the collection endpoint to fetch initial data and create products, and the item endpoint for update and delete requests.

Because this is a mock API, changes made through `POST`, `PUT`, and `DELETE` are not guaranteed to persist. The endpoint may also return `404` for update/delete requests. The application handles those `404` responses by updating local React state so the demo remains usable during the current session.

## Architecture Overview

```text
src/
├── App.jsx                         Application shell and global toast state
├── main.jsx                        Entry point React
├── index.css                       Tailwind CSS import
├── components/
│   ├── ProductsTable.jsx            Table, filters, and product actions
│   ├── ProductModal.jsx             View, add, edit, and delete modal
│   ├── ProductForm.jsx              Reusable product form with validation
│   ├── ModalDeleteConfirmation.jsx  Delete confirmation
│   ├── ButtonAction.jsx             Reusable action button
│   ├── Badge.jsx                    Category and status badges
│   ├── ProductLoader.jsx             Loading spinner and skeleton
│   └── Toast.jsx                    Success and error notifications
├── hooks/
│   └── useProducts.js               Fetch and CRUD API operations
└── utils/
	└── constant.js                  Valid categories and statuses
```

### Key Components and Data Flow

1. `useProducts` fetches the product list and provides create, update, and delete functions.
2. `App` manages loading state, error state, and global toast state.
3. `ProductsTable` renders the data, search, category/status filters, and action buttons.
4. `ProductModal` selects the view, add, edit, or delete mode.
5. `ProductForm` handles reusable inputs and field-level validation on change/blur.
6. `ProductLoader` is shown during the initial fetch, while `Toast` displays operation results.

## Decisions and Trade-offs

- **Local React state:** `useState` and a custom hook were chosen because the application is small and does not need a state management library such as Redux or Zustand.
- **Shared modal and form:** View, add, and edit reuse the same modal. The form is extracted into `ProductForm` to avoid duplicating inputs and validation.
- **Response-first update:** The table updates after a successful API response, avoiding a false success state when a request fails.
- **404 fallback:** The mock API may return `404` for update/delete requests. Those operations fall back to React state, with the trade-off that changes are not persisted after a full page refresh.
- **Inline validation:** Errors are shown per field after the field is touched or the form is submitted. The submit button is disabled while a request is in progress.

## Improvements With More Time

- Replace the mock API with a real backend and database for persistent CRUD operations.
- Add automated tests for validation, filtering, CRUD, loading, and error states.
- Add pagination or server-side filtering for larger product collections.
- Add a retry action when a request fails.
- Improve focus management and keyboard navigation in the modal.
