import axios from "axios"

export const setLoaded = (val) => {
    return {
        type: "SET_LOADED",
        payload: val
    }
}

export const fetchPizzas = (sortBy, category, order) => (dispatch) => {
    dispatch(setLoaded(false)) 
    axios.get(`/pizzas?${category !== null  ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${order}`).then(({ data }) => {
        dispatch(setPizzas(data))
      })
}


export const setPizzas = (items) => ({
    type: "SET_PIZZAS",
    payload: items
})