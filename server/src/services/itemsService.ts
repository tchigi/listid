import store from '../store/itemsStore'

// получить элементы левого окна (все кроме выбранных) с пагинацией и поиском
export const getItems = (page: number, limit: number, search: string = '') => {
    const selectedSet = new Set(store.selectedIds)
    let items = store.allItems.filter((item) => !selectedSet.has(item.id))

    if (search) {
        items = items.filter((item) => item.id.toString().includes(search))
    }

    const total = items.length
    const offset = (page - 1) * limit
    const data = items.slice(offset, offset + limit)

    return { data, total }
}

// получить выбранные элементы с пагинацией и поиском
export const getSelectedItems = (page: number, limit: number, search: string = '') => {
    let items = store.selectedIds

    if (search) {
        items = items.filter((id) => id.toString().includes(search))
    }

    const total = items.length
    const offset = (page - 1) * limit
    const data = items.slice(offset, offset + limit)

    return { data, total }
}

// добавить новые элементы
export const addItems = (ids: number[]) => {
    const existingIds = new Set(store.allItems.map((item) => item.id))

    for (const id of ids) {
        if (!existingIds.has(id)) {
            store.allItems.push({ id })
            existingIds.add(id)
        }
    }
}

// выбрать/снять выбор
export const selectItems = (ids: number[], action: 'select' | 'unselect') => {
    if (action === 'select') {
        const selectedSet = new Set(store.selectedIds)
        for (const id of ids) {
            if (!selectedSet.has(id)) {
                store.selectedIds.push(id)
                selectedSet.add(id)
            }
        }
    } else {
        const removeSet = new Set(ids)
        store.selectedIds = store.selectedIds.filter((id) => !removeSet.has(id))
    }
}

// обновить порядок (DnD) — принимает полный новый порядок selectedIds
export const updateOrder = (ids: number[]) => {
    const selectedSet = new Set(store.selectedIds)
    if (ids.length !== store.selectedIds.length || ids.some((id) => !selectedSet.has(id))) return

    store.selectedIds = ids
}