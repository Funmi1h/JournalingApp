"use client"
import ButtonForm from './ButtonForm'
import styles from "./AddNoteForm.module.css"
import { createNote, updateNote } from '../action';
import { useState } from 'react';
import {db} from "@/lib/firebase";
function getDate(){
    const now = new Date();
    const year = now.getFullYear();
    const moisChiffre = now.getMonth();
    let mois = " ";
    const jourChiffre = now.getDate();
    switch(moisChiffre){
        case 0:
            mois = "Janvier";
            break
        case 1:
            mois = "Février";
            break

        case 3:
            mois = "Avril";
            break
        case 4:
            mois = "Mai";
            break
        case 5:
            mois = "Juin";
            break
        case 6:
            mois = "Juillet";
            break
        case 7:
            mois = "Aout";
            break
        case 8:
            mois = "Septembre";
            break
        case 9:
            mois = "Octobre";
            break
        case 10:
            mois = "Novembre";
            break
        case 11:
            mois = "Decembre";
            break
        case 2:
            mois = "Mars";
            break
        default:
            mois = " "  ;
            break

    }
}


export default function AddNoteForm({onClose, editingNote}){

    const [date, setDate] = useState(editingNote?.date || "");
    const [contenu, setContenu] = useState(editingNote?.contenu || "");     
    
    async function handleSubmit(e) {
        if(e) {
            e.preventDefault()
        }
        if(!date || !contenu){
            alert("Veuillez remplir tous les champs!");
            return
        }
        if(editingNote){
            await updateNote(editingNote.id, date, contenu);
        }else{
            await createNote(date, contenu);
        }
        setContenu("");
        setDate("");
        onClose();
    }
     
    function closeForm(){
        onClose();
    }

    let formulaire = <div className={styles.AddNoteForm}>
            <form action="" className= {styles.form}>
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