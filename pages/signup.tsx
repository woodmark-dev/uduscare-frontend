import { useReducer, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import AuthForm from "../components/authForm";
import Input from "../components/input";
import CalenderModal from "@/components/calenderModal";
import { fetcher } from "@/lib/fetcher";
import ErrorAlert from "@/components/errorAlert";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

type ACTIONTYPE = { type: string; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  const { type, payload } = action;
  switch (type) {
    case "firstName":
      return { ...state, firstName: payload };
    case "lastName":
      return { ...state, lastName: payload };
    case "email":
      return { ...state, email: payload };
    case "password":
      return { ...state, password: payload };
    case "confirmPassword":
      return { ...state, confirmPassword: payload };
    case "gender":
      return { ...state, gender: payload };
    default:
      throw new Error("Not available");
  }
}

export default function Signup() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, onChange] = useState(new Date());
  const [label, setLabel] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    dispatch({ type: e.currentTarget.id, payload: e.currentTarget.value });
  }
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setErr("");
    if (state.password !== state.confirmPassword) {
      setErr("Password and Confirm password do not match");
      return;
    }
    if (
      !state.email ||
      !state.gender ||
      !state.firstName ||
      !state.lastName ||
      !state.password ||
      !state.confirmPassword
    ) {
      setErr("All fields are required");
      return;
    }

    setIsLoading(true);
    const { firstName, lastName, email, password, gender } = state;
    const { message, statusCode } = await fetcher("auth/signup", {
      firstName,
      lastName,
      email,
      password,
      sex: gender,
      dateOfBirth: value.toDateString(),
    });

    if (statusCode !== 201) {
      setIsLoading(false);
      setErr(message);
      return;
    }

    //Here we'll push to signup success page
    setIsLoading(false);
    router.push("/check-email");
  }

  return (
    <AuthForm purpose="Sign Up">
      <form onSubmit={handleSubmit}>
        <Input
          add={handleChange}
          id={"firstName"}
          labelName={"First Name"}
          type={"text"}
        />
        <Input
          add={handleChange}
          id={"lastName"}
          labelName={"Last Name"}
          type={"text"}
        />
        <Input
          add={handleChange}
          id={"email"}
          labelName={"Email"}
          type={"email"}
        />
        <select
          className="select w-full mt-5 border border-gray-300"
          onChange={(e) =>
            dispatch({ type: "gender", payload: e.currentTarget.value })
          }
        >
          <option disabled selected>
            Select Gender
          </option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <CalenderModal
          val={value.toDateString()}
          changeLabel={() => setLabel(value.toDateString())}
          minDate={undefined}
          maxDate={new Date(2005, 1, 1)}
          onChange={onChange}
          value={value}
          label={label}
          text="Select your date of birth"
        />
        <Input
          add={handleChange}
          id={"password"}
          labelName={"Password"}
          type={"password"}
        />
        <Input
          add={handleChange}
          id={"confirmPassword"}
          labelName={"confirmPassword"}
          type={"password"}
        />
        <div className="mt-5">
          {isLoading ? (
            <button className="btn w-full loading" type="submit">
              Sign Up
            </button>
          ) : (
            <button className="btn w-full" type="submit">
              Sign Up
            </button>
          )}
        </div>
        <p className="text-center text-sm text-gray-500 pt-6">
          Already have an account?{" "}
          <NextLink
            href="/signin"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Sign In
          </NextLink>
        </p>
        {err && <ErrorAlert message={err} />}
      </form>
    </AuthForm>
  );
}

Signup.prototype.authPage = true;
