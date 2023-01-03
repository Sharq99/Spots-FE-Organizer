import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import { IoIosFiling, IoIosStats } from "react-icons/io";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

function Dashborad() {
  let totalUsers = 0;
  let totalRevenue = 0;
  let totalFreeUsers = 0;
  let totalPaidUsers = 0;
  const orgainizerSpots = spotStore?.spots?.filter(
    (spot) => spot?.organizer == authStore?.organizer.id
  );
  const freeSpots = orgainizerSpots?.filter((spot) => spot?.isFree === true);
  const paidSpots = orgainizerSpots?.filter((spot) => spot?.isFree === false);
  const paidSpotsNames = paidSpots?.map((spot) => spot?.name);
  const revenuePerSpot = paidSpots?.map(
    (spot) => spot?.users.length * spot?.price
  );
  const usersPerSpot = orgainizerSpots?.map((spot) => spot?.users.length);
  const spotsNames = orgainizerSpots?.map((spot) => spot?.name);
  const spotsScannedUsers = orgainizerSpots?.map((spot) => spot?.scanned);
  orgainizerSpots?.forEach((spot) => {
    return (totalUsers = totalUsers + spot?.users?.length);
  });
  orgainizerSpots?.forEach((spot) => {
    return (totalRevenue = totalRevenue + spot?.spotRevenue);
  });
  freeSpots?.forEach((spot) => {
    return (totalFreeUsers = totalFreeUsers + spot?.users?.length);
  });
  orgainizerSpots?.forEach((spot) => {
    return (totalPaidUsers = totalPaidUsers + spot?.users?.length);
  });

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );

  const dataDoughnut = {
    labels: ["Free Spots", "Paid Spots"],
    datasets: [
      {
        label: "#Spots",
        data: [freeSpots.length, paidSpots.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataDoughnutAllUsers = {
    labels: ["Free Users", "Paid Users"],
    datasets: [
      {
        label: "#Users",
        data: [totalFreeUsers, totalPaidUsers],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const optionsRev = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Spots Total Revenue",
      },
    },
  };

  const optionsUser = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Spots Total Users",
      },
    },
  };

  const revenueLabels = paidSpotsNames;
  const userLabels = spotsNames;

  const dataBarRev = {
    labels: revenueLabels,
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
        data: revenuePerSpot,
      },
    ],
  };

  const dataBarUser = {
    labels: userLabels,
    datasets: [
      {
        label: "Total Number of Users",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        data: usersPerSpot,
      },
      {
        label: "Actual Number of Users",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
        data: spotsScannedUsers,
      },
    ],
  };

  return (
    <div>
      <div className="center">
        <h1 className="dash">Dashboard</h1>
      </div>
      <div className="whitebackgrounddash">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="dashcard">
            <IoIosFiling
              className="dashicon"
              name="stats-chart-outline"
            ></IoIosFiling>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 className="cardnum">{orgainizerSpots?.length}</h1>
              <h6 className="cardtitle">Total Spots created</h6>
            </div>
          </div>
          <div className="dashcard">
            <IoIosStats
              className="dashicon"
              name="stats-chart-outline"
            ></IoIosStats>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 className="cardnum">{totalRevenue + " KD"}</h1>
              <h6 className="cardtitle">Total Revenue</h6>
            </div>
          </div>

          <div className="dashcardDough">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                height: "90%",
                padding: 20,
              }}
            >
              <Doughnut
                style={{
                  width: "90%",
                  height: "90%",
                  marginBottom: 10,
                }}
                data={dataDoughnut}
              />
              <h6 className="cardtitle">Total Spots created</h6>
            </div>
          </div>
          <div className="dashcardDough">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                height: "90%",
                padding: 20,
              }}
            >
              <Doughnut
                style={{ width: "90%", height: "90%", marginBottom: 10 }}
                data={dataDoughnutAllUsers}
              />
              <h6 className="cardtitle">Total users</h6>
            </div>
          </div>

          <div className="dashcardBar">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Bar
                style={{ width: "90%", height: "100%", marginBottom: 10 }}
                options={optionsRev}
                data={dataBarRev}
              />
            </div>
          </div>
          <div className="dashcardBar">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Bar
                style={{
                  width: "100%",
                  height: "100%",
                  marginBottom: 10,
                }}
                options={optionsUser}
                data={dataBarUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashborad;

{
  /* <div>
      <div className="center">
        <h1 className="dash">Dashboard</h1>
      </div>
      <div className="whitebackgrounddash">
        
        <div className="dashcard">
          <IoMdStar className="dashicon" name="stats-chart-outline"></IoMdStar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{totalUsers}</h1>
            <h6 className="cardtitle">Users Spotted Me</h6>
          </div>
        </div>
        
        <div className="dashcard">
          <IoIosPin className="dashicon" name="stats-chart-outline"></IoIosPin>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{freeSpots?.length}</h1>
            <h6 className="cardtitle">Total free spots</h6>
          </div>
        </div>
        <div className="dashcard">
          <IoIosCash
            className="dashicon"
            name="stats-chart-outline"
          ></IoIosCash>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{paidSpots?.length}</h1>
            <h6 className="cardtitle">Total Paid spots</h6>
          </div>
        </div>
      </div>
    </div> */
}
