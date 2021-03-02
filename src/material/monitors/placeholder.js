import { props } from '@/utils'
import { Text } from '@/material/constructors'

export function placeholder(keys, attr) {
  const text = this.children.find(item => item instanceof Text)
  text.on('richText', ({ text }) => {
    const target = props(keys, this)
    target[attr] = text
  })
}
