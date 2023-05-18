import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

type IFormInput = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const router = useRouter();
  const { updateUser } = useAuth();
  const github = async () => {
    router.push("/api/github");
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { message, user } = await res.json();
    if (message) {
      alert(message);
    }
    if (user) {
      const fetchSession = async () => {
        const res = await fetch("/api/session");
        const data = await res.json();
        updateUser(data);
      };

      fetchSession();
      router.push("/");
    }
  };

  return (
    <div className={styles.registerForm}>
      <h1>Login form</h1>
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
          {...register("password", { required: true })}
        />
        {errors.password && "Password is required"}
        <input type="submit" />
      </form>
      <button className={styles.github} onClick={github}>
        Continue with github
      </button>
    </div>
  );
}
