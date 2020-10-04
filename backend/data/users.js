import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Mark",
        email: "mark@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Carl",
        email: "carl@example.com",
        password: bcrypt.hashSync("123456", 10),
    }
];

export default users