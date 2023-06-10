import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars, faTrash } from '@fortawesome/fontawesome-free-solid'
import TaskService from '../../../services/TaskService'
import Navbar from '../../../components/navbar'

const Dashboard = () => {
  // initializing state
  const [text, setText] = useState('')
  const [showList, setShowList] = useState(false)
  const [listData, setListData] = useState([])
  const [todoItems, setTodoItems] = useState([])
  const currentTime = moment().format('DD/MM/YYYY hh:mm a')
  // show list function
  const showTask = () => setShowList(!showList)

  // checking if task is complete and updating it to completed
  const handleTask = async (id) => {
    setShowList(false)
    const match = listData.find((task) => task.id === id)
    if (!match?.status) {
      match.status = 'completed'
      match.completionDate = currentTime
      const response = await TaskService.update({ id, match })
      if (response) {
        toast.info(`${response.task.toUpperCase()} is completed`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500
        })
        setTodoItems(response)
      }
    }
  }

  // adding task by pressing ENTER
  const handleKeypress = (e) => {
    if (e.key === 'Enter') addTask()
  }

  // Adding task with creation Time
  const addTask = async () => {
    const creationDate = currentTime
    const data = {
      task: text,
      creationDate
    }
    try {
      const response = await TaskService.create(data)
      if (response) {
        toast.success('New Task Added Successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500
        })
        setTodoItems(response)
        setText('')
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500
      })
      setText('')
    }
  }

  // deleting task function
  const deleteTask = async (id) => {
    await TaskService.delete(id)
    toast.error('Task Deleted Successfully', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500
    })
    const response = await TaskService.get()
    setListData(response)
  }

  useEffect(() => {
    async function fetchData () {
      const response = await TaskService.get()
      setListData(response)
    }
    fetchData()
  }, [todoItems])

  return (
    <>
        <Navbar />
        <Row className='bg-image'>
            <Row className='main-container d-flex justify-content-center'>
                <Row className='d-flex justify-content-center align-items-center'>
                <Col lg={4} className='d-flex justify-content-center align-items-center'>
                    <div className="rounded-circle border d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }} alt="Avatar">
                    <div className='avatar'></div>
                    </div>
                </Col>
                </Row>
                <Col lg={4} className='main-col'>
                <div>
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                        <FontAwesomeIcon className='duotone' icon={faBars} />
                    </InputGroup.Text>

                    <Form.Control
                        placeholder="To do Today"
                        className='input'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleKeypress}
                    />
                    {/* eslint-disable-next-line multiline-ternary */}
                    {text ? (
                    <Button className='button' onClick={addTask}>
                        Add
                    </Button>
                    ) : (
                    <InputGroup.Text className='duotone-arrow-input' onClick={showTask}>
                        <FontAwesomeIcon className='duotone-arrow' icon={faChevronDown} />
                    </InputGroup.Text>
                    )}
                    </InputGroup>
                </div>
                {showList && (
                    <div className='selectable-menu'>
                    <ul className='ul-border'>
                        {listData?.map((item, index) => (
                        <li className='menu-item' key={index}>
                            <span className="menu-items d-flex">
                            <label className='label'>
                                <input
                                type="checkbox"
                                className='checkbox'
                                onChange={() => handleTask(item.id)}
                                checked={item.status === 'completed'}
                                />
                                <input
                                type="checkbox"
                                className='checkbox'
                                onChange={() => handleTask(item.id)}
                                checked={item.status === 'completed'}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <div className='task'>{item.task}</div>
                            <FontAwesomeIcon
                                className='duotone-trash'
                                onClick={() => deleteTask(item.id)}
                                icon={faTrash}
                            />
                            </span>
                            <Row className='d-flex justify-content-evenly'>
                            <Col lg={4} className='d-flex justify-content-start pl'>
                                <p className='font'>
                                <strong>Creation Time: {moment(item.creationDate).format('DD-MM-YYYY -  hh:mm a')}</strong>
                                </p>
                            </Col>
                            <Col lg={4}>
                                {item.completionDate && (
                                <p className='font'>
                                    <strong>Completed Time: {item.completionDate ? moment(item.completionDate).format('DD-MM-YYYY -  hh:mm a') : ''}</strong>
                                </p>
                                )}
                            </Col>
                            </Row>
                            <hr style={{ padding: '0px', margin: '0px' }}></hr>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                </Col>
            </Row>
        </Row>
    </>
  )
}

export default Dashboard
