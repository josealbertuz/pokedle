import { keyframes, styled } from "@stitches/react";
import { LetterStatus } from '../../models/pokedle';

export const LetterRoot = styled("div", {
  flex: "1",
  height: "66px",
  color: 'white'
});

export const flipAnimation = keyframes({
  from: {transform: 'rotateX(0turn)'},
  to: {transform: 'rotateX(0.5turn)'}
})

export const LetterCard = styled('div', {
  position: 'relative',
  backfaceVisibility: 'hidden',
  height: '100%',
  backgroundColor: '$background',
})

const LetterSide = styled('div', {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid black",
  height: '100%',
  width: '100%',
  fontWeight: "bold",
  backgroundColor: '$background',
})

export const LetterFront = styled(LetterSide, {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
})

export const LetterBack = styled(LetterSide, {
  transform: 'rotate(0.5turn) rotateY(0.5turn)',

  variants: {
    status: {
      [LetterStatus.CORRECT]: {
        backgroundColor: "$correct",
      },
      [LetterStatus.NOT_PRESENT]: {
        backgroundColor: '$absent'
      },
      [LetterStatus.PRESENT]: {
        backgroundColor: '$present'
      },
      [LetterStatus.NOT_CHECKED]: {
        
      }
    },
  },
})
