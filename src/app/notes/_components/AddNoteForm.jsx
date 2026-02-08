"use client"
import ButtonForm from '@/src/components/ui/ButtonForm'
import styles from "./AddNoteForm.module.css"
import { createNote, updateNote } from "@/src/app/action";
import { useState } from 'react';



export default function AddNoteForm({onClose, editingNote}){

    const [date, setDate] = useState(editingNote?.date || "");
    const [contenu, setContenu] = useState(editingNote?.contenu || "");     
    
    async function handleSubmit(e) {
        e.preventDefault();
        if(!date || !contenu){
            alert("Veuillez remplir tous les champs!");
            return
        }
        if(editingNote){
            await updateNote(editingNote.id, date, contenu);
        }else{
            const formData = {date, contenu}
            await createNote(formData);
        }
        setContenu("");
        setDate("");
        onClose();
    }
     
    function closeForm(){
        onClose();
    }

    let formulaire = <div className={styles.AddNoteForm}>
            <form onSubmit={handleSubmit} className= {styles.form}>
                <h1 className= {styles.titre}>Nouvelle entrée</h1>
                <div className={styles.inputGroup}>
                    <label htmlFor="date" >Date</label>
                    <input 
                        type="date" 
                        name="" id="date" 
                        value={date}
                        className= {styles.input} 
                        onChange={(e)=>{setDate(e.target.value)}}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="contenu">Contenu</label>
                    <textarea
                         name="" 
                         id="contenu" 
                         value={contenu}
                         rows={5} cols= {60} 
                         className= {styles.textarea} 
                         placeholder='Ecrivez votre pensée du jour...'
                         onChange={(e) => {setContenu(e.target.value)}}>

                    </textarea>

                </div>
             
               
                <div className="buttons">
                    <ButtonForm type= "button" text = "Annuler" onCliqueDessus={closeForm}/>
                    <ButtonForm type= "submit" text = "Confirmer " onCliqueDessus={handleSubmit}/>
                </div>
                
            </form>
        </div>
    return formulaire;
}