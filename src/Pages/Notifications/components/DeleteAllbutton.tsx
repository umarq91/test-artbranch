type Props = {
  deleteAllNotifications: () => void;
};

function DeleteAllbutton({ deleteAllNotifications }: Props) {
  return (
    <button
      onClick={deleteAllNotifications}
      className="flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition-all duration-200 ease-in-out hover:bg-red-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="mr-2 h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 7l-.867 12.142A2 2 0 0116.637 21H7.363a2 2 0 01-1.996-1.858L4.5 7m3-2.5a1.5 1.5 0 013 0m6 0a1.5 1.5 0 013 0M3 7h18"
        />
      </svg>
      Delete All
    </button>
  );
}

export default DeleteAllbutton;
