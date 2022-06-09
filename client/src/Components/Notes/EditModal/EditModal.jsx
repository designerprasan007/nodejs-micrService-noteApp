import React, {useState} from 'react'
import './EditModal.css';
import {editNoteAction, createNewNoteAction} from '../../../actions/noteActions'
import {useDispatch, useSelector} from 'react-redux';


const EditModal = ({editNote, setIsEditModal}) => {
    const [editValue, setEditValue] = useState({
        title:editNote?.title ? editNote?.title : "", 
        description:editNote?.description ? editNote?.description : "", 
        status:editNote?.status ? editNote?.status : "", 
        category:editNote?.category ? editNote?.category : ""})

    const dispatch = useDispatch()

    const submitEditForm = (event) =>{
        event.preventDefault()
        if(!editNote?._id){
            console.log("new note")
            dispatch(createNewNoteAction(editValue))
            return
        }
        dispatch(editNoteAction(editValue, editNote._id));
    }
    return (
    <div className='editModalhead p-3'>
        <div className='editModalHeading d-flex justify-content-between'>
            <p>EditModal</p>
            <button className='btn btn-secondary' onClick={() => setIsEditModal(false)}>X</button>
        </div>
        <form className='row'>
            <div className='col-6'>
                <p>Title</p>
                <input className='form-control' type="text" onChange={(event) => setEditValue({...editValue, title: event.target.value})} value={editValue.title} />
            </div>
            <div className='col-6'>
                <p>Description</p>
                <input className='form-control' type="text" onChange={(event) => setEditValue({...editValue, description: event.target.value})} value={editValue.description} />
            </div>
            <div className='col-6'>
                <p>Status</p>
                <select className='form-select' onChange={(event) => setEditValue({...editValue, status: event.target.value})}>
                    <option>Status</option>
                    <option value="Final" >Final</option>
                    <option value="inProgress" >inProgress</option>
                    <option value="Review" >Review</option>
                </select>
            </div>
            <div className='col-6'>
                <p>Category</p>
                <select className='form-select' onChange={(event) => setEditValue({...editValue, category: event.target.value})} value={editValue.category}>
                    <option value="All">All</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Designing">Designing</option>
                </select>
            </div>
            <div className='text-center pt-3'>
                <button onClick={(event) => submitEditForm(event)} className='btn btn-primary mx-2'>Save</button>
                <button className='btn btn-danger mx-2' onClick={() => setIsEditModal(false)}>Close</button>
            </div>
        </form>
    </div>
  )
}

export default EditModal