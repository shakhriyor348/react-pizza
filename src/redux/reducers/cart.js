const initialState = {
    items: {},
    totalPrice: 0,
    itemsCount: 0
}

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0)

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.')
    return keys.reduce((sum, key) => {
        return sum[key]
    }, obj[firstKey])
}

const totalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path)
        return sum + value
    }, 0)
}


const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZA_CART': {
            const currentPizzaItems = !state.items[action.payload.id] ? [action.payload] :
                [...state.items[action.payload.id].items, action.payload]

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }

            };

            const totalCount = totalSum(newItems, 'items.length')
            const totalPrice = totalSum(newItems, 'totalPrice')



            return {
                ...state,
                items: newItems,
                itemsCount: totalCount,
                totalPrice
            }
        }
        case 'CLEAR_CART':
            return {
                items: {},
                totalPrice: 0,
                itemsCount: 0
            }
        case 'REMOVE_CART_ITEM':
            const newItems = {
                ...state.items
            }
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                itemsCount: state.itemsCount - state.items[action.payload].items.length,
                totalPrice: state.totalPrice - state.items[action.payload].totalPrice
            }

        default:
            return state
    }

}

export default cart