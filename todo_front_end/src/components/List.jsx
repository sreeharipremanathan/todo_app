import { useEffect, useState } from "react"
import axios from 'axios'

function List(){
    const [data,setData] = useState([])
    const [editing,setEditing] = useState(false)
    const [editdata,setEditdata] = useState(null)
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/apitodo/').then((res)=>{
            console.log(res.data);
            setData(res.data)
        }).catch(error=>console.log(error.message))
        
    },[])
    const edit_dtls =(task)=>{
        setEditing(true)
        setEditdata(task)
    }
    const updateDtls=(id,task)=>{
        setEditing(false)
        axios.put(`http://127.0.0.1:8000/apitodo/${id}/`,task).then(res=>{
            setData(data.map((prv)=>prv.id===id ? res.data : prv))
        }).catch(error=>console.log(error.message))
    }
    return(
        <div className="container">
            <h1>Display Details</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value,index)=>(
                        <tr key={index}>
                            <td>{value.task}</td>
                            <td>{value.desccription}</td>
                            <td>{value.completed ? 'completed' :'not'}</td>
                            <td><button className="btn btn-outline-info" onClick={()=>{edit_dtls(value)}}>Edit</button></td>
                            <td><button className="btn btn-outline-danger" >Delete</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
           {editing ? <Editform curTask={editdata} updatefun={updateDtls} />:null}
        </div>
    )
}

const Editform =({curTask,updatefun})=>{
    const [task,setTask]=useState(curTask)

    const handleChange=(e)=>{
        const {name,value}=e.target
        setTask({...task,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        updatefun(task.id,task)
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="task" id="title" value={task.task} onChange={handleChange}/>
            <input type="text" name="desccription" id="desccription" value={task.desccription} onChange={handleChange} />
            <input type="submit" value="update" />
        </form>
    )
}

export default List