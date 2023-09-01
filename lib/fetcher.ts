import { getCookie } from "cookies-next";

const baseurl = "https://uduscare-api-11dc38e09e4d.herokuapp.com/";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string | Date;
}

interface AppointmentProps {
  actualDate: string | Date;
  appointmentTime: string;
  department: string;
  description: string;
}

interface AppointmentDateProp {
  appointmentDate: string | Date;
}

interface MutateProps {
  arg: number;
}

interface UpdateTestProps {
  id: number;
  testDetails: string;
}

interface UpdatePharmacyProps {
  id: number;
  pharmacyDetail: string;
}

interface MarkAsCompletedProps {
  id: number;
}

interface RecordTestProps {
  id: number;
  testResults: string;
}

interface VerifyEmailProps {
  email: string | string[] | undefined;
  verificationId: string | string[] | undefined;
}

interface ChangePasswordProps extends VerifyEmailProps {
  password: string;
}

interface VerifyPasswordProp {
  email: string;
}

export type DataProps =
  | LoginData
  | SignupData
  | AppointmentProps
  | AppointmentDateProp
  | MutateProps
  | UpdateTestProps
  | UpdatePharmacyProps
  | MarkAsCompletedProps
  | RecordTestProps
  | VerifyEmailProps
  | VerifyPasswordProp
  | ChangePasswordProps
  | undefined;

export async function fetcher(url: string, data: DataProps = undefined) {
  try {
    const token = getCookie('token')
    const res = await fetch(`${baseurl}${url}`, {
      method: data ? "POST" : "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { message, statusCode } = await res.json();
      return { message, statusCode };
    }
    const { message, statusCode } = await res.json();
    return { message, statusCode };
  } catch (error) {
    return { error };
  }
}
