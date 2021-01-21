class DoubleLinkedListNode {
  constructor({ data, prev, next }) {
    this.data = data
    this.prev = prev
    this.next = next
  }
}

export default class DoubleLinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  add(data) {
    this.size += 1
    const node = new DoubleLinkedListNode({ data })
    if (!this.head) {
      this.head = node
      this.head.prev = this.head.next = node
      return node
    }
    const { prev } = this.head
    this.head.prev = node
    node.next = this.head
    prev.next = node
    node.prev = prev
    return node
  }

  remove(node) {
    if (!this.size) return
    if (this.size === 1) {
      this.size -= 1
      this.head = null
      return
    }
    this.size -= 1
    if (this.head === node) {
      const { prev, next } = this.head
      prev.next = next
      next.prev = prev
      this.head = next
      return
    }
    const { prev, next } = node
    prev.next = next
    next.prev = prev
  }

  swap(n1, n2) {
    if (n1 === n2) return
    if (n1.prev === n2) this.move(n2, n1.next)
    else if (n1.next === n2) this.move(n1, n2.next)
    else {
      const { next } = n1
      this.move(n1, n2.next)
      this.move(n2, next)
    }
  }

  // 移动到ref前面
  move(node, ref) {
    node.prev.next = node.next
    node.next.prev = node.prev
    const { prev } = ref
    node.next = ref
    ref.prev = node
    node.prev = prev
    prev.next = node
  }

  toArray() {
    const list = []
    if (!this.size) return list
    let node = this.head
    do {
      list.push(node.data)
      node = node.next
    } while (node !== this.head)
    return list
  }
}
