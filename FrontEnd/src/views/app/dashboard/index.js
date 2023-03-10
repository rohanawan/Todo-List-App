import React, {useEffect, useState, useRef} from 'react';
import {Row , Col, Button, Form , InputGroup} from 'react-bootstrap';
import Navbar from '../../../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars , faTrash} from '@fortawesome/fontawesome-free-solid'
import TaskService from '../../../services/TaskService';
import moment from 'moment';
import { toast } from "react-toastify";

const Dashboard = () => {
    // initializing state
    const [text, setText] = useState('');
    const [showList, setshowList] = useState(false);
    const [listData, setListData] = useState([]);
    const [todoItems, setTodoItems] = useState([]);

    // show list function
    const showTask = () => setshowList(!showList);

    // checking if task complete than update task to completed
    const handleTask = async(id) => {
        setshowList(false)
        let match = listData.find(task => task.id === id);
        if(!match.status){
            match.status = 'completed'
            match.completionDate = moment().format('DD/MM/YYYY hh:mm a');
        }
        const data ={
          id, 
          match
        }
        const response = await TaskService.update(data);
        if(response){
            toast.info(`${response.task.toUpperCase()} Task is Done`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
        }
        setTodoItems(response)
    }

    // adding task by pressing ENTER
    const handleKeypress =(e) =>{
        if (e.key === 'Enter') addTask();
    }

    // Adding task with creation Time
    const addTask = async () =>{
        const creationDate = moment().format('DD/MM/YYYY hh:mm a');
        const data ={
            task: text,
            creationDate
        }
        try {
            const response = await TaskService.create(data);
            if(response){
                toast.success('New Task Added Successfully' , {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                });
            }
            setTodoItems(response)
            setText('');
        } catch (error) {
            toast.error(`${error.message}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            setText('');
        }
    }
    // deleting task function
    const deleteTask = async (id) =>{
        await TaskService.delete(id);
            toast.error('Task Deleted Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });        
            const response = await TaskService.get();
            setListData(response)
    }

    useEffect(()=>{
        async function fetchData() {
            const response = await TaskService.get();
            setListData(response)
          }
          fetchData();
    },[todoItems])
    return (
    <>
         <Row className='bg-image'>
            <Row className='main-container d-flex justify-content-center'>
            <Row className='d-flex justify-content-center align-items-center'>
                    <Col lg={4} className='d-flex justify-content-center align-items-center'>
                    <div class="rounded-circle border d-flex justify-content-center align-items-center "
                        style={{width:'100px', height:'100px'}}
                        alt="Avatar">
                            <div className='avatar'>
                            </div>
                    </div>
                    </Col>
                </Row>
                <Col lg={4} className='main-col'> 
                <div>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="basic-addon1" >
                            <FontAwesomeIcon 
                                className='duotone' 
                                icon={faBars} />
                        </InputGroup.Text>
                        
                        <Form.Control
                            placeholder="To do Today"
                            className='input'
                            value={text}
                            onChange={(e)=>setText(e.target.value)}          
                            onKeyPress={handleKeypress}
                        />
                    {text ? 
                        <Button className='button' onClick={addTask}>
                            Add
                        </Button> 
                        :
                        <InputGroup.Text className='duotone-arrow-input' onClick={showTask}>
                            <FontAwesomeIcon className='duotone-arrow' icon={faChevronDown} />
                        </InputGroup.Text>
                        }   
                    </InputGroup>
                </div>              
                { showList ?
                    <div className='selectable-menu'>
                        <ul className='ul-border'>
                        {listData.map((item , index)=>{
                            return <li className='menu-item' key={index} >
                                <span 
                                    className="menu-items d-flex" >
                                    <label className='label'>
                                    <input 
                                        type="checkbox" 
                                        className='checkbox' 
                                        onChange={()=>handleTask(item.id)} 
                                        checked={item.status === 'completed' ? true : false}
                                    />
                                    <input 
                                        type="checkbox" 
                                        className='checkbox' 
                                        onChange={()=>handleTask(item.id)} 
                                        checked={item.status === 'completed' ? true : false}
                                    />
                                        <span 
                                            class="checkmark">
                                        </span>
                                    </label>
                                    <a>{item.task}</a>
                                <FontAwesomeIcon 
                                    className='duotone-trash' 
                                    onClick={()=>deleteTask(item.id)} 
                                    icon={faTrash} 
                                />
                                </span>
                                <Row 
                                    className='d-flex justify-content-evenly'>
                                <Col lg={4} className='d-flex justify-content-start pl'>
                                <p 
                                className='font'>
                                    <strong>
                                        Creation Time: {(moment(item?.creationDate).format('DD-MM-YYYY -  hh:mm a'))} 
                                    </strong>
                                </p>
                                </Col>
                                <Col lg={4}>
                                {item.completionDate ? 
                                <p 
                                className='font'> 
                                    <strong>Completed Time : {item.completionDate ? moment(item.completionDate).format('DD-MM-YYYY -  hh:mm a'): ''}
                                    </strong>
                                </p>
                                : ''
                                }
                                </Col>
                                </Row>
                                <hr 
                                    style={{padding: '0px', margin:'0px'}}>
                                </hr>
                            </li>
                        })}
                        </ul>
                    </div> : ''
                }
                </Col>
            </Row>
        </Row>
    </>            
    );
};

export default Dashboard;