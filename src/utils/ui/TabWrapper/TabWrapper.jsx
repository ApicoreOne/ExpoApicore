import styles from './TabWrapper.module.scss';

function TabWrapper({children}) {
    return (
        <div className={styles.tabWrapper}>
            {children}
        </div>
    );
}

export default TabWrapper;