// import useRouter from "next/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Modal({
  name,
  data,
}: {
  name: string;
  data: boolean | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (data === true) {
      return setIsModalOpen(false);
    } else setIsModalOpen(true);
  }, [data]);
  return (
    <div className=" flex flex-col">
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50  "
          aria-labelledby="modal-title"
          role="model"
          aria-modal="true"
        >
          <div className="flex h-screen items-center justify-center px-4 pt-4 pb-20 text-center ">
            <div
              className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg  bg-black/80 text-left text-white shadow-xl transition-all">
              <div className="bg-white px-4 pt-5 pb-4 dark:bg-black/80 dark:text-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-100 "
                      id="modal-title"
                    >
                      OOPS !
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:bg-black/80 dark:text-white">
                        You Are Not Verified {name} , Wait for your
                        Verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 dark:bg-black/80 dark:text-white sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ErrorModal({
  message,
  data,
}: {
  message: string;
  data: boolean | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  useEffect(() => {
    if (data === true) {
      return setIsModalOpen(isModalOpen);
    } else if (data === false) {
      setIsModalOpen(false);
    }
  }, [data, isModalOpen]);
  return (
    <div className=" flex flex-col">
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50  "
          aria-labelledby="modal-title"
          role="model"
          aria-modal="true"
        >
          <div className="flex h-screen items-center justify-center px-4 pt-4 pb-20 text-center ">
            <div
              className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg  bg-black/80 text-left text-white shadow-xl transition-all">
              <div className="bg-white px-4 pt-5 pb-4 dark:bg-black/80 dark:text-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-100 "
                      id="modal-title"
                    >
                      {message}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 dark:bg-black/80 dark:text-white sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
