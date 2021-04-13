import express from 'express'
import passport from 'passport'
import {
    getCalendarsOfUser,
    getCalendarById,
    createCalendar,
    addLegend,
    deleteCalendar,
    deleteLegend,
    addDay,
    deleteDay,
    updateCalendar
} from '../controllers/calendarController.js'
const router = express.Router()



router.route('/').get(passport.authenticate('jwt', { session: false }), getCalendarsOfUser)
router.route('/:id').get(passport.authenticate('jwt', { session: false }), getCalendarById)
router.route('/:id').put(passport.authenticate('jwt', { session: false }), updateCalendar)
router.route('/').post(passport.authenticate('jwt', { session: false }), createCalendar)
router.route('/:id/legend').put(passport.authenticate('jwt', { session: false }), addLegend)
router.route('/:id/day').put(passport.authenticate('jwt', { session: false }), addDay)
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), deleteCalendar)
router.route('/:id/legend/:legend_id').delete(passport.authenticate('jwt', { session: false }), deleteLegend)
router.route('/:id/day/:day_id').delete(passport.authenticate('jwt', { session: false }), deleteDay)

export default router