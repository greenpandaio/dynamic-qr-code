import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import rsa from "js-crypto-rsa";
import Link from "next/link";

export default function IndexPage() {
  const [message, setMessage] = useState("");
  const [encryptedMsg, setEncryptedMsg] = useState("");

  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const stringToArray = (bufferString) => {
    let uint8Array = new TextEncoder("utf-8").encode(bufferString);
    return uint8Array;
  };

  const arrayToString = (bufferValue) => {
    return new TextDecoder("utf-8").decode(bufferValue);
  };

  useEffect(() => {
    rsa.generateKey(2048).then((key) => {
      setPublicKey(key.publicKey);
      setPrivateKey(key.privateKey);
    });
  }, []);

  setTimeout(() => {
    if (!publicKey) return;

    rsa
      .encrypt(
        stringToArray("353814081031228;" + Date.now()),
        publicKey,
        "SHA-256"
      )
      .then((encrypted) => {
        setMessage("353814081031228;" + Date.now());
        setEncryptedMsg(encrypted.toString());
      });
  }, 800);

  return (
    <div className="w-full text-gray-900 px-5 text-center justify-center align-center">
      <h1 className="pt-10 leading-tight text-3xl text-center font-bold">
        Hello there
      </h1>
      <h2>Don't try to screenshot this.</h2>
      <Link href="/">Go to Unencrypted Version</Link>
      <div className="relative max-w-3/4 mb-5">
        <QRCode
          size={256}
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: "500px",
            width: "100%"
          }}
          value={encryptedMsg}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div>
        <b>Message:</b>
        <br />
        <span className="break-all">{message}</span>
      </div>
      <div>
        <b>Encrypted:</b>
        <br />
        <span className="break-all">{encryptedMsg}</span>
      </div>
    </div>
  );
}
