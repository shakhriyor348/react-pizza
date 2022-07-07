import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Categories, PizzaBlock, SortPopUp, PizzaLoadingBlock } from '../components'

import { setCategory, setSortBy } from '../redux/actions/filters'
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const sortItems = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' }
]

const Home = () => {
    const items = useSelector(({ pizzas }) => pizzas.items)
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded)
    const cartItems = useSelector(({ cart }) => cart.items)
    const {category, sortBy} = useSelector(({ filters }) => filters)
 

    const dispatch = useDispatch()

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index))
        // eslint-disable-next-line
    }, [])

    const onSelectSortType = useCallback((type) => {
        dispatch(setSortBy(type))
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category, sortBy.order))
        // eslint-disable-next-line
    }, [category, sortBy])

    const addPizzaCart = (obj) => {
        dispatch(addPizzaToCart(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeItem={category} onClickItem={onSelectCategory} items={categoryNames} />
                <SortPopUp activeSortType={sortBy.type} lists={sortItems} onClickSortPopUp={onSelectSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded ?
                        items.map(obj => (
                            <PizzaBlock key={obj.id} {...obj} onClickAddPizza={addPizzaCart} cartCount={cartItems[obj.id] && cartItems[obj.id].items.length}/>
                        ))
                        :
                        Array(12).fill(0).map((_, i) => (<PizzaLoadingBlock key={i}/>))
                }
            </div>
        </div>
    )
}

export default Home