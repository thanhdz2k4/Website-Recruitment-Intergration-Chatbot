// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = {
  // Verify JWT token
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Không tìm thấy token xác thực'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.user = decoded; // Lưu thông tin user vào request
      next();

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token đã hết hạn'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ'
      });
    }
  },

  // Check role
  checkRole: (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Chưa xác thực'
        });
      }

      const userRoles = req.user.roles || [];
      const hasPermission = allowedRoles.some(role => userRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập'
        });
      }

      next();
    };
  }
};

module.exports = authMiddleware;