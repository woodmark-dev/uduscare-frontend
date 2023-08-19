import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import CalenderComponent from "./calender";

type CalendarComponentProps = {
  val: string;
  changeLabel: () => void;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  onChange: any;
  value: Date;
  label: string;
  text: string;
};

export default function CalenderModal({
  val,
  changeLabel,
  minDate,
  maxDate,
  onChange,
  value,
  label,
  text,
}: CalendarComponentProps) {
  return (
    <div>
      <label
        htmlFor="my-modal"
        className="mt-5 w-full border border-gray-300 rounded-md h-12 cursor-pointer px-4 flex items-center justify-between"
      >
        <div>{label || text}</div>
        <div>
          <HiOutlineCalendarDays className="w-6 h-6" />
        </div>
      </label>

      <CalenderComponent val={val} changeLabel={changeLabel}>
        <Calendar
          minDate={minDate}
          onChange={onChange}
          value={value}
          maxDate={maxDate}
        />
      </CalenderComponent>
    </div>
  );
}
