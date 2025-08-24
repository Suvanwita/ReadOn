const express=require('express')
const {createOrder,getOrders,getOrder,updateStatus}=require("../controllers/orderController")
const {protect,admin}=require("../middleware/authMiddleware")

const router=express.Router()

router.post("/",protect,createOrder)
router.get("/",protect,getOrders)
router.get("/:id",protect,getOrder)
router.put("/:id/status",protect,admin,updateStatus)

module.exports=router


