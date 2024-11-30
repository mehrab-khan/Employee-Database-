import React, { useEffect, useState } from 'react'

export default function Home() {
  const [employeeData , setEmployeeData] = useState([])
  const [employeeID, setEmployeeID] = useState('')
  const [name , setName] = useState('')
  const [amount, setAmount] =useState('')
  const [editedName, setEditedName] = useState('')
  const [editedAmount, setEditedAmount] = useState('')
 

  
  const show = () =>{
    const url = 'https://dbtest-12c0c-default-rtdb.firebaseio.com/items.json'
    fetch(url)
    .then((res_)=>{
      return res_.json()
    })
    .then((data)=>{
      const fetchedData = []
      for (let key in data){
        fetchedData.push({'id' : key, ...data[key]})
      }
      setEmployeeData(fetchedData)
      console.log(fetchedData)
    })
  }

  useEffect(()=>{
    show()
  },[])
  const AddEmployeeData = () =>{
    const url = `https://dbtest-12c0c-default-rtdb.firebaseio.com/items.json`;
    fetch(url,{
      method : "POST",
      headers : {
        'Content-Type' : "application/json"
      },
      body : JSON.stringify({name : name, amount : amount})

    })
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      console.log(result, "Employee data added")
      setName('')
      setAmount('')
    })
    .catch((err)=>{
      console.log('Sorry pookie try again')
    })
  }
  const DeleteEmployee = (id) =>{
    const url = `https://dbtest-12c0c-default-rtdb.firebaseio.com/items/${id}.json`;
    fetch(url,{
      method : "DELETE",
    })
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      console.log('Employee info deleted')
      setEmployeeData((prevItems) => prevItems.filter((item) => item.id !== id)); 
    })
    .catch((err)=>{
      console.log("Try Again Pookie")
    })
  }
  const ModifyEmployee = (id) =>{
    const url = `https://dbtest-12c0c-default-rtdb.firebaseio.com/items/${id}.json`;
    fetch(url, {
      method : "PUT",
      headers : {
        'Content-Type' : "application/json",
      },
      body : JSON.stringify({name : editedName, amount : editedAmount})
    })
    .then((res__)=>{
      return res__.json()
    })
    .then((result)=>{
      console.log("Employee Data Updated")
      setEditedName('')
      setEditedAmount('')
      setEmployeeID('')
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
    <div className="container">
        <h3 className="title">Employee Data Entry</h3>
        <hr/>
        <input type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} className="form-control"/>
        <input type="text" placeholder="Enter Salary" onChange={(e)=>setAmount(e.target.value)} className="form-control"/>
        <button className="btn" onClick={AddEmployeeData}>Submit</button>
        <input type="text" placeholder="Enter Edited Name" onChange={(x)=>setEditedName(x.target.value)} className="form-control"/>
        <input type="text" placeholder="Enter Edited Salary" onChange={(e)=>setEditedAmount(e.target.value)} className="form-control"/>
        <button className="btn" onClick={()=>ModifyEmployee(employeeID)}>Submit</button>
        <br/>
        <br/>
        <br/>
        <br/>
         
<h3 style={{textAlign:'center'}}>Employee List</h3>
<hr />

        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Srial No.</th>
      <th scope="col">Name</th>
      <th scope="col">Salary</th>
      <th scope="col">Actions</th>
       
    </tr>
  </thead>
  <tbody>
    {employeeData.map((employeedata, index)=>(
      <tr key={employeedata.id}>
      <td>{index + 1}</td>
      <td>{employeedata.name}</td>
      <td>{employeedata.amount}</td>
      <td>
        <button className='btn actionBtn' onClick={()=>setEmployeeID(employeedata.id)}>Edit</button>
        <button className='btn actionBtn dltBtn' onClick={()=> DeleteEmployee((employeedata.id))}>Delete</button>
      </td>
       
    </tr>
    ))}
    
    
    
  </tbody>
</table>
    </div>
    </>
  )
}
