import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./RegisterForm.module.scss";

type IFormInput = {
  email: string;
  password: string;
};
export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { message } = await res.json();
    if (message) {
      alert(message);
    }
  };

  return (
    <div className={styles.registerForm}>
      <h1>Register form</h1>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <label>E-mail</label>
        <input
          className={errors.email && styles.error}
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          })}
        />
        {errors.email && "Valid e-mail is required"}
        <label>Password</label>
        <input
          className={errors.password && styles.error}
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && "Password min. length is 6"}
        <input type="submit" />
      </form>
    </div>
  );
}
