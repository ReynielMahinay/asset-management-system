# Asset Management System

A full-stack application for managing, tracking, and assigning company assets with an intuitive dashboard and comprehensive reporting capabilities.

## 🎯 Features

- **Asset Management** - Create, update, and track company assets with detailed information
- **User & Employee Management** - Manage user accounts and employee profiles
- **Asset Assignment** - Assign assets to employees and track assignments
- **Dashboard** - Visual analytics with charts and asset statistics
- **Authentication** - Secure JWT-based user authentication
- **Role-Based Access** - Protected routes and user permissions
- **Responsive Design** - Mobile-friendly interface with Material-UI and Tailwind CSS

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Material-UI, Ant Design, Tailwind CSS, Styled Components
- **State Management**: React Query, React Context
- **Routing**: React Router v7
- **Database**: Supabase (PostgreSQL)
- **Visualization**: Recharts
- **Icons**: React Icons

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Database Client**: Supabase SDK & pg
- **CORS**: Enabled for cross-origin requests
- **Development**: Nodemon

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL database
- Supabase account

### Installation

```bash
# Install all dependencies
npm run install-all

# Start development servers (frontend & backend)
npm run dev

# Or run separately:
npm run frontend    # Runs on http://localhost:5173
npm run backend     # Runs on http://localhost:5000

Environment Variables
Create .env files in both frontend/ and backend/ directories:

**Backend (.env)**
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret
PORT=5000

**Frontend (.env)**
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
VITE_API_URL=http://localhost:5000


📦 Dependencies
See package.json files in respective directories for full dependency lists.

👤 Author
Reyniel Mahinay

📄 License
ISC


