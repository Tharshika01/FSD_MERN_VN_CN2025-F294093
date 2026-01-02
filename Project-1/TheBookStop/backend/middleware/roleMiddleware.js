const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =================== PROTECT ===================
exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isBlocked)
      return res.status(403).json({ message: "Account blocked by Admin" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// =================== ADMIN ONLY ===================
exports.adminOnly = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "admin")
    return res.status(403).json({ message: "Admin only access" });

  next();
};

// =================== ROLE BASED ACCESS ===================
exports.authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role.toLowerCase();
    const allowedRoles = roles.map(r => r.toLowerCase());
    if (!userRole || !allowedRoles.includes(userRole))
      return res.status(403).json({ message: "Access Denied" });

    next();
  };
};
