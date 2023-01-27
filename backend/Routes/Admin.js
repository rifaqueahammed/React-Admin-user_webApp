const express = require("express");

const router = express.Router();
const Admin = require("../Controllers/Admin");
const verifyAdmin = require("../Middlewares/veryfyAdmin")

router.post("/login",Admin.adminLogin);
router.get("/home",Admin.adminHome);
router.post("/blockuser",verifyAdmin.verifyToken,Admin.blockUser);
router.post("/unblockuser",verifyAdmin.verifyToken,Admin.unblockUser);
router.post("/useradd",verifyAdmin.verifyToken,Admin.userAdd);
router.post("/userEdit",verifyAdmin.verifyToken,Admin.userEdit);

module.exports = router;