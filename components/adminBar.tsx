export default function AdminBar({
  presciption,
  btnText,
  submit,
  recordText,
  textId,
}: {
  presciption: string | undefined;
  btnText: string;
  submit: () => void;
  recordText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textId: string;
}) {
  return (
    <div className="w-full rounded-lg flex flex-col gap-2">
      <textarea
        className="textarea textarea-bordered"
        placeholder={presciption}
        onChange={recordText}
        id={textId}
      ></textarea>
      <button className="btn btn-success" onClick={submit}>
        {btnText}
      </button>
    </div>
  );
}

//Do the button to the roots
