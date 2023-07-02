"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { pokemonType } from "@/types/types";

const Landing = () => {
  const [pokeData, setPokeData] = useState<pokemonType[]>([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [filterData, setFilterData] = useState<pokemonType[]>([]);
  const [search, setSearch] = useState<string>("");
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

  useEffect(() => {
    const res: pokemonType[] = filterSearch(pokeData);
    setFilterData(res);
  }, [search, pokeData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterSearch = (val: pokemonType[]) => {
    return val.filter((res) => {
      if (res.name.includes(search)) {
        return res;
      }
    });
  };

  const renderPokemon = (val: pokemonType) => (
    <Card pokemonId={val.id} image={val.image} name={val.name} />
  );

  return (
    <>
      <div className="container d-flex justify-content-center mt-4">
        <div className="form-floating  mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter Pokemon name to search"
            style={{ width: "35rem" }}
            onChange={handleSearch}
          />
          <label>Enter Pokemon Name to Search</label>
        </div>
      </div>
      <div className=" container row mx-2 my-2">
        {filterData.length == 0
          ? pokeData.map(renderPokemon)
          : filterData.map(renderPokemon)}
      </div>
      <div className="d-flex text-center justify-content-center">
        {prevUrl ? (
          <a
            className="btn btn-md btn-primary mx-4 my-4"
            onClick={() => {
              setUrl(prevUrl);
            }}
          >
            <h2>{`<< Prev`}</h2>
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
            <h2>{`Next >>`} </h2>
          </a>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default Landing;
