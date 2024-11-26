import React, { useEffect, useState } from 'react'

export default function Home() {
  const [employeeData , setEmployeeData] = useState([])
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



  
  return (
    <>
    <div className="container">
        <h3 className="title">Employee Data Entry</h3>
        <hr/>
        <input type="text" placeholder="Enter Name" className="form-control"/>
        <input type="text" placeholder="Enter Position" className="form-control"/>
        <button className="btn">Submit</button>
        <input type="text" placeholder="Enter Edited Name" className="form-control"/>
        <input type="text" placeholder="Enter Edited Position" className="form-control"/>
        <button className="btn">Submit</button>
        <br/>
        <br/>
        <br/>
        <br/>
         
<h3 style={{textAlign:'center'}}>Employee List</h3>
<hr />

        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Salary</th>
      <th scope="col">Actions</th>
       
    </tr>
  </thead>
  <tbody>
    {employeeData.map((employeedata)=>(
      <tr key={employeedata.id}>
      <td>{employeedata.name}</td>
      <td>{employeedata.amount}</td>
      <td>
        <button className='btn actionBtn'>Edit</button>
        <button className='btn actionBtn dltBtn'>Delete</button>
      </td>
       
    </tr>
    ))}
    
    
    
  </tbody>
</table>
    </div>
    </>
  )
}
