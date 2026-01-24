'use client'
import styles from "./SimpleButton.module.css"

export default function SimpleButton({text, onCliqueDessus }){
    
    return(
    <>

        <button 
            className={styles.SimpleButton} 
            onClick={onCliqueDessus} > 
            {text}
        </button>
        

    </>)

}