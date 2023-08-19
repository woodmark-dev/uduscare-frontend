import useSWR from "swr";
import { fetcher, DataProps } from "./fetcher";

export function usePendingAppointments(pageDetails: DataProps) {
  const { data, mutate, error, isLoading } = useSWR(
    ["appointments/get-pending", pageDetails],
    ([url, pageDetails]) => fetcher(url, pageDetails)
  );

  return { data, error, isLoading, mutate };
}

export function useAppointmentHistory(pageDetails: DataProps) {
  const { data, mutate, error, isLoading } = useSWR(
    ["appointments/get-user-completed", pageDetails],
    ([url, pageDetails]) => fetcher(url, pageDetails)
  );

  return { data, error, isLoading, mutate };
}

function url(id: string | undefined, arg: number, pathname: string) {
  if (id === undefined || "") {
    return `appointments/${pathname}?arg=${arg}`;
  } else {
    return `appointments/${pathname}?arg=${arg}&id=${id}`;
  }
}

export function useDoctorAppointment(
  arg: number,
  id: string | undefined = undefined
) {
  const { data, mutate, error, isLoading } = useSWR(
    url(id, arg, "get-incompleted"),
    fetcher
  );

  return { data, error, isLoading, mutate };
}

export function useTestAppointment(
  arg: number,
  id: string | undefined = undefined
) {
  const { data, mutate, error, isLoading } = useSWR(
    url(id, arg, "get-test-appointments"),
    fetcher
  );

  return { data, error, isLoading, mutate };
}

export function usePharmacyAppointment(
  arg: number,
  id: string | undefined = undefined
) {
  const { data, mutate, error, isLoading } = useSWR(
    url(id, arg, "get-pharmacy-appointments"),
    fetcher
  );
  return { data, error, isLoading, mutate };
}

export function useCompletedAppointments(
  arg: number,
  id: string | undefined = undefined
) {
  const { data, mutate, error, isLoading } = useSWR(
    url(id, arg, "get-completed-appointments"),
    fetcher
  );
  return { data, error, isLoading, mutate };
}

export function useVerifyEmail(details: {
  email: string | string[] | undefined;
  verificationId: string | string[] | undefined;
}) {
  const { error } = useSWR(
    ["auth/verify-email", details],
    ([url, details]) => fetcher(url, details),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { error };
}

export function useUser() {
  const { data } = useSWR("auth/get-user", fetcher);
  return { data };
}
