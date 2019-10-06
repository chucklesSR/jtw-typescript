import { Router } from "express";
import { profile, singin, singup } from "../controllers/auth.controller";
import { Tokenvalidation } from '../libs/verifyToken'

const router: Router = Router()

router.post('/api/auth/singin', singin)
router.post('/api/auth/singup', singup)

router.get('/api/auth/profile', Tokenvalidation, profile)


export default router