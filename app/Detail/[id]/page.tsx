/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import axios from "axios";
import { detailTypes } from "@/types/types";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

const Home = ({ params }: Props) => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokeDetail, setPokeDetail] = useState<detailTypes[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url).then((res) => {
          return res.data;
        });
        const nextUrl = res.next;
        console.log(res);
        const promise = res.results.filter((item: any) => {
          return item.name === params.id;
        });

        const fetchDataForItem = async (item: any) => {
          try {
            const response = await axios.get(item.url);
            return response.data;
          } catch (error) {
            console.log(error);
            return null;
          }
        };

        const result = await Promise.all(promise.map(fetchDataForItem)).then(
          (data) => {
            return data;
          }
        );

        if (promise.length === 0 && nextUrl) {
          setUrl(nextUrl);
        } else {
          const formattedData = result.map((res: any) => ({
            id: res.id,
            name: res.name,
            image: res.sprites.other.dream_world.front_default,
            experience: res.base_experience,
            weight: res.weight,
            moves: {
              move1: res.moves[0].move.name,
              move2: res.moves[1].move.name,
              move3: res.moves[2].move.name,
              move4: res.moves[3].move.name,
            },
            forms: {
              form1: res.sprites.other.home.front_default,
              form2: res.sprites.other.home.front_female,
              form3: res.sprites.other.home.front_shiny,
              form4: res.sprites.other.home.front_shiny_female,
            },
          }));
          setPokeDetail(formattedData);
          console.log(result);
          console.log(formattedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url, params.id]);

  return (
    <>
      <div className="bg-warning">
        {pokeDetail?.map((res) => {
          return (
            <>
              <div className="container-fluid py-5 h-100">
                <div className=" row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-md-8">
                    <div className="card text-center text-bg-danger shadow-lg p-3 mb-5 rounded border-0">
                      <h1>{res.name} Details </h1>

                      <div className="card-body">
                        <h5 className="card-title">Name: {res.name}</h5>
                        <img
                          src={res.image}
                          alt="normal name"
                          style={{ width: "8rem" }}
                        />
                        <div className="card border-0 text-bg-danger">
                          <h4>Moves</h4>
                          <div className="d-flex justify-content-center">
                            <ol>{res.moves.move1}</ol>
                            <ol>{res.moves.move2}</ol>
                            <ol>{res.moves.move3}</ol>
                            <ol>{res.moves.move4}</ol>
                          </div>
                        </div>
                        <div className="card border-0 text-bg-danger">
                          <h4>Weight: {res.weight}</h4>
                        </div>
                        <div className="card border-0 text-bg-danger">
                          <h2 className="card-title">All forms</h2>
                          <div className="d-flex row justify-content-center">
                            {res.forms.form1 ? (
                              <>
                                <div className="card-body col-md-3">
                                  <span>
                                    <img
                                      src={res.forms?.form1}
                                      alt="normal name"
                                      style={{ width: "8rem" }}
                                    />
                                  </span>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {res.forms.form2 ? (
                              <>
                                <div className="card-body col-md-3">
                                  <span>
                                    <img
                                      src={res.forms?.form2}
                                      alt="normal name"
                                      style={{ width: "8rem" }}
                                    />
                                  </span>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {res.forms.form3 ? (
                              <>
                                <div className="card-body col-md-3">
                                  <span>
                                    <img
                                      src={res.forms?.form3}
                                      alt="normal name"
                                      style={{ width: "8rem" }}
                                    />
                                  </span>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {res.forms.form4 ? (
                              <>
                                <div className="card-body col-md-3">
                                  <span>
                                    <img
                                      src={res.forms?.form4}
                                      alt="normal name"
                                      style={{ width: "8rem" }}
                                    />
                                  </span>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
