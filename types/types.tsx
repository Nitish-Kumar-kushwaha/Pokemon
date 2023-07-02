export type pokemonType = {
  id: number;
  name: string;
  image: string;
};

export type detailTypes = {
  id: number;
  name: string;
  image: string;
  experience: string;
  weight: string;
  moves: {
    move1: string;
    move2: string;
    move3: string;
    move4: string;
  };
  forms: {
    form1: string;
    form2: string;
    form3: string;
    form4: string;
  };
};
