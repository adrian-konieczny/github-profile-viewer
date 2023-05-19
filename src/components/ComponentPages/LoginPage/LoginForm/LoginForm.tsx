import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

type LoginFormInput = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInput>({ defaultValues: { email: "", password: "" } });
  const router = useRouter();
  const { refetchSession } = useAuth();

  const handleGithubLogin = () => {
    router.push("/api/github");
  };

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { message, user } = await res.json();

    if (message) {
      alert(message);
    }

    if (user) {
      await refetchSession();

      router.push("/");
    }
  };

  return (
    <div className={styles.registerForm}>
      <h1>Login form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <button className={styles.github} onClick={handleGithubLogin}>
        Continue with github
      </button>
    </div>
  );
};
