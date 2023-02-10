import React, { useState } from 'react';
import "./TotalContacts.css"
import axios from 'axios';
import Header from './Header/Header';
import Functionalities from './Functionalities/Functionalities';
import editimage from "./../images/Edit.png";
import deleteimage from "./../images/delete.png";
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
// import sort from "./../images/sorting.png"
// import columnDevide from "./../images/columnDevide.png"
import Tooltip from '@mui/material/Tooltip';
import DeleteContactComfirmation from '../DeleteContactComfirmation';

const TotalContacts = (props) => {

    const [arr, setArr] = useState([])
    const [checkedIds, setCheckedIds] = useState([]);
    const [deletefile,setDeletefile]=useState(false)
    const [all,setall]=useState(false)
    
    const userId = JSON.parse(localStorage.getItem("userdetails"))._id
    const token = JSON.parse(localStorage.getItem("token"))
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=async()=>{
        let result=await axios.get(`http://localhost:5500/allcontacts/${userId}`,{
            headers:{
                "Authorization":token
            }
        })
        
        setArr(result.data.contacts)
        }

    const handleCheckboxChange = (event) => {
    const { target } = event;
    const { id } = target;
    if (target.checked) {
      setCheckedIds([...checkedIds, id]);
    } else {
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    }
  };

  const handleall=(event)=>{
    let user=[]
    if(event.target.checked){
        
       user=arr.map((data)=>{
          return data._id
       })
    }
    setCheckedIds(user)
  }
  console.log(checkedIds)
 
  const ActionButtonDelete = (id)=>{
    setCheckedIds([...checkedIds, id]) 
    console.log(id);
    setDeletefile(true)
  }

  
    return (
        <div className='totalContact'>
        <div>
             <Header setarr = {setArr} />
            <Functionalities ids={checkedIds} checkids={setCheckedIds} rend={fetchData}/>
        </div>
           

            {/* TABLE POPULATION OF CONTACTS  */}

            <table  className="table table-striped">
            <thead className='thead'>
           
                <tr>
                    <th scope='col'><input value='something' type="checkbox" onChange={handleall}/></th>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Company</th>
                    <th scope="col">Industry</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Country</th>
                    <th scope="col">Action</th>    
                </tr>
            </thead>
            <tbody className='tbody'>    
                {arr.map((data, key) => {
                    return (<tr key={key}>
                        <td><input type="checkbox" id={data._id}
                         onChange={handleCheckboxChange}/></td>
                        <td>{data.name}</td>
                        <td>{data.designation}</td>
                        <td>{data.company}</td>
                        <td>{data.industry}</td>
                        <Tooltip  placement="bottom" title={data.email} arrow>
                        <td className='email'>{data.email}</td>
                        </Tooltip>
                        <td>{data.phonenumber}</td>
                        <td>{data.category}</td>
                        <td>
                            <div className='tableaction'>
                                <div className='table-row-edit'>
                                   <EditIcon sx={{color:blue[400]}}/>
                                </div>
                                <div  >                 
                                    <DeleteIcon onClick={()=>ActionButtonDelete(data._id)}  sx={{color:red[400]}}/>                                  
                                </div>
                            </div>
                        </td>
                    </tr>)
                })}
            </tbody>
            </table>
            <div className="deletefile popup">
                <DeleteContactComfirmation trigger3={deletefile} hide={setDeletefile} arr={checkedIds} checkids={setCheckedIds} rend={fetchData}/>  
            </div>
           
           
        </div>
        
    );
}

export default TotalContacts;
