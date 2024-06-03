const { Router } = require("express");
const BuyInstallmentsController = require("../controllers/BuyInstallmentsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const buyInstallmentsRoutes = Router();
const buyInstallmentsController = new BuyInstallmentsController();

buyInstallmentsRoutes.use(ensureAuthenticated);

buyInstallmentsRoutes.get("/:buy_id", buyInstallmentsController.index);
buyInstallmentsRoutes.get("/", buyInstallmentsController.accountsReceivable);
buyInstallmentsRoutes.put('/:id', buyInstallmentsController.update);

module.exports = buyInstallmentsRoutes;
