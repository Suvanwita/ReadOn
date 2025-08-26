const express=require('express')
const {getBooks,getBook,createBook,updateBook,deleteBook}=require("../controllers/bookController")
const {protect,admin}=require("../middleware/authMiddleware")

const router=express.Router()

router.get("/",getBooks)
router.get("/:id",getBook)
router.post("/",protect,admin,createBook)
router.put("/:id",protect,admin,updateBook)
router.delete("/:id",protect,admin,deleteBook)

module.exports=router