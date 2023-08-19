import { HiClock } from "react-icons/hi2";
type CustomModalProps = {
  children: React.ReactNode;
  apTime: string;
};

export default function TimeModal({ children, apTime }: CustomModalProps) {
  return (
    <div>
      <label
        htmlFor="my-modal-5"
        className="mt-5 w-full border border-gray-300 rounded-md h-12 cursor-pointer px-4 flex items-center justify-between"
      >
        {" "}
        {apTime || "Choose Appointment time"}
        <HiClock className="w-6 h-6" />
      </label>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-2/3 lg:w-1/3 max-w-5xl">
          {children}
          <div className="modal-action flex items-center justify-center">
            <label htmlFor="my-modal-5" className="btn">
              Set Time
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
