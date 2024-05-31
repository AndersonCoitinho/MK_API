const { Router } = require("express")

const userRouter = require("./user.routes")
const productsRouter = require("./products.routes")
const sessionsRouter = require("./sessions.routes")
const clientRouter = require("./client.routes")
const salesRouter = require("./sales.routes")
const buyRouter = require("./buy.routes")
const stockRouter = require("./stock.routes")
const salesInstallmentsRouter = require("./salesInstallments.routes")

const routes = Router();

routes.use("/users", userRouter)
routes.use("/products", productsRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/client", clientRouter)
routes.use("/sales", salesRouter)
routes.use("/buy", buyRouter)
routes.use("/stock", stockRouter)
routes.use("/salesInstallments", salesInstallmentsRouter)

module.exports = routes;