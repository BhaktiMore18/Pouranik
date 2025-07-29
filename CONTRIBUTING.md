## Getting Started

### 1. Fork the Repository

Click the `Fork` button on the top-right to create your own copy.

### 2. Clone the Repo

```bash
git clone https://github.com/BhaktiMore18/pouranik.git
cd pouranik
```

### 3. Install Dependencies

```bash
#for frontend
cd frontend
npm install

#for backend
cd backend
npm install
```

### 4. Add your Environmental Variables

Create a .env file:

```bash
VITE_GOOGLE_BOOKS_API_KEY=your_api_key
VITE_BACKEND_URL=https://pouranik.onrender.com
```

### 5. Run the Dev Server

```bash
npm run dev
```

Go to `http://localhost:5173` and explore Pouranik!

---

## Contributing to Pouranik

We welcome all contributors! Whether you're a beginner or experienced dev, there's always something you can do.

### You Can Contribute By:

- Adding UI components
- Improving CSS/ responsiveness
- Creating or editing content (genres, book data)
- Fixing bugs or typos
- Writing documentation
- Adding a new feature (like messaging or timer)

### Our Git Workflow

1. Pick an issue from the Issues tab (or open a new one!)
2. Comment to get assigned
3. Create a new branch:

```bash
git checkout -b fix/your-feature-name
```

4. Make your changes and push:

```bash
git push origin fix/your-feature-name
```

5. Open a Pull Request to `main` branch.

> Make sure to **link your PR to the issue** mentioning **Fixes #issue_number** in the description.
