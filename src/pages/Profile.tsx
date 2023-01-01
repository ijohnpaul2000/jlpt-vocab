import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import db, { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

type Props = {};

interface TestData {
  accuracy: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  level: number;
  email: string;
  previousTestScore: number;
  createdAt?: Date;
}

interface TestNavigation {
  link: string;
  title: string;
}

const Profile = (props: Props) => {
  const [previousData, setpreviousData] = useState<TestData>({
    accuracy: "",
    date: {
      seconds: 0,
      nanoseconds: 0,
    },
    level: 0,
    email: "",
    previousTestScore: 0,
    createdAt: undefined,
  });

  const navigate = useNavigate();

  const testsNavigation: TestNavigation[] = [
    {
      link: "/tests/level/1",
      title: "N1",
    },
    {
      link: "/tests/level/2",
      title: "N2",
    },
    {
      link: "/tests/level/3",
      title: "N3",
    },
    {
      link: "/tests/level/4",
      title: "N4",
    },
    {
      link: "/tests/level/5",
      title: "N5",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const _query = query(
        collection(db, "tests"),
        orderBy("createdAt", "desc"),
        where("email", "==", auth.currentUser?.email),
        limit(1)
      );

      const querySnapshot = await getDocs(_query);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setpreviousData(data as TestData);
      });
    };
    fetchData();
  }, [auth.currentUser?.email]);

  function renderMessage(
    currentUser: string | undefined | null,
    accuracy: string
  ) {
    let judgment = "";
    if (accuracy === Number(100).toString()) {
      judgment = "perfect";
      return (
        <h1 className="text-center">
          Hello{" "}
          <span className="text-[#E23B43] font-bold text-md underline underline-offset-[3px]">
            {" "}
            {currentUser}!
          </span>{" "}
          You did a <span className="text-green-400">{judgment}</span> on your
          previous test with an accuracy of{" "}
          <span className="text-green-400">{accuracy}</span>. Keep it up!
        </h1>
      );
    } else if (accuracy >= Number(80).toString()) {
      judgment = "good";
      return (
        <h1 className="text-center">
          Hello{" "}
          <span className="text-[#E23B43] font-bold text-md underline underline-offset-[3px]">
            {" "}
            {currentUser}!
          </span>{" "}
          You did a <span className="text-yellow-400">{judgment}</span> on your
          previous test with an accuracy of{" "}
          <span className="text-yellow-400">{accuracy}</span>. Keep it up!
        </h1>
      );
    } else if (accuracy <= Number(80).toString()) {
      judgment = "bad";
      return (
        <h1 className="text-center">
          Hello{" "}
          <span className="text-[#E23B43] font-bold text-md underline underline-offset-[3px]">
            {" "}
            {currentUser}!
          </span>{" "}
          You did a{" "}
          <span className="text-red-400">{judgment.toUpperCase()}</span> on your
          previous test with an accuracy of{" "}
          <span className="text-red-400">{accuracy}</span>. Try again!
        </h1>
      );
    }
  }

  return (
    <>
      <div className="mx-4 my-10">
        <div className="flex justify-center">
          <h1 className="bg-red-600 px-10 py-2 rounded-md">
            Previous Test Data
          </h1>
        </div>
        <div className="relative flex justify-center bg-[#092031] text-black px-4 my-20 rounded-lg max-w-[1000px] mx-auto">
          <img
            src={auth.currentUser?.photoURL as string}
            alt=""
            className="absolute -top-10 rounded-full max-w-20 min-h-20 border-4 border-[#E23B43] "
          />
          <div className="my-10  py-7 text-white">
            <p className="text-center mb-4 mt-2">{auth.currentUser?.email}</p>
            {renderMessage(
              auth.currentUser?.displayName,
              previousData.accuracy
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 my-6">
              <div className="grid grid-cols-1 md:grid-cols-[auto,auto] p-2 m-2 bg-[#E23B43] rounded-lg">
                <h1 className="text-lg font-semibold">Date: </h1>
                <h1 className="text-right">
                  {new Date(
                    previousData.date.seconds * 1000
                  ).toLocaleDateString()}
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[auto,auto] p-2 m-2 bg-[#E23B43] rounded-lg">
                <h1 className="text-lg font-semibold">Accuracy: </h1>
                <h1 className="text-right">{previousData.accuracy}</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[auto,auto] p-2 m-2 bg-[#E23B43] rounded-lg">
                <h1 className="text-lg font-semibold">Level: </h1>
                <h1 className="text-right">{previousData.level}</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[auto,auto] p-2 m-2 bg-[#E23B43] rounded-lg">
                <h1 className="text-lg font-semibold">Previous Score: </h1>
                <h1 className="text-right">{previousData.previousTestScore}</h1>
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-2xl">Test My Skills!</h1>
              <p>Select the level of vocabulary you want to test.</p>
              <hr className="my-2" />
              <ul className="flex justify-center">
                {testsNavigation.map((item) => (
                  <li key={item.link} onClick={() => navigate(item.link)}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;