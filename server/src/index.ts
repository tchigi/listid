import express from 'express'
import cors from 'cors'
import itemsRouter from './routes/items'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/items', itemsRouter)

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})