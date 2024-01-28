const { Router } = require("express")

const userRouter = require("./user.routes")
const productsRouter = require("./products.routes")
const sessionsRouter = require("./sessions.routes")
const clientRouter = require("./client.routes")
const salesRouter = require("./sales.routes")

const routes = Router();

routes.use("/users", userRouter)
routes.use("/products", productsRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/client", clientRouter)
routes.use("/sales", salesRouter)

module.exports = routes;