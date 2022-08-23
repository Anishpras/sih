import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import MainLayout from "../../../components/layout";
import { CustomInputStyle } from "../../../components/login/Input";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
const headerTitle = "Arbitrator";

const sidebarData = [
  {
    route: "/arbitrator",
    name: "Dashboard",
  },
  {
    name: "Admins",
    route: "/arbitrator/case",
  },
];

const SingleCase = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("123456");
  const [award, setAward] = useState<string | ArrayBuffer | null | undefined>(
    null
  );
  const [awardUploadString, setAwardUploadString] = useState("");

  const { mutate, error: createMutationError } = trpc.useMutation(
    ["arbitrators.create-client"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        // router.push("/client/login");
        console.log("success");
      },
    }
  );

  const { mutate: uploadAward, error: uploadAwardError } = trpc.useMutation(
    ["arbitrators.add-award"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        // router.push("/client/login");
        console.log("success Award");
      },
    }
  );

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
  }, []);

  const { data, error } = trpc.useQuery([
    "arbitrators.get-single-case",
    { caseId: caseId?.toString() },
  ]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    mutate({
      name,
      username,
      password,
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

  const handleAwardUpload = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setAward(readerEvent?.target?.result);
    };
  };

  return (
    <MainLayout
      sidebarData={sidebarData}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
      headerTitle={headerTitle}>
      <div>
        <h1>Single Case</h1>
        <h1>Add Your Client</h1>
        <input
          type="text"
          value={name}
          placeholder="Client Name"
          className={CustomInputStyle}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={username}
          placeholder="Client Username"
          className={CustomInputStyle}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Client Password"
          className={CustomInputStyle}
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
      </div>
    </MainLayout>
  );
};

export default SingleCase;
