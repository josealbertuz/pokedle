import { styled } from "../../stitches.config";

export const PokedleRoot = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '500px',
  height: '100vh'
});

export const LettersContainer = styled('div', {
    flex: 1,
    padding: '1.5em'
})

export const LettersGrid = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '.5em'
})

export const LettersRow = styled('div', {
    display: 'flex',
    gap: '.5em',
    flex: 1
})


