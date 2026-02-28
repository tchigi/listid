export interface Item {
    id: number
}

export interface Store {
    allItems: Item[]
    selectedIds: number[]
}

const store: Store = {
    allItems: Array.from({ length: 1000000 }, (_, i) => ({ id: i + 1 })),
    selectedIds: [],
}

export default store