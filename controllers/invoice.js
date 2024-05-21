const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.CreateInvoice = async function (req, res) {
  try {
    const { invoiceNumber, service, client, amount, status } = req.body;
    const userId = req.userAuthId;

    const result = await prisma.invoice.create({
      data: {
        invoiceNumber,
        service,
        client,
        amount,
        status,
        userId,
      },
    });

    return res.status(200).json({
      msg: 'Invoice created successfully',
      Invoice: result,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Something went wrong',
      Error: err.message,
    });
  }
};

module.exports.GetAllInvoice = async function (req, res) {
  try {
    const result = await prisma.invoice.findMany();

    return res.status(200).json({
      msg: 'Fetch all Invoice successfully',
      Invoice: result,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Something went wrong',
      Error: err.message,
    });
  }
};

module.exports.GetOneInvoice = async function (req, res) {
  try {
    const invoiceId = parseInt(req.params.id, 10);

    const result = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!result) {
      return res.status(404).json({
        msg: 'Invoice not found',
      });
    }

    return res.status(200).json({
      msg: 'Fetch One Invoice successfully',
      Invoice: result,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Something went wrong',
      Error: err.message,
    });
  }
};

module.exports.EditInvoice = async function (req, res) {
  try {
    const invoiceId = parseInt(req.params.id, 10);
    const { invoiceNumber, service, client, amount, status } = req.body;

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!existingInvoice) {
      return res.status(404).json({
        msg: 'Invoice not found',
      });
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        invoiceNumber,
        service,
        client,
        amount,
        status,
      },
    });

    return res.status(200).json({
      msg: 'Invoice updated successfully',
      Invoice: updatedInvoice,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Something went wrong',
      Error: err.message,
    });
  }
};

module.exports.DeleteInvoice = async function (req, res) {
  try {
    const invoiceId = parseInt(req.params.id, 10);

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!existingInvoice) {
      return res.status(404).json({
        msg: 'Invoice not found',
      });
    }

    await prisma.invoice.delete({
      where: { id: invoiceId },
    });

    return res.status(200).json({
      msg: 'Invoice deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Something went wrong',
      Error: err.message,
    });
  }
};

module.exports.MyInvoice = async function (req, res) {
  try {
    const userId = req.userAuthId;

    const invoices = await prisma.invoice.findMany({
      where: { userId: userId },
    });

    return res.status(200).json({
      message: 'Invoices retrieved successfully',
      Invoices: invoices,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
