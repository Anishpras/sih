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

  console.log(data);
  return (
    <MainLayout
      sidebarData={sidebarData}
      setToggleSidebar={setToggleSidebar}
      toggleSidebar={toggleSidebar}
      headerTitle={headerTitle}
    >
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

        <h1>Add </h1>
      </div>
    </MainLayout>
  );
};

export default SingleCase;
