const express = require("express");
const router = express.Router();
const controllerUsers = require("../controllers/account");

router.get("/listAccount", controllerUsers.listAccount); //Lấy danh sách tài khoản
router.post("/postRegister", controllerUsers.postRegister); //Đăng ký
router.post("/postLogin", controllerUsers.postLogin); //Đăng nhập
router.delete("/deleteLogin/:id", controllerUsers.hardDeleteAccount); //Cập nhật hồ sơ
router.patch("/hardDeleteLogin/:id", controllerUsers.softDeleteAccount);
router.post("/forgot", controllerUsers.userForgot); //Quên mật khẩu
router.post("/otp", controllerUsers.userOtp); //Xác nhận OTP
router.post("/resetPassword", controllerUsers.userResetPassword); //Đặt lại mật khẩu

module.exports = router;
