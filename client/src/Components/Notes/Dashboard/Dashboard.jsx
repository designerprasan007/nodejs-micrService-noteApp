import React, {useEffect, useState} from 'react'
import { getAllNotesAction, deleteNoteAction } from '../../../actions/noteActions';
import {useDispatch, useSelector} from 'react-redux';
import {FaFlag} from 'react-icons/fa'
import './Dashboard.css'
import EditModal from '../EditModal/EditModal';
import NotesCount from './Components/NotesCount';
const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() =>{
        async function fetchMyNotes() {
            dispatch(getAllNotesAction());
        }
            fetchMyNotes()
    },[dispatch])

    const {allNotes} = useSelector((state) => state.NotesReducer);
    const [showNotes, setShowNotes] = useState(useSelector((state) => state.NotesReducer));
    const [isEditModal, setIsEditModal] = useState(false);
    const [editNote, setEditNote] = useState({})

    const handleFilter = (event, subFun) =>{
            const val = subFun ? event : event.target.value;
            if(val === 'All'){
                setShowNotes(allNotes)
                return
            }
             setShowNotes(allNotes?.filter((note) => note.category === val))
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
    <div className='container pt-3 px-4'>
        <p>Choose Category</p>
        <select defaultValue="All" onChange={(event) =>handleFilter(event)}>
            <option value="All">All</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Designing">Designing</option>
        </select>
        <button className='btn btn-success ms-5' onClick={() => handleEditModal("New")}>Add Note</button>
        <NotesCount allNotes={allNotes} /> 
        <div className='row g-1'>
            {showNotes?.length > 0 && showNotes?.map((note, index) =>{
                return(
                    <div className='col-sm-6 col-lg-3 p-3 notesCard' key={index}>
                        <h4 className={note.status === 'inProgress' ? 'text-center pb-2 border-bottom text-success' : (note.status === "Final" ? "text-center pb-2 border-bottom text-warning" : 'text-center pb-2 border-bottom text-danger')}><FaFlag /> {note.status}</h4>
                        <p>Title: {note.title}</p>
                        <p>Description: {note.description}</p>
                        <p>Category: {note.category}</p>
                        <div className='text-center'>
                            <button onClick={() => handleEditModal(index)} className='btn btn-primary mx-2'>Edit</button>
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