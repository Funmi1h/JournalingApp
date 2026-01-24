import styles from "./NoteCard.module.css"
import { Pencil, Trash2 } from "lucide-react"
import {deleteNote, updateNote} from "../action"

export default function NoteCard({id, date, text, onModify, onDelete} ){

    
    return(
        <div className={styles.NoteCard}>
             <div className={styles.note_contenu}>
                <h1> {date} </h1>
                <p> {text} </p>
            </div>
            <div className={styles.notesBtn}>
            <button onClick={onModify} className={styles.btnIconEdit}>
                <Pencil size={18}/>
            </button>
            <button onClick={onDelete} className={styles.btnIconDelete}>
                <Trash2 size={20} />
            </button>

            </div>
        </div>
    )
   

}