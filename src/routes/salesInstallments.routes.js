const { Router } = require("express")

const SalesInstallmentsController = require("../controllers/SalesInstallmentsController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const salesInstallmentsRoutes = Router();
const salesInstallmentsController = new SalesInstallmentsController();

salesInstallmentsRoutes.use(ensureAuthenticated);

salesInstallmentsRoutes.get("/:sales_id", salesInstallmentsController.index)
salesInstallmentsRoutes.get("/", salesInstallmentsController.accountsReceivable);


module.exports = salesInstallmentsRoutes;