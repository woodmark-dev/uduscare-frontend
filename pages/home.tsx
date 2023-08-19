import { useRouter } from "next/router";
import { useState } from "react";
import AuthForm from "../components/authForm";
import Input from "../components/input";
import CalenderModal from "../components/calenderModal";
import TimeModal from "@/components/timeModal";
import { timeSelected, defaultTimeStyle } from "@/lib/custom-styles";
import { fetcher } from "@/lib/fetcher";
import { filter } from "@/lib/filter";
import { Router } from "next/router";

const availableTimes = [
  "9am - 10am",
  "10am - 11am",
  "11am - 12pm",
  "12pm - 1pm",
  "1pm - 2pm",
  "2pm - 3pm",
  "3pm - 4pm",
  "4pm - 5pm",
];

const departments = [
  "Family & Specialty Medicine",
  "Gynaecology/Maternity",
  "Peadiatrics & Neaonatology",
  "Eye Clinic",
  "Dental Clinic",
  "Neurosurgery",
  "Orthopedic",
  "Others",
];

export default function Home() {
  const [value, onChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [label, setLabel] = useState("");
  const [stime, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [times, setTimes] = useState<Array<string>>([]);

  const router = useRouter();

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetcher("appointments/add", {
        actualDate: value.toDateString(),
        appointmentTime: stime,
        department,
        description,
      });
      onChange(new Date());
      setLabel("");
      setTime("");
      setDescription("");
      setDepartment("");
      setIsLoading(false);
      router.push("/pending-appointment");
    } catch (error) {
      setErr("An error happened");
    }
  }

  async function getTimes() {
    const data = { appointmentDate: value.toDateString() };
    try {
      setLabel(value.toDateString());
      const times = await fetcher("appointments/get-times", data);
      setTimes(filter(times.message.allTimes, availableTimes));
    } catch (error) {
      return "Could not fetch data";
    }
  }

  function handleTime(e: React.MouseEvent<HTMLElement>) {
    setTime(e.currentTarget.outerText);
  }

  return (
    <AuthForm purpose="Book Appointment">
      <form onSubmit={submitHandler}>
        <select
          className="select w-full mt-5 border border-gray-300"
          onChange={(e) => setDepartment(e.currentTarget.value)}
        >
          <option disabled selected>
            Select Department
          </option>
          {departments.map((department) => (
            <option key={department}>{department}</option>
          ))}
        </select>
        <CalenderModal
          val={value.toDateString()}
          changeLabel={getTimes}
          minDate={new Date()}
          maxDate={undefined}
          onChange={onChange}
          value={value}
          label={label}
          text="Select the date of your appointment"
        />

        <div className="mt-5">
          <TimeModal apTime={stime}>
            <h2 className="text-center mb-3 font-bold">
              Available Times for Today
            </h2>
            <div className="flex flex-wrap gap-2">
              {times.map((time) => (
                <div
                  onClick={handleTime}
                  key={time}
                  className="border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-cyan-600 hover:text-white w-2/7 text-center"
                  style={stime === time ? timeSelected() : defaultTimeStyle()}
                >
                  {time}
                </div>
              ))}
            </div>
          </TimeModal>
        </div>
        <textarea
          placeholder="Add a brief description"
          onChange={(e) => setDescription(e.currentTarget.value)}
          className="w-full mt-5"
        />
        <div className="mt-5">
          {isLoading ? (
            <button className="btn w-full loading" type="submit">
              Book Appointment
            </button>
          ) : (
            <button className="btn w-full" type="submit">
              Book Appointment
            </button>
          )}
        </div>
      </form>
    </AuthForm>
  );
}

Home.prototype.userPage = true;
