import React, { Component } from 'react';
// import items from './data';
import Client from './Contentful';



const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        price: 0,
        minPrice: 0,
        maxPrice: 0,
    };
    // getData funct.
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "audioace",
                order: "sys.createdAt"
            });
        // let rooms = this.formatData(items);
        let rooms = this.formatData(response.items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice
        })
        console.log(response.items);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount(){
        this.getData()
    };

    // Deconstruct data and properly format needed values
    formatData(items){
        let tempItems = items.map(item =>{
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields,images,id};
            return room;
        });
        return tempItems;
    };

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    };

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked:target.value
        const name = event.target.name;
        this.setState({
            [name]: value
        },this.filterRooms)
    };


    // desctructures state values
    filterRooms = () => {
        let {
            rooms,
            type,
            price,
            twoDayDelivery,
        } = this.state;
        // all the rooms
        let tempRooms = [...rooms];
        // transform values
        price = parseInt(price);

        // filter by type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        };

        // filter by capacity
        // if (capacity !== 1) {
        //     tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        // };

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // filter by size
        // tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        // filter by breakfast
        // if (breakfast) {
        //     tempRooms = tempRooms.filter(room => room.breakfast === true);
        // };

        // filter by twoDayDelivery
        if (twoDayDelivery) {
            tempRooms = tempRooms.filter(room => room.twoDayDelivery === true);
        };

        // change state
        this.setState({
            sortedRooms: tempRooms
        })
    };



    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}


export { RoomProvider, RoomConsumer, RoomContext };