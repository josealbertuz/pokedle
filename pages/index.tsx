import type { GetStaticProps } from 'next'
import { DAY_SECONDS } from '../constants/pokemon';
import { generatePokemonId } from '../utils/utils';

export const getStaticProps: GetStaticProps = async () => {

  const pokemonId = generatePokemonId()

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

  const data = await response.json()

  return {
    props: {
      pokemonName: data.name
    },
    revalidate: DAY_SECONDS
  }
}

type HomePageProps = {
  pokemonName: string
}

const Home = ({pokemonName}: HomePageProps) => {
  return (
    <div>
     {pokemonName}
    </div>
  )
}

export default Home
