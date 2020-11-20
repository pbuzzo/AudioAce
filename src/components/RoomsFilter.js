import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';

// get all unique values available 
const getUnique = (items,value) => {
    return [...new Set(items.map(item => item[value]))];
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    const {
        handleChange,
        type,
        price,
        minPrice,
        maxPrice,
        twoDayDelivery
    } = context;

    // get unique types
    let types = getUnique(rooms,'type')
    // add all as an option for the useer to choose from
    types = ['all',...types];
    // map your results to JSX
    types = types.map((item,index) => {
        return <option vale={item} key={index}>{item}</option>
    })

    // let people = getUnique(rooms,'capacity');
    // people = people.map((item,index) => {
    //     return <option key={index} value={item}>{item}</option>
    // })

    return (
        <section className="filter-container">
            <Title title="search services" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">Service Type</label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
                {/* end select type */}
                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">service price ${price}</label>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* end of room price */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input
                            type="checkbox"
                            name="twoDayDelivery"
                            id="twoDayDelivery"
                            checked={twoDayDelivery}
                            onChange={handleChange}
                        />
                        <label htmlFor="twoDayDelivery">Two-Day Delivery</label>
                    </div>
                </div>

                {/* end of extras */}
            </form>
        </section>
    )
};
