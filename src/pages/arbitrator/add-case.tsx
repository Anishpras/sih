import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { CustomInputStyle, Input } from "../../components/login/Input";
import { ArbitratorSidebarData } from ".";
import MainLayout from "../../components/layout";
import Modal from "../../components/modal";
import { useState } from "react";
import { Button } from "../../components/login/Button";
import { formContainer } from "../../styles/custonStyle";
import { Notification } from "@mantine/core";
import { useRouter } from "next/router";
import { useArbitratorContext } from "../../context/arbitrator.context";
import { Loader } from "../../components/loader/Loader";
const headerTitle = "Arbitrator";
const NotificationComponent = () => {
  return (
    <div className="fixed top-0 right-0 z-50 max-w-full">
      <Notification title="Default notification" disallowClose>
        This is default notification with title and body
      </Notification>
    </div>
  );
};
export default function AddCase() {
  const { register, handleSubmit } = useForm();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { mutate } = trpc.useMutation(["arbitrators.create-case"], {
    onSuccess: (result) => {
      window.location.href = `/arbitrator/cases/${result.id}`;
    },
  });
  const { data } = trpc.useQuery(["arbitrators.verify-arbitrator"]);

  async function onSubmit(data: any) {
    mutate(data);
  }
  const router = useRouter();
  const arbitratorData = useArbitratorContext();
  if (!arbitratorData) {
    router.push("/arbitrator/login");
    return <Loader />;
  }
  return (
    <>
      {data ? "" : <Modal name="Arbitrator" data={data} />}

      <MainLayout
        logout="arbitratorToken"
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={formContainer}>
            <Input
              type="text"
              register={register}
              placeholder="Enter the Case Name"
              registerName={"caseName"}
            />{" "}
            <textarea
              className={CustomInputStyle}
              {...register("description")}
              placeholder="Enter the Description"
            />
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
