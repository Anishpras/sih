import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import MainLayout from "../../../components/layout";
import { CustomInputStyle } from "../../../components/login/Input";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { ArbitratorSidebarData } from "..";
import Modal, { ErrorModal } from "../../../components/modal";
import { Stepper, Group } from "@mantine/core";
import { CommonButton } from "../../../components/login/Button";
import Editor from "../../../components/editor";

const headerTitle = "Arbitrator";

const Loader = () => (
  // <div className="z-50 ">
  //   <div className="success-animation">
  // <svg
  //   className="checkmark"
  //   xmlns="http://www.w3.org/2000/svg"
  //   viewBox="0 0 52 52"
  // >
  //   <circle
  //     className="checkmark__circle"
  //     cx="26"
  //     cy="26"
  //     r="25"
  //     fill="none"
  //   />
  //   <path
  //     className="checkmark__check"
  //     fill="none"
  //     d="M14.1 27.2l7.1 7.2 16.7-16.8"
  //   />
  // </svg>
  //   </div>
  // </div>
  <div className="flex max-w-xs items-center justify-between rounded-md border bg-white p-4 shadow-sm">
    <div className="flex items-center">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className=" text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg> */}
      <svg
        className="checkmark h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <p className="ml-3 text-sm font-bold text-green-600">
        Successfully Toast Message !
      </p>
    </div>
    <button
      type="button"
      onClick={() => false}
      className="inline-flex cursor-pointer items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

// const ErrorModal = (error: any) => {
//   return (
//     <div className="absolute top-0 z-50 flex h-screen flex-col items-center justify-center">
//       <div className="rounded-lg bg-red-500 p-4">
//         <div className="text-2xl font-bold text-white">{error}</div>
//       </div>
//     </div>
//   );
// };
const SingleCase = () => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [award, setAward] = useState<string | ArrayBuffer | null | undefined>(
    null
  );
  const [annexure, setAnnexure] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [awardUploadString, setAwardUploadString] = useState("");
  const [annexureUploadString, setAnnexureUploadString] = useState("");

  const [annexureName, setAnnexureName] = useState("");
  const [annexureDescription, setAnnexureDescription] = useState("");

  const [order, setOrder] = useState("");

  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });
  const [loader, setLoader] = useState(false);
  const { mutate, error: createMutationError } = trpc.useMutation(
    ["arbitrators.create-client"],
    {
      onError: (error: any) => {
        setErrorModal({
          show: true,
          message: error.message,
        });
      },
      onSuccess: () => {
        setLoader(true);
        // <Loader />;
      },
    }
  );
  const { data: VerifyArbitrator } = trpc.useQuery([
    "arbitrators.verify-arbitrator",
  ]);

  const { mutate: addOrder, error: createOrderError } = trpc.useMutation(
    ["arbitrators.add-order"],

    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        // router.push("/client/login");
        console.log("success Order");
      },
    }
  );

  const { mutate: uploadAward, error: uploadAwardError } = trpc.useMutation(
    ["arbitrators.add-award"],
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        // router.push("/client/login");
        console.log("success Award");
      },
    }
  );

  //Annexure Upload
  const { mutate: uploadAnnexure, error: uploadAnnexureError } =
    trpc.useMutation(["arbitrators.add-annexure"], {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("Success Annexure");
      },
    });

  const router = useRouter();
  const { case: caseId } = router.query;

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function generateString(length: number) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  useEffect(() => {
    setAwardUploadString(generateString(10));
    setAnnexureUploadString(generateString(10));
  }, []);

  const { data, error } = trpc.useQuery([
    "arbitrators.get-single-case",
    { caseId: caseId?.toString() },
  ]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (name === "" || username === "" || password === "") {
      setErrorModal({ show: true, message: "Please fill all fields" });
    } else {
      mutate({
        name,
        username,
        password,
        caseId: caseId?.toString(),
      });
    }
  };

  const handleAddOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    addOrder({
      orderData: order,
      caseId: caseId?.toString(),
    });
  };
  const awardUpload = async () => {
    const fileRef = ref(storage, `files/${awardUploadString}`);
    if (award) {
      await uploadString(fileRef, award.toString(), "data_url").then(
        async () => {
          await getDownloadURL(fileRef).then((url) => {
            uploadAward({ caseId: caseId?.toString(), awardUrl: url });
          });
        }
      );
    }
    setAward(null);
  };

  const annexureUpload = async () => {
    const annexureRef = ref(storage, `files/${annexureUploadString}`);
    if (annexure) {
      await uploadString(annexureRef, annexure.toString(), "data_url").then(
        async () => {
          await getDownloadURL(annexureRef).then((url) => {
            console.log(url);
            uploadAnnexure({
              caseId: caseId?.toString(),
              annexureUrl: url,
              name: annexureName,
              description: annexureDescription,
            });
          });
        }
      );
    }
    setAnnexure(null);
  };
  const handleAwardUpload = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setAward(readerEvent?.target?.result);
    };
  };

  //Annexure Upload
  const handleAnnexureUpload = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setAnnexure(readerEvent?.target?.result);
    };
  };

  return (
    <>
      {VerifyArbitrator ? (
        ""
      ) : (
        <Modal name="Arbitrator" data={VerifyArbitrator} />
      )}

      <MainLayout
        logout="arbitratorToken"
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
        {errorModal.show && (
          <ErrorModal data={errorModal.show} message={errorModal.message} />
        )}
        {loader && <Loader />}
        <>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step label="Add Party">
              <form>
                <input
                  required
                  type="text"
                  value={name}
                  placeholder="Party Name"
                  className={`required ${CustomInputStyle}`}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  type="text"
                  value={username}
                  placeholder="Party Username"
                  className={`required ${CustomInputStyle}`}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  required
                  type="password"
                  value={password}
                  placeholder="Party Password"
                  className={`required ${CustomInputStyle}`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className={CommonButton}
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Add Party
                </button>
              </form>
            </Stepper.Step>
            <Stepper.Step label="Case Details">
              <Editor value={order} setValue={setOrder} />

              <button
                className={` mt-3 ${CommonButton}`}
                onClick={(e) => handleAddOrder(e)}
              >
                Add Order
              </button>
            </Stepper.Step>
            <Stepper.Step
              label="Supporting Documents"
              description="Add All the supporting documents"
            >
              <form className="">
                <input
                  type="text"
                  value={annexureName}
                  placeholder="Annexure Name"
                  className={CustomInputStyle}
                  onChange={(e) => setAnnexureName(e.target.value)}
                />
                <input
                  type="text"
                  value={annexureDescription}
                  placeholder="Annexure Description"
                  className={CustomInputStyle}
                  onChange={(e) => setAnnexureDescription(e.target.value)}
                />
                <div className="max-w-xl">
                  <label className="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
                    <span className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="font-medium text-gray-600">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline">browse</span>
                      </span>
                    </span>
                    <input
                      type="file"
                      name=""
                      id=""
                      className="hidden"
                      onChange={(e) => handleAnnexureUpload(e)}
                    />
                  </label>
                </div>
                <button className={CommonButton} onClick={annexureUpload}>
                  Upload Annexure
                </button>
              </form>
            </Stepper.Step>
            <Stepper.Completed>
              <div className="">
                <div className="max-w-xl">
                  <label className="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
                    <span className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="font-medium text-gray-600">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline">browse</span>
                      </span>
                    </span>
                    <input
                      type="file"
                      name=""
                      id=""
                      className="hidden"
                      onChange={(e) => handleAwardUpload(e)}
                    />
                  </label>
                </div>

                <button onClick={awardUpload}>Upload Award</button>
              </div>
            </Stepper.Completed>
          </Stepper>

          <Group position="center" mt="xl">
            <button type="button" className={CommonButton} onClick={prevStep}>
              Back
            </button>
            <button type="button" className={CommonButton} onClick={nextStep}>
              Next step
            </button>
          </Group>
        </>
        {/* <form>
        <h1>Single Case</h1>
        <h1>Add Your Client</h1>
        <input
          required
          type="text"
          value={name}
          placeholder="Client Name"
          className={`required ${CustomInputStyle}`}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="text"
          value={username}
          placeholder="Client Username"
          className={`required ${CustomInputStyle}`}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="password"
          value={password}
          placeholder="Client Password"
          className={`required ${CustomInputStyle}`}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Add Client
        </button>

        <input
          type="file"
          name=""
          id=""
          onChange={(e) => handleAwardUpload(e)}
        />
        <button onClick={awardUpload}>Upload Award</button>

        <input
          type="text"
          value={annexureName}
          placeholder="Annexure Name"
          className={CustomInputStyle}
          onChange={(e) => setAnnexureName(e.target.value)}
        />
        <input
          type="text"
          value={annexureDescription}
          placeholder="Annexure Description"
          className={CustomInputStyle}
          onChange={(e) => setAnnexureDescription(e.target.value)}
        />
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => handleAnnexureUpload(e)}
        />
        <button onClick={annexureUpload}>Upload Annexure</button>
      </form> */}
      </MainLayout>
    </>
  );
};

export default SingleCase;
