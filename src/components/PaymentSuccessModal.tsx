/* eslint-disable @next/next/no-img-element */
"use client";

import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "./ui/modal";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const PaymentSuccessModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get();
      return await res.json();
    },
    refetchInterval: (query) => {
      return query.state.data?.plan === "PRO" ? false : 1000;
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    router.push("/dashboard");
  };

  const isPaymentSuccessful = data?.plan === "PRO";

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful ? (
          <div className="flex flex-col items-center justify-center h-64">
            <LoadingSpinner className="mb-4" />
            <p className="text-lg/7 font-medium text-gray-900">Upgrading your account...</p>
            <p className="text-gray-600 text-sm/6 mt-2 text-center text-pretty">
              Please wait while we process your upgrade. This may take a few moments.
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
              <img
                src="/brand-asset-heart.png"
                className="h-full w-full object-cover"
                alt="payment success"
              />
            </div>

            <div className="mt-5 flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 tracking-tight font-medium text-pretty">
                Upgrade successfull! 🎉
              </p>

              <p className="text-gray-600 text-sm/6 text-pretty">
                Thank you for upgrading to Pro and supporting PingPanda. Your account has been
                upgraded.
              </p>
            </div>

            <div className="mt-8 w-full">
              <Button onClick={handleClose} className="h-12 w-full">
                <Check className="mr-2 size-5" />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;
