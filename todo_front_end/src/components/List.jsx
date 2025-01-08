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
                            <td><button className="btn btn-outline-info" onClick={()=>{edit_dtls(value)}}>Edit</button></td>
                            <td><button className="btn btn-outline-danger" >Delete</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
           {editing ? <Editform curTask={editdata} />:null}
        </div>
    )
}

const Editform =({curTask})=>{
    const [task,setTask]=useState(curTask)
    return(
        <form >
            <input type="text" name="title" id="title" value={task.task} />
            <input type="text" name="desccription" id="desccription" value={task.desccription} />
            <input type="submit" value="update" />
        </form>
    )
}

export default List