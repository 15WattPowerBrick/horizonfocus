import CreateOrganisation from "./_components/CreateOrganisation";

const Page = async () => {
  return (
    <div className="flex min-h-svh flex-col items-start justify-start gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateOrganisation />
      </div>
    </div>
  );
};

export default Page;
