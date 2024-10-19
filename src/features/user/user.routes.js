import express from "express"
import { getUserLogin, userLogout,getUserRegistration, userLogin, userRegisteration } from "./user.controller.js";
const router = express.Router()




router.get("/register",getUserRegistration)
router.post("/register",userRegisteration)
router.get("/login",getUserLogin)
router.post("/login",userLogin)
router.get("/logout",userLogout)
export default router;