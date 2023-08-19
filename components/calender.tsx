export default function CalenderComponent({
  children,
  val,
  changeLabel,
}: {
  children: React.ReactNode;
  val: string;
  changeLabel: () => void;
}) {
  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-center flex-col gap-5">
            {children}{" "}
            <div className="w-full border border-gray-300 rounded-md h-12 cursor-pointer px-4 flex items-center justify-center bg-cyan-800 text-white">
              {val}
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn bg-cyan-800"
              onClick={changeLabel}
            >
              Set Date
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
