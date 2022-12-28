import styles from '../styles/404.module.css'

export default function Custom404() {
    return (
        <div className={styles.container}>
            <p>Ooops, something went wrong ...</p>
            <h1>404 - Page Not Found</h1>
        </div>
    )
}