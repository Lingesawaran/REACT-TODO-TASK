import React, { useState,useEffect } from 'react';
import { Dropdown, DropdownMenu, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import  Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';


import "./trail.css"
import { NotificationImportant } from '@mui/icons-material';



function Trail() {


    const[data,setdata]=useState([]);
    const[inp2,setinp2]=useState("");
    const[inp1,setinp1]=useState("");
    const[data1,setdata1]=useState([])
    
    
    
    
   
    const Change1= (event) =>{
      console.log(event)
      event.preventDefault();
      
      setdata([...data,{ id:uuidv4() ,title:inp1,description:inp2,status:false}])

     
      setinp1("");
      setinp2("");

      

    }

    useEffect(()=>{
      setdata1(data)
    },[data])
    const handleDelete =({id})=>{
      setdata(data.filter((y)=>y.id!==id))
      setdata1(data)
    }
    const Com =(a)=>{
      setdata(data.map((z)=>{
        if(z.id===a.id){
          return{...z, status:true}
          
        }
        return z;
      }))
    }
    const Notcom =(a)=>{
      setdata(data.map((z)=>{
        if(z.id===a.id){
          return{...z, status:false}
          
        }
        return z;
      }))
    }
    let color=(b)=>{return( data.map((x)=>{
      if(x.id==b.id){
      if(x.status){
        return("completed")
      }
      else{
        return("not completed")
      }}
    })
  )}

   


  function ALL() {
    setdata1(data);
    document.getElementById("dropdown-autoclose-true").innerHTML="ALL"
  }
  
  function JOB() {
    setdata1(data.filter((x) => x.status === true));
    document.getElementById("dropdown-autoclose-true").innerHTML="COMPLETED"
  }
  
  function NOTJOB() {
    setdata1(data.filter((x) => x.status === false));
    document.getElementById("dropdown-autoclose-true").innerHTML="NOT COMPLETED"
  }
  
   console.log(data1)


  return (
    <div>
      <h2 className="he">MY TODO</h2>
      <Form onSubmit={Change1} className="for">
        <input type='text' placeholder='Enter the name' value={inp1} required className='d1' onChange={(event)=>setinp1(event.target.value)}></input>

        <input type='text' placeholder='Description' value={inp2} required className='d1' onChange={(event)=>setinp2(event.target.value)}></input>

      <Button type='submit' variant='success'>Add Todo</Button>
      
      </Form>
      
      
     <span class="sp"><h4>My todos</h4><h4 className="st">Status Filter:
     <Dropdown className="d-inline mx-2" >
                  <Dropdown.Toggle id="dropdown-autoclose-true">
                                ALL
                    </Dropdown.Toggle>
                    <DropdownMenu>
                      <DropdownItem onClick={()=>ALL()}>All</DropdownItem>
                      <Dropdown.Item onClick={()=>JOB()}>Completed</Dropdown.Item>
                      <Dropdown.Item onClick={()=>NOTJOB()}>Not Completed</Dropdown.Item>
                      </DropdownMenu>  
                   </Dropdown>
      </h4></span>
      {
        data1.map((x)=> (
          
          <div class="container">
           <li key={x.id} class="list">
          <h6>Name:<input value={x.title}   type="text" class="inp" onChange={(event)=>event.preventDefault()}/></h6> 
          <h6>Description: <input value={x.description} type="text" class="inp" onChange={(event)=>event.preventDefault()}/></h6>
           <h6>Status
                  <Dropdown className="d-inline mx-2" >
                 
                  <Dropdown.Toggle id="dropdown-autoclose-true">
                      {x.status ? "completed" : "not completed"}
                    </Dropdown.Toggle>
                    <DropdownMenu>
                      <Dropdown.Item onClick={()=>Com(x)}>Completed</Dropdown.Item>
                      <Dropdown.Item onClick={()=>Notcom(x)}>Not Completed</Dropdown.Item>
                      </DropdownMenu>  
                   </Dropdown>
           </h6>
           
           <Button variant="danger" onClick={()=> handleDelete(x)}>DELETE</Button>

           
           </li>
          </div>
        )


        )}




    </div>
  )
}


export default Trail;
