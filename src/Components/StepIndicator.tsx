import { motion } from "framer-motion";

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "Social" },
    { id: 3, label: "Verification" },
  ];

  return (
    <ol className="flex w-full items-center text-center text-sm font-medium text-gray-500 sm:text-base dark:text-gray-400">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={`flex items-center md:w-full ${
            index + 1 <= currentStep ? "text-blue-600" : "text-gray-500"
          } dark:${index + 1 <= currentStep ? "text-blue-500" : "text-gray-400"} after:h-1 after:w-full after:border-b after:content-[''] ${
            index < steps.length - 1
              ? "after:border-1 after:mx-6 after:hidden after:border-gray-200 sm:after:inline-block xl:after:mx-10"
              : ""
          } dark:after:border-gray-700`}
        >
          <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500">
            {index + 1 <= currentStep ? (
              <motion.svg
                className="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </motion.svg>
            ) : (
              <span className="me-2">{index + 1}</span>
            )}
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default StepIndicator;
