export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied: No role assigned" });
    }

    // ✅ Ensure role is checked in uppercase
    const userRole = req.user.role.toUpperCase(); // Convert role to uppercase

    if (!allowedRoles.map(role => role.toUpperCase()).includes(userRole)) {
      return res.status(403).json({ message: `Access denied: Requires ${allowedRoles.join(", ")} role(s)` });
    }

    next(); // ✅ User is authorized, move forward
  };
};