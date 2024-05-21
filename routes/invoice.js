const router = require('express').Router();
const Controller = require('../controllers/invoice');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.post('/', isLoggedIn, Controller.CreateInvoice);
// router.post('/', Controller.CreateInvoice);
router.get('/', Controller.GetAllInvoice);
router.get('/myInvoice', isLoggedIn, Controller.MyInvoice);
router.get('/:id', Controller.GetOneInvoice);
router.put('/:id', isLoggedIn, Controller.EditInvoice);
router.delete('/:id', isLoggedIn, Controller.DeleteInvoice);

module.exports = router;
