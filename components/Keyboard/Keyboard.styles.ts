import { styled } from "../../stitches.config";

export const KeyboardRoot = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '.5em',
    padding: '1em'
})

export const KeysRow = styled('div', {
    display: 'flex',
    gap: '.5em'
})

export const Key = styled('button', {
    flex: 1,
    minHeight: '55px',
    backgroundColor: '$background',
    borderRadius: '5px',
    border: 'none',
    fontWeight: 'bold',
    '&:hover': {
        opacity: 0.6
    }
})