import Link from "next/link";
import { QrReader } from "react-qr-reader";
import { useEffect, useState } from "react";

import encryptpwd from "encrypt-with-password";

const password = "PANDAS2023@!";

export default function IndexPage() {
  const [data, setData] = useState(null);
  const [valid, setValid] = useState(null);

  return (
    <div className="w-full text-gray-900 px-5 text-center justify-center align-center">
      <h1 className="pt-10 leading-tight text-3xl text-center font-bold">
        QR Scanner
      </h1>
      <div
        className="relative max-w-3/4 mb-5 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <QrReader
          onResult={(result, error) => {
            if (!!error) {
              console.info(error);
              return;
            }

            if (!!result) {
              let value = encryptpwd.decrypt(result?.text, password);

              let time = value.split(";")[1];
              let answer = Date.now() - time;
              if (answer > 3000) {
                setValid(false);
              } else {
                setValid(true);
              }
              setData(value.split(";")[0]);
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{ maxWidth: "500px" }}
        />
        {valid && (
          <>
            <button
              type="button"
              class="mt-5 text-xl text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Success !!
            </button>
            <p>{data}</p>
          </>
        )}

        {!valid && data && (
          <>
            <button
              type="button"
              class="mt-5 text-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              ERROR !!
            </button>
          </>
        )}
      </div>

      <Link
        href="/"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Go to QR
      </Link>
    </div>
  );
}
