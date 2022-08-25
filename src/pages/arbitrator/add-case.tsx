import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { Input } from "../../components/login/Input";
import { ArbitratorSidebarData } from ".";
import MainLayout from "../../components/layout";
import Modal from "../../components/modal";
import { useState } from "react";
import { Button } from "../../components/login/Button";

const headerTitle = "Arbitrator";

export default function AddCase() {
  const { register, handleSubmit } = useForm();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { mutate, error } = trpc.useMutation(["arbitrators.create-case"]);
  const { data } = trpc.useQuery(["arbitrators.verify-arbitrator"]);

  async function onSubmit(data: any) {
    console.log(data);
    mutate(data);
  }

  return (
    <>
      {data ? "" : <Modal name="Arbitrator" data={data} />}

      <MainLayout
        logout="arbitratorToken"
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              register={register}
              placeholder="Enter the Case Name"
              registerName={"caseName"}
            />{" "}
            <Input
              type="text"
              register={register}
              placeholder="Enter the Description"
              registerName={"description"}
            />{" "}
            <Input
              type="text"
              register={register}
              placeholder="Enter the Case ID"
              registerName={"caseId"}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </MainLayout>
    </>
  );
}
