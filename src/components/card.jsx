//Dependencies
import React from 'react'
//Styles
import "./scss/card.scss";
//Components
import Paragraph from './paragraph';

export default class Card extends React.Component {
    constructor(props){
        super(props)
        this.container = React.createRef()

        this.animation_duration = props.animation_duration || 500;

        this.handle_click = this.handle_click.bind(this)
    }

    handle_click(e){
        e.preventDefault();
        this.props.click_handler(this.props.id);
        return false;
    }


    render(){
        return (
            <>
            <a 
                href={this.props.href} 
                target="_blank" 
                rel="noopener noreferrer"  
                //Employ transition timing from props
                style={{transitionDuration: `${this.animation_duration / 1000}s`}}>
                <div className="card" ref={this.container}>
                    <img src={this.props.image_url}  onLoad={() => {this.container.current.classList.add("loaded")}} alt={this.props.alternative_text || "A random image."}/>
                    <Paragraph title={this.props.title} subtitle={this.props.subtitle} text={this.props.text} />
                    <span className={`like ${this.props.is_liked ? "liked" : "" }`} onClick={this.handle_click}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>  Layer 1</title><path className="st0" d="M19.4 7.1c0-2.8-2.3-5.1-5.1-5.1 -1.8 0-3.5 1-4.3 2.5C9.1 3 7.5 2 5.7 2 2.8 2 0.6 4.3 0.6 7.1c0 1.5 0.6 2.8 1.6 3.7h0l7.3 6.9C9.6 17.9 9.8 18 10 18c0.2 0 0.4-0.1 0.5-0.2l7.3-7h0C18.8 9.9 19.4 8.5 19.4 7.1"/></svg>
                    </span>
                </div>
            </a>
            </>
        )
    }

}