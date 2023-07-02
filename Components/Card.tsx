/* eslint-disable @next/next/no-img-element */
"use-client";
import Link from "next/link";
//@ts-check
import { pokemon } from "../services/services";
type cardType = {
  pokemonId: number;
  image: string;
  name: string;
};

const Card = ({ pokemonId, image, name }: cardType) => {
  return (
    <div
      className="card text-bg-danger mb-3 col-md-2 mx-4 my-4 shadow-lg p-3 mb-5 rounded border-0 "
      key={pokemonId}
      style={{}}
    >
      <Link
        href={`/Detail/${name}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <img src={image} alt="pokemon-image" className="card-img-top" />
        <div className="card-body">
          <h4 className="card-title">
            {pokemonId}. {name}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default Card;
