import express  from 'express'
import bodyParser  from 'body-parser'
import swaggerUi from "swagger-ui-express"
import { readFileSync } from "fs"
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
import friendsRoutes  from './src/features/friends/friend.route.js'

//functions
import {connectDatabase}  from './src/database/mongoDb.js'
import {customErrorHandler, errorHandlerMiddleware} from "./src/middleware/errorHandler.middleware.js"
import logger from "./src/middleware/logger.middleware.js"

//Import swaggerJSON file
const swaggerJSONPath = resolve("./documentation/swagger.json");
const swaggerJSON = JSON.parse(readFileSync(swaggerJSONPath, "utf-8"));

//middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(process.cwd(), 'public')));


//Routes 
app.use("/api/users", usersRoutes)
app.use("/api/otp", otpsRoutes)
app.use("/api/posts", logger, postsRoutes)
app.use("/api/likes", logger, likesRoutes)
app.use("/api/comments", logger, commentRoutes)
app.use("/api/friends", logger, friendsRoutes)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));

app.get("*", (req,res, next)=>{
    throw new customErrorHandler(404, `No route found for '${req.originalUrl}'`)
})

app.use(errorHandlerMiddleware)

app.listen(4000, ()=>{
    console.log("Server is running on 4000")
    connectDatabase()
})