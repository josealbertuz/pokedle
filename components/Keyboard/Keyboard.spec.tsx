import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Keyboard } from './Keyboard';

const onKeyPress = jest.fn()

describe('Keyboard', () => {
    it('should call onKeyPress with key value', () => {
        render(<Keyboard onKeyPress={onKeyPress} />)

        fireEvent.click(screen.getByText('Q'))

        expect(onKeyPress).toHaveBeenCalledWith('Q')
    })
})