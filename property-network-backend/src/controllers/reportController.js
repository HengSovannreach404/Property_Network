const reportService =
  require('../services/reportService')

const generateReport = async (req, res) => {
  try {
    const report =
      await reportService.getReport()

    res.json({
      success: true,
      data: report
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  generateReport
}