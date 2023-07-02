"use client";

import { useEffect, useState } from "react";
import { pokemon } from "../services/services";
import axios from "axios";
import Card from "./Card";
import { pokemonType } from "@/types/types";
import Link from "next/link";
import Detail from "../app/Detail/[id]/Detail";

const Landing = () => {
  const [pokeData, setPokeData] = useState<pokemonType[]>([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState<string | null | undefined>();
  const [prevUrl, setPrevUrl] = useState<string | null | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url).then((res) => {
          return res.data;
        });
        const promises = res.results.map(async (item: any) => {
          const response = await axios.get(item.url);
          return response.data;
        });
        const results = await Promise.all(promises);
        const formattedData = results.map((res: any) => ({
          id: res.id,
          name: res.name,
          image: res.sprites.other.dream_world.front_default,
        }));
        const sortedData = formattedData.sort((a, b) => a.id - b.id);
        setPokeData(sortedData);
        setNextUrl(res.next);
        setPrevUrl(res.previous);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [url]);

  console.log(pokeData);

  const renderPokemon = (val: pokemonType) => (
    <Card pokemonId={val.id} image={val.image} name={val.name} />
  );

  return (
    <>
      <div className=" container-fluid row mx-2 my-2">
        {pokeData.map(renderPokemon)}
      </div>
      <div className="d-flex text-center justify-content-center">
        {prevUrl ? (
          <a
            className="btn btn-md btn-primary mx-4 my-4"
            onClick={() => {
              setUrl(prevUrl);
            }}
          >
            <h2>Prev</h2>
          </a>
        ) : (
          " "
        )}
        {nextUrl ? (
          <a
            className="btn btn-md btn-primary mx-4 my-4"
            onClick={() => {
              setUrl(nextUrl);
            }}
          >
            <h2>Next</h2>
          </a>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default Landing;
