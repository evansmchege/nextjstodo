import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [dark, setDark] = useState(false)
  const [tasks, setTasks] = useState([])
  const [draft, setDraft] = useState('')


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks') || '[]')
    setTasks(saved)
  }, [])


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!draft.trim()) return
    setTasks([...tasks, { id: Date.now(), text: draft.trim(), done: false }])
    setDraft('')
  }

  const toggleDone = id =>
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const deleteTask = id =>
    setTasks(tasks.filter(t => t.id !== id))

  const containerClasses = [styles.container, dark ? styles.dark : ''].join(' ')

  return (
    <>
      <Head>
        <title>Task List</title>
      </Head>

      <div className={containerClasses}>
        <div className={styles.header}>
          <h1 className={styles.title}>Task List</h1>
          <button
            className={styles.themeBtn}
            onClick={() => setDark(d => !d)}
          >
            Change Theme
          </button>
        </div>

        <div className={styles.inputWrap}>
          <input
            type="text"
            placeholder="Enter new task…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
          />
          <button className={styles.addBtn} onClick={addTask}>
            Add
          </button>
        </div>

        <ul className={styles.list}>
          {tasks.map(t => (
            <li
              key={t.id}
              className={`${styles.item} ${t.done ? styles.done : ''}`}
            >
              <label className={styles.label}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                />
                <span>{t.text}</span>
              </label>
              <button
                className={styles.delBtn}
                onClick={() => deleteTask(t.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
