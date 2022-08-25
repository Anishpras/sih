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
  const [mut, setMute] = useState({});
  const { register, handleSubmit } = useForm();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [caseCrated, setCaseCrated] = useState<boolean>(false);
  const { mutate, error } = trpc.useMutation(["arbitrators.create-case"], {
    onSuccess: (result) => {
      // setCaseCrated(true);
      // setMute(result);
      // console.log(result.id);
      window.location.href = `/arbitrator/cases/${result.id}`;
    },
  });
  const { data } = trpc.useQuery(["arbitrators.verify-arbitrator"]);

  async function onSubmit(data: any) {
    mutate(data);
  }
  console.log(mut);
  return (
    <>
      {data ? "" : <Modal name="Arbitrator" data={data} />}
      {/* {caseCrated ? <NotificationComponent /> : ""} */}
      <MainLayout
        logout="arbitratorToken"
        sidebarData={ArbitratorSidebarData}
        setToggleSidebar={setToggleSidebar}
        toggleSidebar={toggleSidebar}
        headerTitle={headerTitle}
      >
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
