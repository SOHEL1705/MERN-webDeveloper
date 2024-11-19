import { useAuth } from "../../store/Auth";

export const AdminHome = () => {
  const { userInfoData } = useAuth();

  console.log(userInfoData);

  const is = userInfoData.isAdmin ? "Admin" : "User";
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-row space-x-3 text-white text-center">
          <div className="">
            <h1>{userInfoData.username}</h1>
            <h1>{userInfoData.email}</h1>
            <h1>{userInfoData.phone}</h1>
            {/* {userInfoData.isAdmin:"u":"sdsd"} */}
            <div
              className={
                userInfoData.isAdmin
                  ? "badge badge-secondary mx-4 badge-xs"
                  : "badge badge-error mx-4 badge-xs"
              }
            >
              <h1>{is}</h1>
            </div>
              <div>
                <button className="btn btn-primary">Get Started</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
