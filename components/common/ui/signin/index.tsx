import Button from "../button"
import styles from "./signin.module.scss";

const SignIn = () => {
return(
    <div className={styles["sign-wrapper"]}>
<div className={styles["login-account-btn"]}>

<Button className={styles["signup_btn"]}>Sign Up</Button>
<Button className={styles["signin-btn"]}>Sign In</Button>
</div>
    </div>
)
}
export default SignIn