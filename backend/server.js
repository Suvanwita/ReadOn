const express=require('express')
const connectDB=require('./config/db')
const dotenv=require('dotenv')
const cors=require('cors')

dotenv.config()
connectDB()

const app=express()

app.use(express.json())
app.use(cors())

const authRoutes=require('./routes/authRoutes')
app.use("/api/auth",authRoutes)

const bookRoutes=require('./routes/bookRoutes')
app.use("/api/books",bookRoutes)

const cartRoutes=require('./routes/cartRoutes')
app.use("/api/cart",cartRoutes)

const orderRoutes=require('./routes/orderRoutes')
app.use("/api/orders",orderRoutes)

const userRoutes=require('./routes/userRoutes')
app.use("/api/users",userRoutes)


const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})
