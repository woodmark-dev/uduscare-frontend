export default function WarningModal({
  deleteAction,
  id,
  name,
  purpose,
}: {
  deleteAction: () => void;
  id: number;
  name: string;
  purpose: string;
}) {
  return (
    <div>
      <input type="checkbox" id={`my-modal-${id}`} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to {name}?
          </h3>
          <div className="modal-action">
            <label htmlFor={`my-modal-${id}`} className="btn bg-green-600">
              Cancel
            </label>
            <label
              onClick={deleteAction}
              htmlFor={`my-modal-${id}`}
              className="btn bg-error"
            >
              {purpose}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
