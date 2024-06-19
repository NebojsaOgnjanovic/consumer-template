import dynamic from "next/dynamic";
import { Suspense, lazy, useEffect, useState } from "react";

//   @ts-ignore
const RemotePage = dynamic(() => import("checkout/checkout"));

const Checkout = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only once on mount, indicating that we are now client-side.
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <Suspense fallback={<div>Loading...</div>}>
          <RemotePage />
        </Suspense>
      ) : null}
    </div>
  );
};

export default Checkout;
