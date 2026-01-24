import { type } from "os"
import styles from "./ButtonForm.module.css"
export default function ButtonForm({type, text, onCliqueDessus}){
    return (
        <>
            <button type={type} className={styles.ButtonForm} onClick={onCliqueDessus}>{text}</button>
        </>
    )

}