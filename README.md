# Product Management Dashboard

Product management dashboard built with React, Vite, Tailwind CSS, and `react-icons`.
It supports viewing, adding, editing, deleting, searching, and filtering products.

## Setup

Requirements:

- Node.js 18 or newer
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Other commands:

```bash
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

### Environment Variables

No environment variables are required. The API URL is currently defined in
`src/hooks/useProducts.js`.

## Live API

The application reads and writes products through this my-json-server endpoint:

`https://my-json-server.typicode.com/raflyanakhyar/frontend-assessment-raflyan/products`

The endpoint is a mock API. `POST`, `PUT`, and `DELETE` responses may not be
persisted by the server, and update/delete requests can return `404`. The app
handles those update/delete `404` responses by applying the change to local
React state for the current session.

## Architecture

```text
src/
├── App.jsx                         Application shell and toast state
├── main.jsx                        React entry point
├── index.css                       Tailwind import
├── components/
│   ├── ProductsTable.jsx            Table, filters, and product actions
│   ├── ProductModal.jsx             Shared view/add/edit/delete modal
│   ├── ProductForm.jsx              Reusable validated product form
│   ├── ModalDeleteConfirmation.jsx  Delete confirmation content
│   ├── ButtonAction.jsx             Reusable action button
│   ├── Badge.jsx                    Category and status badges
│   ├── ProductLoader.jsx            Loading skeleton and spinner
│   └── Toast.jsx                    Success and error notifications
├── hooks/
│   └── useProducts.js               Fetch, create, update, and delete API logic
└── utils/
    └── constant.js                  Seeded categories and allowed statuses
```

### Data Flow

1. `useProducts` fetches the initial product list and exposes CRUD functions.
2. `App` owns the API loading/error state and global toast state.
3. `ProductsTable` owns table filters and opens the shared product modal.
4. `ProductModal` handles view, add, edit, and delete modes.
5. `ProductForm` validates fields inline on change and blur.
6. Successful actions update the table and display a toast notification.

## Decisions and Trade-offs

- **React state instead of a state library:** The feature scope is small, so
  `useState` and the `useProducts` hook keep state management simple and local.
- **Shared modal:** View, add, and edit reuse the same modal surface, while
  delete uses the modal's confirmation mode.
- **Field-level validation:** Validation is centralized in the product modal and
  errors are shown only after a field is touched or the form is submitted.
- **Response-first updates:** The table updates after a successful API response
  rather than assuming the request will succeed. This avoids showing a false
  success state, at the cost of a slightly slower visual update.
- **Mock API fallback:** Since the mock API can return `404` for update/delete,
  those operations fall back to the current React state. This keeps the demo
  usable but does not provide persistence across a full page refresh.
