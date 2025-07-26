function PasswordTab() {
  return (
    <div className="space-y-10">
      {/* Old Password Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold" htmlFor="oldPassword">
          Old Password
        </label>
        <input
          type="password"
          className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your old password"
          name="oldPassword"
        />
      </div>

      {/* New Password Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold" htmlFor="newPassword">
          New Password
        </label>
        <input
          type="password"
          className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your new password"
          name="newPassword"
        />
        <p className="text-sm text-gray-500">
          Make sure your new password is strong and secure.
        </p>
      </div>
    </div>
  );
}

export default PasswordTab;
