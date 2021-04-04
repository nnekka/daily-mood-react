import Calendar from '../models/Calendar.js'
import User from '../models/User.js'
import Day from '../models/Day.js'
import {errorHandler} from '../utils/errorHandler.js'

// GET /api/calendars
// Получить все календари юзера

export const getCalendarsOfUser = async (req, res) => {
    const calendars = await Calendar.find({user: req.user.id})
    res.json(calendars)
}

// GET /api/calendars/:id
// Получить календарь по id

export const getCalendarById = async (req, res) => {

    try {
        const calendar = await Calendar.findById(req.params.id)
        if (!calendar) {
            return res.status(404).json({errors: [{msg: 'Calendar not found'}]})
        }

        res.json(calendar)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

// POST /api/calendars
// Создать календарь

export const createCalendar = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const existCalendar = await Calendar.findOne({title: req.body.title, user: req.user.id})
        if (existCalendar) {
            return res.status(400).json({errors: [{msg: 'Календарь с таким название уже существует'}]})
        }

        const calendar = new Calendar({
            title: req.body.title,
            description: req.body.description,
            user: user.id
        })

        await calendar.save()
        res.json(calendar)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

// PUT /api/calendars/:id/legend
// (тут проблема: как проверить картинку? )

export const addLegend = async (req, res) => {
    try {
        const {color, text, imageSrc} = req.body

        const calendar = await Calendar.findById(req.params.id)
        if (!calendar){
            return res.status(404).json({errors: [{ msg: 'Calendar not found'}] })
        }
        const existLegendColor = calendar.legends.find(x => x.color === color)
        if (existLegendColor){
            return res.status(400).json({errors: [{ msg: 'Color is already exists'}] })
        }

        if (!(color && !imageSrc)){
            return res.status(400).json({ errors: [{ msg: 'Выберите цвет или картинку!'}] })
        }
        const legend = {
            color,
            text,
            imageSrc
        }
        calendar.legends = calendar.legends.concat(legend)
        await calendar.save()
        res.json(calendar)
    }
    catch (e) {
        errorHandler(res, e)
    }
}
// DELETE /api/calendars/:id
// Удалить календарь по id

export const deleteCalendar = async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.id)
        if (!calendar){
            return res.status(404).json({errors: [{ msg: 'Calendar not found'}] })
        }

        await calendar.remove()
        res.json('Calendar removed!')
    }
    catch (e) {
        errorHandler(res, e)
    }
}

// DELETE /api/calendars/:id/legend/:legend_id
// Удалить легенду в календаре
export const deleteLegend = async (req, res) => {
    try {
        const calendar = await Calendar.findById(req.params.id)
        if (!calendar){
            return res.status(404).json({errors: [{ msg: 'Calendar not found'}] })
        }
        calendar.legends = calendar.legends.filter(x => x._id.toString() !== req.params.legend_id)

        await calendar.save()
        res.json(calendar)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

// PUT /api/calendars/:id/day
// Добавить день в календарь

export const addDay = async (req, res) => {
    try {
        const { day, month, color, imageSrc } = req.body

        const calendar = await Calendar.findById(req.params.id)

        if (!calendar){
            return res.status(404).json({errors: [{ msg: 'Calendar not found'}] })
        }
        const legend = color !== ''
            ? calendar.legends.find(x => x.color === color)
            : imageSrc !== ''
                ? calendar.legends.find(x => x.imageSrc === imageSrc)
                : null

        if (!legend){
            return res.status(404).json({errors: [{ msg: 'Color/image must be chosen for this action'}] })
        }

        const newDay = new Day({
            day,
            month,
            legend,
            calendar: calendar.id
        })

        const savedDay = await newDay.save()
        calendar.days = calendar.days.concat(savedDay.id)
        await calendar.save()
        res.json(calendar)

    }
    catch (e) {
        errorHandler(res, e)
    }
}

// DELETE /api/calendars/:id/day/:day_id
// Удалить день

export const deleteDay = async (req, res) => {

    try {

        const calendar = await Calendar.findById(req.params.id)

        if (!calendar){
            return res.status(404).json({errors: [{ msg: 'Calendar not found'}] })
        }

        calendar.days = calendar.days.filter(x => x._id.toString() !== req.params.day_id)
        await calendar.save()
        res.json(calendar)

    }
    catch (e) {
        console.error(e.message)
        res.status(401).send('Server error')
    }
}

