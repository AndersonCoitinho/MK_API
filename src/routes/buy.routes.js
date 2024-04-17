const { Router } = require("express")

const BuyController = require("../controllers/BuyController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const buyRoutes = Router();
const buyController = new BuyController();

buyRoutes.use(ensureAuthenticated);

buyRoutes.post("/", buyController.create)
buyRoutes.get("/", buyController.index)

module.exports = buyRoutes;