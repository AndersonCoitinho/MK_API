const { Router } = require("express")

const userRouter = require("./user.routes")
const productsRouter = require("./products.routes")

const routes = Router();

routes.use("/users", userRouter)
routes.use("/products", productsRouter)

module.exports = routes;