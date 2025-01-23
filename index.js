import express  from 'express'
import bodyParser  from 'body-parser'
import {join, resolve} from "path"
import cookieParser  from 'cookie-parser'
import dotenv  from 'dotenv'
dotenv.config()

const app = express();

//import Routes 
import usersRoutes  from './src/features/users/use.routes.js'
import otpsRoutes  from './src/features/otp/otp.route.js'
import postsRoutes  from './src/features/posts/post.route.js'
import likesRoutes  from './src/features/like/like.route.js'
import commentRoutes  from './src/features/comment/comment.route.js'

//functions
import {connectDatabase}  from './src/database/mongoDb.js'
import {customErrorHandler, errorHandlerMiddleware} from "./src/middleware/errorHandler.middleware.js"

//middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(process.cwd(), 'public')));


//Routes 
app.use("/api/users", usersRoutes)
app.use("/api/otp", otpsRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/likes", likesRoutes)
app.use("/api/comments", commentRoutes)

app.get("*", (req,res, next)=>{
    throw new customErrorHandler(404, `No route found for '${req.originalUrl}'`)
})

app.use(errorHandlerMiddleware)

app.listen(4000, ()=>{
    console.log("Server is running on 4000")
    connectDatabase()
})