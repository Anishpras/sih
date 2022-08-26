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
  <div className="flex max-w-xs items-center justify-between rounded-md border bg-white p-4 shadow-sm">
    <div className="flex items-center">
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

const SingleCase = () => {
  const router = useRouter();

  const [active, setActive] = useState(0);
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
      },
    }
  );
  const { data: VerifyArbitrator } = trpc.useQuery([
    "arbitrators.verify-arbitrator",
  ]);
  const { data: getCase } = trpc.useQuery([
    "arbitrators.get-single-case",
    //@ts-ignore
    { caseId: router.query.case },
  ]);
  console.log(router);
  console.log(router.query.case, "getCase");

  const { mutate: addOrder } = trpc.useMutation(
    ["arbitrators.add-order"],

    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("success Order");
      },
    }
  );

  const { mutate: uploadAward } = trpc.useMutation(["arbitrators.add-award"], {
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (result) => {
      console.log("success Award");
      router.push("/arbitrator/cases");
    },
  });

  //Annexure Upload
  const { mutate: uploadAnnexure } = trpc.useMutation(
    ["arbitrators.add-annexure"],
    {
      onError: (error: any) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("Success Annexure");
      },
    }
  );

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
  const awardUpload = async (e: any) => {
    e.preventDefault();
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

  const annexureUpload = async (e: any) => {
    e.preventDefault();
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
  // if (!getCase?.caseDetail?.award) {
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
        {getCase?.caseDetail?.award ? (
          <>
            <div>
              <h1 className="font-Montserrat text-lg">
                Name: <span>{getCase?.caseDetail?.name}</span>
              </h1>
              <h1 className="py-5 font-Montserrat text-lg">
                Description: <span>{getCase?.caseDetail?.description}</span>
              </h1>
              <a
                //  @ts-ignore
                href={getCase?.caseDetail?.award}
                className={CommonButton}
                target="_blank"
                rel="noreferrer"
              >
                <span>View Award</span>
              </a>
              <div className="py-5 font-Montserrat text-lg">
                <h1>Orders of the case </h1>
                {getCase?.orders.map((n: any, index: number) => {
                  return (
                    <div key={index}>
                      <div
                        dangerouslySetInnerHTML={{ __html: n.description }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
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
                  <form className="flex flex-col items-center justify-center   ">
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

                    <button className={CommonButton} onClick={annexureUpload}>
                      Upload Annexure
                    </button>
                  </form>
                </Stepper.Step>
                <Stepper.Completed>
                  <div className="flex items-center justify-center">
                    <div className="flex max-w-xl flex-col justify-center">
                      <input
                        type="file"
                        name=""
                        id=""
                        className={CustomInputStyle}
                        onChange={(e) => handleAwardUpload(e)}
                      />
                      <button className={CommonButton} onClick={awardUpload}>
                        Upload Award
                      </button>
                    </div>
                  </div>
                </Stepper.Completed>
              </Stepper>

              <Group position="center" mt="xl">
                <button
                  type="button"
                  className={CommonButton}
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={CommonButton}
                  onClick={nextStep}
                >
                  Next step
                </button>
              </Group>
            </>
          </>
        )}

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
