import React, { Component } from 'react';
import Title from './Title';
import {FaGooglePlusSquare,FaAmazon,FaBroadcastTower,FaWifi} from 'react-icons/fa';

export default class Services extends Component {
    state={
        services:[
            {
                icon:<FaGooglePlusSquare/>,
                title:"Google Home",
                info:"We specialize in creating custom virtual assistants, messaging platforms and personal actions for Google Home devices and Google services."
            },
            {
                icon:<FaAmazon/>,
                title:"Amazon Alexa",
                info:"Our developers pride themselves on producing hyper-customized Amazon Alexa skills, Alexa Flash Briefing commands, and Alexa-based messaging platforms."
            },
            {
                icon:<FaBroadcastTower/>,
                title:"Radio Services",
                info:"Among our packages are those that create radio & podcast-oriented Alexa shortcuts, with each one being verified by Amazon once you approve of the product."
            },
            {
                icon:<FaWifi/>,
                title:"Alexa & SEO",
                info:"Efficient and effective Alexa-ranking campaigns are what we are known for, with each campaign being driven by the latest SEO techniques and targeted traffic."
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title='our bread and butter' />
                <div className="services-center">
                    {this.state.services.map((item,index) => {
                        return <article key={index} className="service">
                            <span>
                                {item.icon}
                            </span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        );
    }
}
