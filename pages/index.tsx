import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            alt="Spider Man Photo"
            width={200}
            height={200}
            src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Doctor_and_Nurse%2C_Operation_Open_Heart%2C_PNG%2C_2010_%2810693109575%29.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Book Your Hospital Appointment
            </h1>
            <p className="py-6">
              Streamline your hospital appointments with our advanced booking
              system. Say goodbye to long waiting times and scheduling
              headaches. Our intuitive and efficient platform allows you to
              effortlessly book appointments with doctors and specialists,
              ensuring timely and convenient healthcare access for patients.
            </p>
            <p className="py-6">
              With features like real-time availability, easy rescheduling
              options,and top-notch data security using advanced encryption
              system, managing appointments has never been this seamless.
              Maximize your clinic efficiency, minimize patient wait times, and
              provide exceptional healthcare services with our cutting-edge
              appointment book system. Join the future of healthcare scheduling
              today!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
