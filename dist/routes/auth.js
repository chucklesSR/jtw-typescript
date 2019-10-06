"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.post('/api/auth/singin', auth_controller_1.singin);
router.post('/api/auth/singup', auth_controller_1.singup);
router.get('/api/auth/profile', verifyToken_1.Tokenvalidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map