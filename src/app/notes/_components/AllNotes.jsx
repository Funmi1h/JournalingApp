'use client '
import { readAllNote } from "@/src/app/action"
import NoteCard from "@/src/app/notes/_components/NoteCard"
import SimpleButton from "@/src/components/ui/SimpleButton";
import { useState, useEffect } from "react";
import {deleteNote} from "@/src/app/action"
import { BookOpen } from "lucide-react";

import styles from "./AllNote.module.css"


export default  function AllNote({onEdit, openForm}){


      async function deleteCard(idCarte){
        await deleteNote(idCarte);
        setNotesList((prevList) => prevList.filter(note => note.id !== idCarte));
        setSize((prevSize) => prevSize - 1);
    

    }
    async function modifyCard(idCarte, date, contenu) {
        onEdit(idCarte, date, contenu)
        
    }


     const [loading, setLoading] = useState(true);
     const [size, setSize] = useState(-1);
     const [notesList, setNotesList] = useState([]);
     useEffect(()=>{
       async function loadNotes(){
            try {
              const result = await readAllNote();
              setSize(result.tailleNotesList);
              setNotesList(result.data || []);
            } catch(error) {
              console.error("Erreur lors du chargement des notes:", error);
              setSize(0);
              setNotesList([]);
            } finally {
              setLoading(false);
            }
        }
      
        loadNotes();
        
      }, []);
     
     let content;
     if(loading ){
        content = <div className= {styles.container_vide}>Chargement...</div>;
     }else if(size == 0 || notesList.length == 0){
        content = <div className= {styles.container_vide}> 
                    <div className="logo1" >
                        <BookOpen size ={60}  color="#C86646"/>
                        <h1>Commencez par écrire votre premiere entrée </h1>
                    </div>
                    <p>Votre journal est vide </p> <SimpleButton  text={"Commencer"} onCliqueDessus={openForm}/>
                </div> 
        }else{
        content = <div className="container-notes">
                {notesList.map((note) =>(
                    <NoteCard  key = {note.id} text = {note.contenu}  date = {note.date} onDelete={()=>deleteCard(note.id)} onModify={()=>modifyCard(note.id, note.date, note.contenu)}  />
                ))}
                </div>
     }

    return content;


}