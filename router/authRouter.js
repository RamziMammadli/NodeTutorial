import express from 'express'
import { authUser, logoutUser, registerUser } from '../controller/userController.js'


const router = express.Router()

router.post('/auth', authUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)

export default router