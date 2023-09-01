import { useState } from "react";
import { deleteCookie } from "cookies-next";
import { HiBars3CenterLeft } from "react-icons/hi2";
import NextLink from "next/link";
import { useUser } from "@/lib/hooks";
import { useRouter } from "next/router";

export default function Header({
  navMenu,
  homepath,
  action,
}: {
  navMenu: Array<{ name: string; route: string }>;
  homepath: string;
  action: { name: string; route: string };
}) {
  const { data } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCookiePromise = new Promise((res) => {
    res(deleteCookie("token"));
  });

  async function onLogout() {
    await deleteCookiePromise;
    router.push("/");
  }

  const role = data?.message?.role;
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <HiBars3CenterLeft className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {role === "Doctor" && (
              <li>
                <NextLink href="/doctor-appointments" passHref>
                  Doctor Appointments
                </NextLink>
              </li>
            )}
            {role === "Pharmacy" && (
              <li>
                <NextLink href="/pharmacy-appointments" passHref>
                  Pharmacy Appointments
                </NextLink>
              </li>
            )}
            {role === "Test" && (
              <li>
                <NextLink href="/test-appointments" passHref>
                  Test Appointments
                </NextLink>
              </li>
            )}
            {navMenu.map((nav) => (
              <li key={nav.name}>
                <NextLink href={nav.route} passHref>
                  {nav.name}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
        <NextLink
          href={homepath}
          passHref
          className="btn btn-ghost normal-case text-xl"
        >
          UdusCare
        </NextLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {role === "Doctor" && (
            <li>
              <NextLink href="/doctor-appointments" passHref>
                Doctor Appointments
              </NextLink>
            </li>
          )}
          {role === "Pharmacy" && (
            <li>
              <NextLink href="/pharmacy-appointments" passHref>
                Pharmacy Appointments
              </NextLink>
            </li>
          )}
          {role === "Test" && (
            <li>
              <NextLink href="/test-appointments" passHref>
                Test Appointments
              </NextLink>
            </li>
          )}
          {navMenu.map((nav) => (
            <li key={nav.name}>
              <NextLink href={nav.route} passHref>
                {nav.name}
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {isLoading && (
          <NextLink
            href={action.route}
            className="btn loading"
            onClick={action.route === "/" ? onLogout : undefined}
          >
            {action.name}
          </NextLink>
        )}
        <NextLink
          href={action.route}
          className="btn"
          onClick={action.route === "/" ? onLogout : undefined}
        >
          {action.name}
        </NextLink>
      </div>
    </div>
  );
}
