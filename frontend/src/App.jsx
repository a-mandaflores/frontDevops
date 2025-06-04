import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [descricao, setDescricao] = useState('')
  const [todos, setTodos] = useState([])
  const url = import.meta.env.VITE_BASE_URL

  const cadastrarTodo = async () => {
    const hoje = new Date().toISOString()
    const novaTarefa = { name: descricao, birthday: hoje }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa)
      })

      if (!response.ok) console.log('Erro ao cadastrar tarefa')

      setDescricao('')
      fetchTodos()
    } catch (error) {
      console.error('Erro ao enviar requisição:', error)
    }
  }

  const deletarTodo = async (id) => {
    try {
      await fetch(`${url}/${id}`, { method: 'DELETE' })
      fetchTodos()
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  const fetchTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="container">
      <section className="card form-card">
        <h2>📋 Adicionar Tarefa</h2>
        <input
          type="text"
          placeholder="Descreva sua tarefa..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button onClick={cadastrarTodo}>+ Criar</button>
      </section>

      <section className="grid">
        {todos.map((todo) => (
          <div key={todo.id} className="card todo-card">
            <div className="todo-header">
              <h3>{todo.name}</h3>
              <small>
                {todo.adoptionDate
                  ? todo.adoptionDate.slice(0, 10).split('-').reverse().join('/')
                  : 'Sem data'}
              </small>
            </div>
            <button className="delete-btn" onClick={() => deletarTodo(todo.id)}>
              🗑 Excluir
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App
