import styles from "./sidebar.module.scss";
const SideBar = ({isopend, setIsOpened,children}: any ) => {
return(
    <>
   { isopend && <div className={styles["sidebar_wraper"]} onClick={() => {
        setIsOpened(false);
      }}>
    {children}
   </div>
   }
   </>
)
}
export default SideBar