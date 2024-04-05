

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

import { v4 as uuidv4 } from 'uuid';

function App() {

  const [task, settask] = useState("")
  const [all_tasks, setall_tasks] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let all_taskstring = localStorage.getItem("all_tasks")
    if (all_taskstring) {
      let all_tasks = JSON.parse(localStorage.getItem("all_tasks"))
      setall_tasks(all_tasks)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("all_tasks", JSON.stringify(all_tasks))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }




  const handleEdit = (e, id) => {
    let t = all_tasks.filter(i => i.id === id)
    settask(t[0].task)
    let newall_tasks = all_tasks.filter(item => {
      return item.id !== id
    });
    setall_tasks(newall_tasks)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newall_tasks = all_tasks.filter(item => {
      return item.id !== id
    });
    setall_tasks(newall_tasks)
    saveToLS()
  }

  const handleAdd = () => {
    setall_tasks([...all_tasks, { id: uuidv4(), task, isCompleted: false }])
    settask("")
    saveToLS()
    // console.log("submit");
  }

  const handleChange = (e) => {
    settask(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = all_tasks.findIndex(item => {
      return item.id === id;
    })
    let newall_tasks = [...all_tasks];
    newall_tasks[index].isCompleted = !newall_tasks[index].isCompleted;
    setall_tasks(newall_tasks)
    saveToLS()
  }

  const handleKeyPress = (event) => {
    // Check if the Enter key is pressed (key code 13)
    if (event.key === 'Enter' && task.length > 3) {
      // event.preventDefault();
      handleAdd();
    }
  };


  return (
    < >
      <Navbar />
      <h1 className='font-bold mt-3 text-center text-3xl'>Handle You'r Daily Task</h1>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh] md:w-[55%]">
        <div className="addtask my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a task</h2>
          <div className="flex">

            <input onChange={handleChange} onKeyPress={handleKeyPress} value={task} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={task.length <= 3} className='bg-blue-600 mx-2 rounded-full hover:bg-blue-800 disabled:bg-blue-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold flex justify-center'>Task's</h2>
        <div className="all_tasks">
          {all_tasks.length === 0 && <div className='m-5'>No tasks to display</div>}
          {all_tasks.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className={"task flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.task}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>  Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App