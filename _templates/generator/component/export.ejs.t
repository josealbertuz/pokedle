---
to: components/<%= h.changeCase.camel(name) %>/index.ts
---
export { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>'