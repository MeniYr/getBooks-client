import { shadows } from '@mui/system'
import React from 'react'
import styles from "./account.module.css"

export default function MyAccount() {
    // let bootstrapStyle = {
    //     shadow:"shadow"
    // }

    return (
        <div className='container'>
            <div className={`m-md-5  row ${styles.account}`}>
                <div className={`shadow ${styles.dives}`}>a</div>
                <div className={`shadow ${styles.dives}`}>b</div>
                <div className={`shadow ${styles.dives}`}>c</div>
                <div className={`shadow ${styles.dives}`}>d</div>
            </div>
        </div>
    )
}
