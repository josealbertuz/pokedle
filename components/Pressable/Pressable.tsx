import React, { ComponentProps, PropsWithChildren } from 'react'
import { PressableRoot } from './Pressable.styles'

type PressableProps = PropsWithChildren<ComponentProps<typeof PressableRoot>>

export const Pressable = ({children, ...props}: PressableProps) => {
  return (
    <PressableRoot {...props}>
        {children}
    </PressableRoot>
  )
}
