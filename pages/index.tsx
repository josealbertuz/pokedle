import type { GetStaticProps } from "next";
import { DAY_SECONDS } from "../constants/time";
import { PokemonRepository } from "../repository/pokemon";
import { Pokedle } from "../screens/Pokedle";

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      answer: "PIKACHU",
      pokemonNames: ['PIKACHU']
    },
    revalidate: DAY_SECONDS,
  };
};

type HomePageProps = {
  answer: string;
  pokemonNames: string[];
};

const Home = ({ answer, pokemonNames }: HomePageProps) => (
  <Pokedle answer={answer} pokemonNames={pokemonNames} />
);

export default Home;
