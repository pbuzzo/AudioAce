import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';


export default class SingleRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    };
    static contextType = RoomContext;
    // 

    render() {
        // destructure and get the getRoom function
        const { getRoom } = this.context;
        // utilize getRoom with this.state.slug
        const room = getRoom(this.state.slug);
        if (!room) {
            return (
                <div className="error">
                    <h3>no such service could be found...</h3>
                    <Link to="/rooms" className="btn-primary">
                        back to services
                    </Link>
                </div>
            )
        }
        const {name,description,price,extras,twoDayDelivery,images} = room;
        const [mainImg,...defaultImg] = images;
        return (
            <>
                <StyledHero img={mainImg || this.state.defaultBcg}>
                    <Banner title={`${name}`}>
                        <Link to='/rooms' className='btn-primary'>
                            back to services
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImg.map((item,index) => {
                            return <img key={index} src={item} alt={name}/>;
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>{twoDayDelivery?"Two-Day Delivery":""}</h6>
                            <p>To Start Today, Email: <strong>audioace@protonmail.com</strong></p>
                        </article>

                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((item,index) => {
                            return <li key={index}>- {item}</li>;
                        })}
                    </ul>
                </section>
            </>
        );
    }
}
