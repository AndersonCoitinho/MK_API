const { Router } = require("express")
const TicketsController = require("../controllers/TicketsController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")
const { isAdmin } = require('../middlewares/isAdmin');

const ticketsRoutes = Router();
const ticketsController = new TicketsController();

ticketsRoutes.use(ensureAuthenticated);

ticketsRoutes.post('/', ticketsController.create);
ticketsRoutes.get('/', ticketsController.index);
ticketsRoutes.put('/:ticketId/status', isAdmin, ticketsController.updateStatus);


module.exports = ticketsRoutes;
