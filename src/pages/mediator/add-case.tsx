import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { Input } from "../../components/login/Input";
import { MediatorSidebarData } from ".";
import MainLayout from "../../components/layout";
import Modal from "../../components/modal";
import { useState } from "react";
import { Button } from "../../components/login/Button";

const headerTitle = "Mediator";

export default function AddCase() {
  const { register, handleSubmit } = useForm();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { mutate } = trpc.useMutation(
    ["mediators.create-mediation-case"],
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (result) => {
        window.location.href = `/mediator/cases/${result.id}`;
      },
    }
  );
  const { data } = trpc.useQuery(["mediators.verify-mediator"]);

  async function onSubmit(data: any) {
    mutate(data);
  }

  return (
    <>
      {data ? "" : <Modal name="Mediator" data={data} />}

      <MainLayout
        logout="mediatorToken"
        sidebarData={MediatorSidebarData}
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
