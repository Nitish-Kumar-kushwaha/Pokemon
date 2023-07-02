/* eslint-disable @next/next/no-img-element */
"use client";
import Landing from "@/Components/Landing";
const Home = () => {
  return (
    <>
      <div className="container-fluid bg-warning">
        <div className="text-center">
          <img
            src="images/pokemon.svg"
            alt="image"
            style={{ width: "35rem" }}
          />
        </div>
        <Landing />
      </div>
    </>
  );
};

export default Home;
