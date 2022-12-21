import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import Link from "next/link";
import encryptpwd from "encrypt-with-password";

const password = "PANDAS2023@!";

export default function IndexPage() {
  const [message, setMessage] = useState("");

  setTimeout(() => {
    const encrypted = encryptpwd.encrypt(
      "353814081031228;" + Date.now(),
      password
    );
    setMessage(encrypted);
  }, 500);

  return (
    <div className="w-full text-gray-900 px-5 text-center justify-center align-center">
      <h1 className="pt-10 leading-tight text-3xl text-center font-bold">
        Hello there
      </h1>
      <h2>Don't try to screenshot this.</h2>
      {/* <Link href="/encrypted">Go to Encrypted Version</Link> */}
      <div className="relative max-w-3/4 mb-5">
        {message && (
          <QRCode
            size={256}
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: "500px",
              width: "100%"
            }}
            value={message}
            viewBox={`0 0 256 256`}
          />
        )}
      </div>
      <Link
        href="/scan"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Go to scanner
      </Link>
      {/* <div>
        <b>Message:</b>
        <br />
        <span className="break-all">{message}</span>
      </div>
      <div>
        <b>Encrypted:</b>
        <br />
        <span className="break-all">{encryptedMsg}</span>
      </div> */}
    </div>
  );
}
