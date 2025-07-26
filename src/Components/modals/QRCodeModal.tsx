import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import React, { useRef } from "react";
import { FaDownload, FaQrcode } from "react-icons/fa";

interface QRCodeModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  url: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  url,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={() => setIsModalOpen(false)}
    >
      <motion.div
        className="relative w-full max-w-md rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner clicks
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isModalOpen ? 1 : 0.8, opacity: isModalOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsModalOpen(false)}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div ref={qrRef} className="flex flex-col items-center">
          <QRCodeCanvas
            value={url}
            size={200}
            level="H"
            includeMargin={true}
            className="border border-gray-200 p-2"
          />
          <button
            className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-xs text-black transition hover:bg-gray-200"
            onClick={downloadQRCode}
          >
            <FaDownload className="text-lg" />
            <span>Download</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const QRCodeButton = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white transition-transform duration-300 hover:shadow-lg md:h-14 md:w-14"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
      >
        <FaQrcode className="h-6 w-6 text-gray-800" />
      </motion.div>
    </div>
  );
};
