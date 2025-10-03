// controllers/authController.js
const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  // Đăng nhập
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email và mật khẩu không được để trống'
        });
      }

      // Tìm account theo email
      const { data: account, error } = await supabase
        .from('account')
        .select(`
          *,
          account_account_type!inner(
            account_type_id,
            account_type(role_name)
          ),
          company(
            company_id,
            name,
            logo_url
          )
        `)
        .eq('email', email)
        .single();

      if (error || !account) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        });
      }

      // Kiểm tra status account
      if (account.status === 'banned') {
        return res.status(403).json({
          success: false,
          message: 'Tài khoản của bạn đã bị khóa'
        });
      }

      if (account.status === 'inactive') {
        return res.status(403).json({
          success: false,
          message: 'Tài khoản chưa được kích hoạt'
        });
      }

      // So sánh password
    //   const isPasswordValid = await bcrypt.compare(password, account.password);
      const isPasswordValid = password === account.password; // Tạm thời không mã hóa mật khẩu
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        });
      }

      // Lấy roles của user
      const roles = account.account_account_type.map(
        aat => aat.account_type.role_name
      );

      // Tạo JWT token
      const token = jwt.sign(
        {
          account_id: account.account_id,
          email: account.email,
          roles: roles
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Update updated_at
      await supabase
        .from('account')
        .update({ updated_at: new Date() })
        .eq('account_id', account.account_id);

      // Trả về response (không trả password)
      const { password: _, ...accountData } = account;

      res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          token,
          account: {
            ...accountData,
            roles
          }
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message
      });
    }
  },

  // Lấy thông tin user từ token
  getProfile: async (req, res) => {
    try {
      const account_id = req.user.account_id; // Từ middleware

      const { data: account, error } = await supabase
        .from('account')
        .select(`
          *,
          account_account_type!inner(
            account_type_id,
            account_type(role_name)
          ),
          company(
            company_id,
            name,
            logo_url,
            website
          )
        `)
        .eq('account_id', account_id)
        .single();

      if (error || !account) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tài khoản'
        });
      }

      const roles = account.account_account_type.map(
        aat => aat.account_type.role_name
      );

      const { password: _, ...accountData } = account;

      res.status(200).json({
        success: true,
        data: {
          ...accountData,
          roles
        }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server',
        error: error.message
      });
    }
  }
};

module.exports = authController;