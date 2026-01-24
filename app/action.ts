'use server'
import {db} from "@/lib/firebase"
import{doc, collection , addDoc, getDoc, getDocs, deleteDoc, updateDoc} from "firebase/firestore"
export async function createNote( formData:{date:string, contenu:string}) {
    const date = String(formData.date);
    const contenu = formData.contenu;
   
    try{
        const notesCollection = collection(db, "notes");
        const docRef = await addDoc(notesCollection, {
        date,
        contenu, 
        createdAt: new Date().toISOString()
        
        });
        return {
        success: true,
        id: docRef.id,
        message: "Note enregistrée"

    }

    }catch(error){
        console.error("Erreur Firebase: ", error);
        return {
            message: "Erreur lors de l'enregistrement ",
            success: false,

        }
    }
    
    
        
}
export async function readAllNote() {
    try{
        const notesCollection  = collection(db, "notes")
        const querySnapshot = await getDocs(notesCollection);
        const notesList =querySnapshot.docs.map(doc =>{
            const id= doc.id;
            const donnees =  doc.data();
            const contenu = donnees.contenu;
            const date = donnees.date;
            return{
                id: id,
                contenu:contenu,
                date: date
            }
        })  
        return{
            success: true,
            data:notesList,
            tailleNotesList: querySnapshot.size
        }
        
    }catch(error){
        console.log("Erreur lecture")
        return {
            success:false,
            message: "Erreur firebase:", error
        }
    }
      
}
export async function deleteNote(id: string) {
    try{
        const docRef = doc(db, "notes", id);
        await deleteDoc(docRef);
        return{
            success:true
        }

    }catch(error){
        return{
            message : "Erreur firebase: ", error,
            success:false
        }

    }
    
    
    
}

export async function updateNote(id: string, date: string, contenu: string) {
    try{

        const docRef = doc(db, "notes", id);
        await updateDoc(docRef, {date, contenu})
    }catch(error){
        console.log("Impossible de modifier la note ")
        return {
            message: "Erreur firebase: ", error,
            success:false
        }
    }
    
}
export async function readOneNote(id:string) {
    try{
        const docRef = doc(db, "notes", id);
        const snapshot = await getDoc(docRef);
        if(snapshot.exists()){
            return{
                success: true,
                data: snapshot.data()
            }

        }


    }catch(error){
        console.log("Impossible de lire la note");
        return{
            success:false,
            message : "Erreur firebase: ", error
            }
    }
    
}