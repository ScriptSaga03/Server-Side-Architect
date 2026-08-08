import bcrypt from 'bcryptjs';

// Plain password "password123" ka runtime hashed version
const defaultPasswordHash = bcrypt.hashSync("password123", 10);

const users = [
    {
        id: "usr_admin_001",
        name: "Mehtab Admin",
        email: "admin@gmail.com",
        password: defaultPasswordHash, 
        role: "admin",
        isBlocked: false,
        passwordChangedAt: null,
        createdAt: "2026-08-01T10:00:00.000Z",
        updatedAt: Date.now()
    },
    {
        id: "usr_user_002",
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        password: defaultPasswordHash, 
        role: "manager",
        isBlocked: false,
        passwordChangedAt: null,
        createdAt: "2026-08-02T11:00:00.000Z",
        updatedAt: Date.now()
    },
    {
        id: "usr_blocked_003",
        name: "Blocked User",
        email: "blocked@gmail.com",
        password: defaultPasswordHash, 
        role: "user",
        isBlocked: true,
        passwordChangedAt: null,
        createdAt: "2026-08-03T12:00:00.000Z",
        updatedAt: Date.now()
    }
];

export default users;