# CRUD App with ExpressJS and TypeScript

## Setup and Run
1. Install dependencies:  
```bash
npm install
```

2. Generate Prisma client:  
```bash
npx prisma generate
```

3. Configure environment variables:  
- Create a `.env` file in the root directory with the following content:  
```
DATABASE_URL="file:./dev.db"
PORT=3000
```

4. Run the development server:  
```bash
npm run dev
```

---

## **Endpoints**  
- **`POST /api/items`**: Create an item  
- **`GET /api/items`**: List all items  
- **`GET /api/items/:id`**: Get item by ID  
- **`PUT /api/items/:id`**: Update item by ID  
- **`DELETE /api/items/:id`**: Delete item by ID  

---

## **Example**  
### Create an Item  
```bash
mauduckg@MacBook-Pro-cua-uc crud-app % curl -X POST http://localhost:3000/api/items \
-H "Content-Type: application/json" \
-d '{"name": "Sample Item", "description": "This is a sample"}'
```
Response:  
```json
{
  "id": 1,
  "name": "Sample Item",
  "description": "This is a sample",
  "createdAt": "2025-02-23T03:00:01.591Z",
  "updatedAt": "2025-02-23T03:00:01.591Z"
}
```

### List All Items  
```bash
mauduckg@MacBook-Pro-cua-uc crud-app % curl -X GET http://localhost:3000/api/items
```
Response:  
```json
[
  {
    "id": 1,
    "name": "Sample Item",
    "description": "This is a sample",
    "createdAt": "2025-02-23T03:00:01.591Z",
    "updatedAt": "2025-02-23T03:00:01.591Z"
  }
]
```
