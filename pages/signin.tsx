import { useReducer, useState } from "react";
import { setCookie } from "cookies-next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Input from "../components/input";
import AuthForm from "../components/authForm";
import { fetcher } from "@/lib/fetcher";
import ErrorAlert from "@/components/errorAlert";

const initialState = {
  email: "",
  password: "",
};

type ACTIONTYPE = { type: string; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  const { type, payload } = action;
  switch (type) {
    case "email":
      return { ...state, email: payload };
    case "password":
      return { ...state, password: payload };
    default:
      throw new Error("Not available");
  }
}

export default function Signin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();
  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    const { id, value } = e.currentTarget;
    dispatch({ type: id, payload: value });
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setErr("");
    if (!state.email || !state.password) {
      setErr("Email and password are required");
      return;
    }

    setIsLoading(true);
    const { message, statusCode } = await fetcher("auth/login", state);
    setCookie("token", message.access_token);

    if (statusCode !== 201) {
      setIsLoading(false);
      setErr(message);
      return;
    }

    if (message.role === "User") {
      router.push("/home");
      return;
    }

    if (message.role === "Doctor") {
      router.push("/doctor-appointments");
      return;
    }

    if (message.role === "Test") {
      router.push("/test-appointments");
      return;
    }

    if (message.role === "Pharmacy") {
      router.push("/pharmacy-appointments");
      return;
    }
  }

  return (
    <AuthForm purpose="Sign In">
      <form onSubmit={handleSubmit}>
        <Input
          add={handleChange}
          id={"email"}
          labelName={"Email"}
          type={"email"}
        />
        <Input
          add={handleChange}
          id={"password"}
          labelName={"Password"}
          type={"password"}
        />
        <div className="pt-4">
          {isLoading ? (
            <button className="btn loading w-full" type="submit">
              Sign In
            </button>
          ) : (
            <button className="btn w-full" type="submit">
              Sign In
            </button>
          )}
        </div>
        <p className="text-center text-sm text-gray-500 pt-6">
          Don&#x27;t have an account yet?{" "}
          <NextLink
            href="/signup"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Sign Up
          </NextLink>
        </p>
        <p className="text-center text-sm text-gray-500 pt-6">
          Forgot Password?{" "}
          <NextLink
            href="/forgot-password"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Change password
          </NextLink>
        </p>
        {err && <ErrorAlert message={err} />}
      </form>
    </AuthForm>
  );
}

Signin.prototype.authPage = true;
