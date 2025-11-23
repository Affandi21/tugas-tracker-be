# 🚀 Tugas Tracker - Backend API

## 🎯 Overview

**Tugas Tracker Backend** adalah REST API yang menyediakan endpoints untuk mengelola mata kuliah dan tugas mahasiswa. Dibangun dengan Node.js, Express, dan Prisma ORM, API ini dirancang untuk scalable, maintainable, dan mudah di-deploy.

### ✨ Highlights

- 🚀 **Fast & Lightweight** - Built with Express.js
- 🗄️ **Prisma ORM** - Type-safe database access
- 📝 **RESTful Design** - Clean & predictable endpoints
- 🔒 **Data Validation** - Request validation & error handling
- 🔄 **CORS Enabled** - Ready for frontend integration
- 📊 **SQLite/PostgreSQL** - Flexible database options

---

## 🚀 Features

### 📚 Mata Kuliah (Courses) API
- ✅ Create new course
- ✅ Get all courses (with/without tasks)
- ✅ Get single course by ID
- ✅ Update course details
- ✅ Delete course (cascade delete tasks)

### 📝 Tugas (Tasks) API
- ✅ Create new task
- ✅ Get all tasks (with filters)
- ✅ Get single task by ID
- ✅ Update task (including status)
- ✅ Delete task

### 🛡️ Additional Features
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Query parameters support
- ✅ Cascade delete operations
- ✅ Timestamps (createdAt, updatedAt)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| 📦 **Node.js** | 18.x | JavaScript runtime |
| ⚡ **Express.js** | 4.x | Web framework |
| 🗄️ **Prisma** | 5.x | ORM & database toolkit |
| 💾 **SQLite** | 3.x | Database (dev) |
| 🔄 **CORS** | 2.x | Cross-origin requests |
| 🔧 **dotenv** | 16.x | Environment variables |
| 👀 **Nodemon** | 3.x | Hot reload (dev) |

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Affandi21/tugas-tracker-be.git
cd tugas-tracker-be
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

4. **Generate Prisma Client**
```bash
npx prisma generate
```

5. **Run database migrations**
```bash
npx prisma migrate dev --name init
```

6. **Start development server**
```bash
npm run dev
```

Server will run at `http://localhost:5000`

---

## 📂 Project Structure

