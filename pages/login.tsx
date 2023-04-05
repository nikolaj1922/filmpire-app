import Head from "next/head";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import BgImage from "../public/hero.jpg";
import Logo from "../public/FilmpireLogo.png";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

interface Inputs {
  email: string;
  password: string;
  username?: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, user, loading } = useAuth();
  const [variant, setVariant] = useState("login");
  const router = useRouter();

  const handleToggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password, data.username as string);
    }
  };

  if (user) {
    router.push("/");
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Filmpire</title>
        <meta name="description" content="Best movie search app" />
      </Head>
      <Image
        src={BgImage}
        alt="Background image"
        fill
        className="-z-10 object-cover bg-black opacity-50"
      />
      <Image
        src={Logo}
        alt="Filmpire logo"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">
          {variant === "login" ? "Sign In" : "Register"}
        </h1>
        <div className="space-y-4">
          {variant === "register" && (
            <label className="inline-block w-full">
              <input
                type="text"
                placeholder="Username"
                className={`input ${
                  errors.email && "border-b-2 border-orange-500"
                }`}
                {...register("username", { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
          )}
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${
                errors.email && "border-b-2 border-orange-500"
              }`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className={`input ${
                errors.password && "border-b-2 border-orange-500"
              }`}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          onClick={
            variant === "login" ? () => setLogin(true) : () => setLogin(false)
          }
          type="submit"
        >
          {variant === "login" ? (
            loading ? (
              <CircularProgress size={18} style={{ color: "white" }} />
            ) : (
              "Login"
            )
          ) : loading ? (
            <CircularProgress size={18} style={{ color: "white" }} />
          ) : (
            "Sign Up"
          )}
        </button>
        <div className="text-[gray]">
          {variant === "login"
            ? "First time using Filmpire?"
            : "Alredy have an account?"}
          <span
            onClick={handleToggleVariant}
            className="text-white ml-1 hover:underline cursor-pointer"
          >
            {variant === "login" ? "Create an account" : "Login"}
          </span>
        </div>
      </form>
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Login;
