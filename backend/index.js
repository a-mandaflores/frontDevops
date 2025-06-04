import express from 'express'
import cors from 'cors'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pg

const app = express()
const port = process.env.PORT || 3000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

app.use(cors())
app.use(express.json())

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      adoptionDate TIMESTAMP NOT NULL
    )
  `)
}
initDb()

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC')
  res.json(result.rows)
})

app.post('/', async (req, res) => {
  const { name, birthday } = req.body
  const result = await pool.query(
    'INSERT INTO todos (name, adoptionDate) VALUES ($1, $2) RETURNING *',
    [name, birthday]
  )
  res.status(201).json(result.rows[0])
})

app.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id])
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
})
