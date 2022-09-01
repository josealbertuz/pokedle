---
to: components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.styles.ts
---
import { styled } from "../../stitches.config";

export const <%= h.changeCase.pascal(name) %>Root = styled('div', {})