import { Suspense } from "react";
import dynamic from "next/dynamic";

const DynamicConnectAccount = dynamic(() => import("./ConnectAccount"), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicConnectAccount />
    </Suspense>
  );
}
