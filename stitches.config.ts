import { createStitches, globalCss } from '@stitches/react'
import { relative } from 'path'

export const { styled } = createStitches({
  theme: {
    colors: {
      absent: "#787c7e",
      present: "#c9b458",
      error: "#bb3429",
      correct: "#6aaa64",
      background: "#d3d6da",
    },
  },
  media: {
    bp1: "(min-width: 520px)",
    bp2: "(min-width: 900px)",
    bp3: "(min-width: 1200px)",
    bp4: "(min-width: 1800px)",
    motion: "(prefers-reduced-motion)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
});

export const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box'
    },

    '#portal': {
        position: 'relative',
        zIndex: 999,
    },

    body: {
        margin: 0
    }
})