"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/verify-email/verify");
  return null;
}

// "use client";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// import React from "react";

// const page = () => {
//   return (
//     <div>
//       <WalletMultiButton />
//     </div>
//   );
// };

// export default page;
