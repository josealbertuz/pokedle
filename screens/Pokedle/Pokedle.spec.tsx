import React from 'react'
import { render, screen } from '@testing-library/react'
import { Pokedle } from './Pokedle'

describe('Pokedle', () => {
    it('should show the pokemon name', () => {
        render(<Pokedle pokemonName="pikachu" />)

        expect(screen.getByText('pikachu')).toBeInTheDocument()
    })
})