import React from 'react'
import PropTypes from 'prop-types'

const Categories = React.memo(({activeItem, items, onClickItem}) => {
    
    const selectItem = (index) => {
        onClickItem(index)
    }

    return (
        <div className="categories">
            <ul>
                <li onClick={() => selectItem(null)} className={activeItem === null ? 'active' : ''}>Все</li>
                {items && items.map((item, i) => <li className={activeItem === i ? 'active' : ''} onClick={() => selectItem(i)} key={i}>{item}</li>)}
            </ul>
        </div>
    )
})

Categories.propTypes = {
    activeItem: PropTypes.oneOf([PropTypes.number, null]),
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickItem: PropTypes.func
}

Categories.defaultProps = {
    activeItem: null,
    items: [],
    onClickItem: function () {  }
}



export default Categories