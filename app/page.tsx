/* eslint-disable react/no-unescaped-entities */
"use client"
import SimpleButton from "./components/SimpleButton"
import AddNoteForm from "./components/AddNoteForm"
import { BookOpen } from "lucide-react"
import AllNotes from "./components/AllNotes"
import { useState } from "react"
export default function Page() {
  const [isFormOpen, setIsForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  function openEditForm(id:string, date: string, contenu:string){
    setEditingNote({id, date, contenu});
    setIsForm(true);
  }
  
  function openForm(){
    setIsForm(true);
  }
  
  function closeForm(){
    setIsForm(false);   
  }
 
  let formulaire;
  if(isFormOpen){
    formulaire = <AddNoteForm onClose={closeForm} editingNote={editingNote}/>
  }else{
    formulaire = <>
    <div className="entete">
      <div className="logo">
        <BookOpen size ={40}  color="#C86646"/>
        <h1>Ton journal</h1>
          
      </div>
      <SimpleButton text = {"+  Nouvelle entrée"} onCliqueDessus={openForm} />

    </div>const [date, setDate] = useState(editingNote?.date || "&quot;);
const [contenu, setContenu] = useState(editingNote?.contenu || "");
    <AllNotes onEdit = {openEditForm}/>
  </>
  }
  return formulaire;
 
}