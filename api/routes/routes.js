const express = require ('express')
const router = express.Router()
const {createJob,updateJob,deleteJob,viewJob,allJobs}=require('../controllers/controllers')

router.route('/create-job').post(createJob)
router.route('/update-job').post(updateJob)
router.route('/delete-job/:jobId').delete(deleteJob)
router.route('/view-job/:jobId').get(viewJob)
router.route('/view-all-job').get(allJobs)

module.exports=router