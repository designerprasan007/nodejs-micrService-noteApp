import React from 'react'
import {FaCircle} from 'react-icons/fa'
import './NotesCount.css'

const NotesCount = ({allNotes}) => {
  return (
    <div>
        <p> <span className='text-success'><FaCircle /></span> In process: {allNotes?.filter((note) => note.status === "inProgress").length}</p>
        <p> <span className='text-warning'><FaCircle /></span> Final: {allNotes?.filter((note) => note.status === "Final").length}</p>
        <p> <span className='text-danger'><FaCircle /></span> Marked as Review: {allNotes?.filter((note) => note.status === "Review").length}</p>
    </div>
    )
}

export default NotesCount