```
tugas-tracker-be/
├── prisma/
│   ├── schema.prisma
│   └── dev.db               
├── src/
│   ├── controllers/
│   │   ├── matkulController.js   
│   │   └── tugasController.js    
│   ├── routes/
│   │   ├── matkulRoutes.js        
│   │   └── tugasRoutes.js         
│   └── index.js                   
├── .env                      
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄️ Database Schema

### MataKuliah (Courses)

```prisma
model MataKuliah {
  id        String   @id @default(uuid())
  nama      String
  deskripsi String?
  sks       Int      @default(3)
  tugas     Tugas[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Fields:**
- `id` - UUID (auto-generated)
- `nama` - Course name (required)
- `deskripsi` - Description (optional)
- `sks` - Credits (default: 3)
- `tugas` - Relation to tasks
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Tugas (Tasks)

```prisma
model Tugas {
  id            String      @id @default(uuid())
  nama          String
  deskripsi     String?
  deadline      DateTime?
  status        StatusTugas @default(BELUM_DIKERJAKAN)
  mataKuliahId  String
  mataKuliah    MataKuliah  @relation(fields: [mataKuliahId], references: [id], onDelete: Cascade)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}
```

**Fields:**
- `id` - UUID (auto-generated)
- `nama` - Task name (required)
- `deskripsi` - Description (optional)
- `deadline` - Due date (optional)
- `status` - Task status (enum)
- `mataKuliahId` - Foreign key to course
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### StatusTugas (Task Status Enum)

```prisma
enum StatusTugas {
  BELUM_DIKERJAKAN  // Not started
  SEDANG_DIKERJAKAN // In progress
  SELESAI           // Completed
}
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### 📚 Mata Kuliah Endpoints

#### 1. Get All Courses

```http
GET /api/matkul
```

**Query Parameters:**
- `include` (optional) - Include related data
  - `tugas` - Include tasks

**Response:**
```json
[
  {
    "id": "uuid-here",
    "nama": "Data Structures",
    "deskripsi": "Class B",
    "sks": 4,
    "tugas": [...],
    "_count": {
      "tugas": 5
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

#### 2. Get Course by ID

```http
GET /api/matkul/:id
```

**Query Parameters:**
- `include` (optional) - `tugas`

**Response:**
```json
{
  "id": "uuid-here",
  "nama": "Data Structures",
  "deskripsi": "Class B",
  "sks": 4,
  "tugas": [
    {
      "id": "task-uuid",
      "nama": "Lab 1",
      "status": "BELUM_DIKERJAKAN",
      ...
    }
  ],
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

---

#### 3. Create Course

```http
POST /api/matkul
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama": "Data Structures",
  "deskripsi": "Class B - Prof. Smith",
  "sks": 4
}
```

**Response:** `201 Created`
```json
{
  "id": "new-uuid",
  "nama": "Data Structures",
  "deskripsi": "Class B - Prof. Smith",
  "sks": 4,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

---

#### 4. Update Course

```http
PUT /api/matkul/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama": "Advanced Data Structures",
  "deskripsi": "Updated description",
  "sks": 4
}
```

**Response:** `200 OK`

---

#### 5. Delete Course

```http
DELETE /api/matkul/:id
```

**Response:** `204 No Content`

**Note:** Deletes all related tasks (cascade)

---

### 📝 Tugas Endpoints

#### 1. Get All Tasks

```http
GET /api/tugas
```

**Query Parameters:**
- `mataKuliahId` (optional) - Filter by course ID
- `status` (optional) - Filter by status

**Response:**
```json
[
  {
    "id": "task-uuid",
    "nama": "Lab Report #1",
    "deskripsi": "Implement BST",
    "deadline": "2025-12-01T00:00:00.000Z",
    "status": "BELUM_DIKERJAKAN",
    "mataKuliahId": "course-uuid",
    "mataKuliah": {
      "id": "course-uuid",
      "nama": "Data Structures",
      ...
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

#### 2. Get Task by ID

```http
GET /api/tugas/:id
```

**Response:** Single task object

---

#### 3. Create Task

```http
POST /api/tugas
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama": "Lab Report #1",
  "deskripsi": "Implement Binary Search Tree",
  "deadline": "2025-12-01T00:00:00.000Z",
  "mataKuliahId": "course-uuid",
  "status": "BELUM_DIKERJAKAN"
}
```

**Validation:**
- `nama` - Required
- `mataKuliahId` - Required & must exist
- `status` - Default: `BELUM_DIKERJAKAN`

**Response:** `201 Created`

---

#### 4. Update Task

```http
PUT /api/tugas/:id
Content-Type: application/json
```

**Request Body:** (All fields optional)
```json
{
  "nama": "Updated name",
  "deskripsi": "Updated description",
  "deadline": "2025-12-15T00:00:00.000Z",
  "status": "SEDANG_DIKERJAKAN"
}
```

**Response:** `200 OK`

---

#### 5. Delete Task

```http
DELETE /api/tugas/:id
```

**Response:** `204 No Content`

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Server Configuration
PORT=5000

# CORS Configuration
FRONTEND_URL="http://localhost:5173"

# For Production (PostgreSQL example)
# DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

---

## 🎯 Available Scripts

### Development
```bash
npm run dev          # Start with nodemon (hot reload)
npm start            # Start production server
```

### Database
```bash
npx prisma generate         # Generate Prisma Client
npx prisma migrate dev      # Run migrations
npx prisma studio          # Open Prisma Studio GUI
npx prisma db push         # Push schema changes
```

### Production
```bash
npm start            # Start server without hot reload
```

---

## 🛡️ Error Handling

### Error Response Format

```json
{
  "error": "Error message here"
}
```

### Common HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET/PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal error |

---

## 🔒 CORS Configuration

CORS is enabled for the frontend URL specified in `.env`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
```

For production, update `FRONTEND_URL` to your deployed frontend URL.

---

## 🗄️ Database Management

### Using Prisma Studio

Visual database browser:
```bash
npx prisma studio
```

Opens at `http://localhost:5555`

### Migrations

Create a new migration:
```bash
npx prisma migrate dev --name description_of_changes
```

Reset database:
```bash
npx prisma migrate reset
```

### Switching to PostgreSQL

1. Update `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/tugas_tracker"
```

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Run migrations:
```bash
npx prisma migrate dev
```

---


## 👨‍💻 Author

**Your Name**
- GitHub: [@Affandi21](https://github.com/Affandi21)

---

## 🙏 Acknowledgments

- RISTEK Fasilkom UI - Open Class Web Development 2025
- Express.js community
- Prisma team

---
