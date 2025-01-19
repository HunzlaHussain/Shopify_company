import StatsCards from "./_components/stats-cards";
import ActiveUsers from "./_components/active-users";

const page = async () => {
  return (
    <>
      <StatsCards />
      <ActiveUsers />
      {/* <Customers /> */}
    </>
  );
};

export default page;
