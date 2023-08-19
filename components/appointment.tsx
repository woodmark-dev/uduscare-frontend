import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import WarningModal from "./warningModal";
import AdminBar from "./adminBar";

export type AppointmentProps = {
  deleteAction: () => void;
  mode: string;
  id: string;
  appointmentTime: string;
  actualDate: string;
  description: string;
  department: string;
  stage: string | undefined;
  testDescription: string | undefined;
  test: boolean;
  drugs: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  testResults: string | undefined;
  sex: string | undefined;
  prescribeDrug: () => void;
  prescribeTest: () => void;
  recordText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textId: string;
  markCompleted: () => void;
};

export default function Appointment({
  deleteAction,
  mode,
  id,
  appointmentTime,
  actualDate,
  description,
  department,
  firstName,
  lastName,
  dateOfBirth,
  sex,
  stage,
  testDescription,
  test,
  testResults,
  drugs,
  prescribeDrug,
  prescribeTest,
  recordText,
  textId,
  markCompleted,
}: AppointmentProps) {
  const [presciption, setPrescription] = useState("");
  return (
    <div className="collapse w-full border border-gray-300 rounded-lg">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <p>{department}</p>
        </div>
        <HiChevronDown />
      </div>
      <div className="collapse-content">
        <div className="flex gap-3 flex-col">
          <p>ID: {id}</p>
          {mode === "doctor appointment" || mode === "test appointment" ? (
            <div className="flex gap-3 flex-col">
              <p>
                Patient Name: {lastName} {firstName}
              </p>
              <p>Gender: {sex}</p>
              <p>Date of Birth: {dateOfBirth}</p>
            </div>
          ) : (
            <div></div>
          )}
          {mode === "doctor appointment" && (
            <div className="flex gap-3 flex-col">
              <p>Appointment Date: {actualDate}</p>
              <p>Appointment Time: {appointmentTime}</p>
            </div>
          )}
          <p>Department: {department}</p>
          <p>Full Description: {description}</p>
          {mode === "test appointment" && (
            <p>Test Description: {testDescription}</p>
          )}
          {mode === "doctor appointment" && test === true && (
            <p>Tests Results: {testResults}</p>
          )}
          {mode === "pending" && <p>Stage: {stage}</p>}
          {mode === "completed" || "completed appointment" ? (
            <div className="flex gap-3 flex-col">
              {test === true && <p>Tests: {testDescription}</p>}
              {drugs && <p>Drugs: {drugs}</p>}
              {testResults && <p>Tests Results: {testResults}</p>}
            </div>
          ) : (
            <div></div>
          )}
          {mode === "pharmacy appointment" && (
            <p>Drugs to Administer: {drugs}</p>
          )}
          {mode === "pharmacy appointment" && (
            <div className="mt-3">
              <label htmlFor="my-modal-20" className="btn btn-success w-full">
                Mark as completed
              </label>
              <WarningModal
                deleteAction={markCompleted}
                name="mark this appointment as completed"
                id={20}
                purpose="Mark Complete"
              />
            </div>
          )}
          {mode === "pending" && (
            <div className="w-full mt-3">
              <label htmlFor="my-modal-10" className="btn btn-error w-full">
                Delete Appointment
              </label>
              <WarningModal
                deleteAction={deleteAction}
                name="delete this appointment"
                id={10}
                purpose="Delete Appointment"
              />
            </div>
          )}

          {mode === "doctor appointment" && (
            <div className="btn-group flex items-center justify-center gap-1 mt-3">
              <button
                className="btn"
                onClick={() => setPrescription("Prescribe Drugs")}
              >
                Prescribe Drugs
              </button>
              <button
                className="btn"
                onClick={() => setPrescription("Prescribe Tests")}
              >
                Prescribe Tests
              </button>
              <label htmlFor="my-modal-30" className="btn btn-success">
                Mark as Completed
              </label>
              <WarningModal
                deleteAction={markCompleted}
                name="mark this appointment as completed"
                id={30}
                purpose="Mark Complete"
              />
            </div>
          )}
          {mode === "doctor appointment" &&
          presciption === "Prescribe Drugs" ? (
            <AdminBar
              presciption="Prescribe Drugs"
              btnText="Prescribe Drugs"
              submit={prescribeDrug}
              recordText={recordText}
              textId={textId}
            />
          ) : presciption === "Prescribe Tests" ? (
            <AdminBar
              presciption="Prescribe Tests"
              btnText="Prescribe Tests"
              submit={prescribeTest}
              recordText={recordText}
              textId={textId}
            />
          ) : (
            <div></div>
          )}

          {mode === "test appointment" && (
            <AdminBar
              presciption="Record Test Results"
              btnText="Record Test"
              submit={prescribeTest}
              recordText={recordText}
              textId={textId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
