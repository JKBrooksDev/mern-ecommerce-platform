const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // 🔥 NEW: Role system
    role: {
        type: String,
        enum: ["owner", "admin", "manager", "support", "user"],
        default: "user"
    },

    // 🔥 NEW: Fine‑grained permissions
    permissions: {
        manageProducts: { type: Boolean, default: false },
        manageOrders: { type: Boolean, default: false },
        manageUsers: { type: Boolean, default: false },
        viewAnalytics: { type: Boolean, default: false },
        manageAdmins: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model("User", userSchema);
