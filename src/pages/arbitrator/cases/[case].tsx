import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import MainLayout from "../../../components/layout";
import { CustomInputStyle } from "../../../components/login/Input";

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
  const [addCaseID, setCaseId] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("123456");
  const [award, setAward] = useState(0);
  const [awardUploadString, setAwardUploadString] = useState("");
  const [awardFileUrl, setAwardFileUrl] = useState("");
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

  const router = useRouter();
  const { case: caseId } = router.query;

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function generateString(length:number) {
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

  //Handle form submit
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

  const handleAwardUpload = (e: any) => {
    if (e.target.files[0]) {
      setAward(e.target.files[0]);
    }
  };

  const awardUpload = async (e: any) => {
    e.preventDefault();

    const uploadProfileImageTask = storage
      .ref(`profile-images/${awardUploadString}`)
      .put(award);

   await uploadProfileImageTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProfileImageUploadProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("profile-images")
          .child(awardUploadString)
          .getDownloadURL()
          .then((url) => {
            setAwardFileUrl(url);
          });
      }
    ).then(()=>{
      
    });
  };
  console.log(data);
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

        <input type="file" name="" id="" onChange={handleAwardUpload} />
        <button onClick={awardUpload}>Upload Award</button>
      </div>
    </MainLayout>
  );
};

export default SingleCase;
