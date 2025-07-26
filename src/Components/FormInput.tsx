import { Field } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  optional?: boolean;
  error?: string;
  style?: React.CSSProperties;
  showPassword?: boolean;
  disabled?: boolean;
  togglePasswordVisibility?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  placeholder,
  label,
  optional = false,
  error,
  style,
  showPassword,
  disabled,
  togglePasswordVisibility,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label} {optional && <span className="text-gray-500">(optional)</span>}
      </label>
      <Field
        id={id}
        disabled={disabled}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        className="w-full rounded-lg border p-6"
        style={style}
      />
      {type === "password" && (
        <div
          className="absolute inset-y-0 right-0 mt-6 flex cursor-pointer items-center pr-6"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FaEye className="text-gray-600" />
          ) : (
            <FaEyeSlash className="text-gray-600" />
          )}
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default FormInput;
