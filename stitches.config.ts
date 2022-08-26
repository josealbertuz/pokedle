import { createStitches, globalCss } from '@stitches/react'

export const { styled } = createStitches({
  theme: {
    colors: {
      absent: "#787c7e",
      present: "#c9b458",
      error: "#bb3429",
      correct: "#6aaa64",
      background: "#d3d6da",
      buttonHover: "#EFF6EF",
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
  utils: {
    px: (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    mx: (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),
    size: (value: any) => ({
      width: value,
      height: value
    })
  },
});

export const globalStyles = globalCss({
    ':root': {
      '--max-game-width': '500px'
    },

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