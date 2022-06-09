import React, {useEffect, useState} from 'react'
import { getAllNotesAction, deleteNoteAction } from '../../../actions/noteActions';
import {useDispatch, useSelector} from 'react-redux';

import './Dashboard.css'
import EditModal from '../EditModal/EditModal';

const Dashboard = () => {

    const dispatch = useDispatch();

    useEffect(() =>{
        async function fetchMyNotes() {
            dispatch(getAllNotesAction());
        }
            fetchMyNotes()
    },[])


    const {allNotes} = useSelector((state) => state.NotesReducer);
    const [showNotes, setShowNotes] = useState(allNotes);
    const [isEditModal, setIsEditModal] = useState(false);
    const [editNote, setEditNote] = useState({})

    const handleFilter = (event, subFun) =>{
            const val = subFun ? event : event.target.value;
            if(val === 'All'){
                setShowNotes(allNotes)
                return
            }
             setShowNotes(allNotes.filter((note) => note.category === val))
    }
    const handleEditModal = (index) =>{
        setIsEditModal(true)
        if(index !== "New"){
            setEditNote(showNotes[index])
        }
    }

    const deleteNote = (index) =>{
        handleFilter(showNotes[index].status, true)
        dispatch(deleteNoteAction(showNotes[index]._id))
    }
    return (
    <div className='container pt-3'>
        <p>Choose Category</p>
        <select defaultValue="All" onChange={(event) =>handleFilter(event)}>
            <option value="All">All</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Designing">Designing</option>
        </select>
        <button className='btn btn-success ms-5' onClick={() => handleEditModal("New")}>Add Note</button>
        <div>
            <p>In process: {allNotes?.filter((note) => note.status === "inProgress").length}</p>
            <p>Final: {allNotes?.filter((note) => note.status === "Final").length}</p>
            <p>Marked as Review: {allNotes?.filter((note) => note.status === "Review").length}</p>
        </div>
        <div className='row pt-3 g-0'>
            {showNotes?.length > 0 && showNotes?.map((note, index) =>{
                return(
                    <div className='col-3 p-3 notesCard' key={index}>
                        <p>Title: {note.title}</p>
                        <p>Description: {note.description}</p>
                        <p>Status: {note.status}</p>
                        <p>Category: {note.category}</p>
                        <div className='text-center'>
                            <button onClick={(event) => handleEditModal(index)} className='btn btn-primary mx-2'>Edit</button>
                            <button className='btn btn-danger mx-2' onClick={() => deleteNote(index)}>Delete</button>
                        </div>
                    </div>
                )
            }) }
        </div>
        {isEditModal && <EditModal editNote={editNote} setIsEditModal={setIsEditModal} />}
    </div>
  )
}

export default Dashboard