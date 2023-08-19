import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Mainpage from "../components/mainpage";

const navMenu = [
  {
    name: "Book Appointment",
    route: "/home",
  },
  {
    name: "Home",
    route: "/",
  },
];

const mainAction = {
  name: "Login/Signup",
  route: "/signin",
};

const mainhomepath = "/";

const logout = {
  name: "Logout",
  route: "/",
};

const userPagehomepath = "/home";

const pageNav = [
  {
    name: "Book Appointment",
    route: "/home",
  },
  {
    name: "Pending Appointment",
    route: "/pending-appointment",
  },
  {
    name: "Appointment History",
    route: "/appointment-history",
  },
];

const adminPageNav = [
  {
    name: "Completed Appointments",
    route: "/completed-appointments",
  },
];

const adminHomePath = "/doctor-appointments";

export default function App({ Component, pageProps }: AppProps) {
  return Component.prototype.authPage ? (
    <Component {...pageProps} />
  ) : Component.prototype.userPage ? (
    <Mainpage navMenu={pageNav} action={logout} homepath={userPagehomepath}>
      <Component {...pageProps} />
    </Mainpage>
  ) : Component.prototype.adminPage ? (
    <Mainpage navMenu={adminPageNav} action={logout} homepath={adminHomePath}>
      <Component {...pageProps} />
    </Mainpage>
  ) : (
    <Mainpage navMenu={navMenu} action={mainAction} homepath={mainhomepath}>
      <Component {...pageProps} />
    </Mainpage>
  );
}
