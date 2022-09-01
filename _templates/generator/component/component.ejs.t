---
to: components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
import React from 'react'
import { <%= h.changeCase.pascal(name) %>Root } from './<%= h.changeCase.pascal(name) %>.styles'

type <%= h.changeCase.pascal(name) %>Props = {}

export const <%= h.changeCase.pascal(name) %> = (_props: <%= h.changeCase.pascal(name) %>Props) => {
  return (
    <<%= h.changeCase.pascal(name) %>Root>
      <h1><%= h.changeCase.pascal(name) %></h1>
      <p>This is the <%= h.changeCase.pascal(name) %> component!</p>
    </<%= h.changeCase.pascal(name) %>Root>
  )
}