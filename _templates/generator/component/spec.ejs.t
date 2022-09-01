---
to: components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.spec.tsx
---
import React from 'react'
import { render, screen } from '@testing-library/react'
import { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>'

describe('<%= h.changeCase.pascal(name) %>', () => {
  it('should displays the default message', () => {
    render(<<%= h.changeCase.pascal(name) %> />)

    expect(screen.getByText('This is the <%= h.changeCase.pascal(name) %> component!')).toBeInTheDocument()
  })
})