import { Router, Request, Response } from 'express'
import * as itemsService from '../services/itemsService'

const router = Router()

// получить все элементы (левое окно)
router.get('/', (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const search = (req.query.search as string) || ''

    const result = itemsService.getItems(page, limit, search)
    res.json(result)
})

// получить выбранные элементы (правое окно)
router.get('/selected', (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const search = (req.query.search as string) || ''

    const result = itemsService.getSelectedItems(page, limit, search)
    res.json(result)
})

// добавить новые элементы (батч)
router.post('/', (req: Request, res: Response) => {
    const { ids } = req.body as { ids: number[] }

    if (!ids || !Array.isArray(ids)) {
        res.status(400).json({ error: 'ids must be an array' })
        return
    }

    itemsService.addItems(ids)
    res.json({ ok: true })
})

// выбрать/снять выбор
router.patch('/select', (req: Request, res: Response) => {
    const { ids, action } = req.body as { ids: number[], action: 'select' | 'unselect' }

    if (!ids || !Array.isArray(ids) || !action) {
        res.status(400).json({ error: 'ids and action are required' })
        return
    }

    itemsService.selectItems(ids, action)
    res.json({ ok: true })
})

// обновить порядок (DnD)
router.put('/order', (req: Request, res: Response) => {
    const { ids } = req.body as { ids: number[] }

    if (!ids || !Array.isArray(ids)) {
        res.status(400).json({ error: 'ids must be an array' })
        return
    }

    itemsService.updateOrder(ids)
    res.json({ ok: true })
})

export default router