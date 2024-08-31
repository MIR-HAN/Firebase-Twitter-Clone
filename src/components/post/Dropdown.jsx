import React, { useRef } from 'react'
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";



const Dropdown = ({ handleDelete, handleEdit }) => {
    const inputRef = useRef();

    return (
        <label className="popup">
            <input ref={inputRef} type="checkbox" />
            <div className="burger" tabindex="0">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className="popup-window">
                <legend>Actions</legend>
                <ul>
                    <li>
                        <button onClick={() => {
                            // close dropdown
                            inputRef.current.checked = false
                            //open edit mode
                            handleEdit()
                        }}>
                            <MdEdit />

                            <span>Edit</span>
                        </button>
                    </li>
                    <hr />
                    <li>
                        <button onClick={handleDelete}>
                            <MdOutlineDelete />

                            <span>Delete</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </label>
    )
}

export default Dropdown