//Dependencies
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//Components
import Card from './card';
//Styles
import "./scss/slider.scss";
//Utils
import get_data from '../utils/get_data';

export default class Slider extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
            animation_duration: props.animation_duration || 600,
            items_per_page: props.items_per_page || 2,
            max_items_per_page: props.items_per_page || 2,
            index: 0,
            all_items: [],
            displayed_items: []
        }

        this.resize_timer = "";

        this.slider = React.createRef();

        this.all_items = this.all_items.bind(this);
        this.all_pages = this.all_pages.bind(this);
        this.change_index = this.change_index.bind(this);
        this.get_items = this.get_items.bind(this);
        this.get_slide_size = this.get_slide_size.bind(this);
        this.like_card = this.like_card.bind(this);
        this.next_index = this.next_index.bind(this);
        this.previous_index = this.previous_index.bind(this);
        this.page_size = this.page_size.bind(this);
        this.remaining_items = this.remaining_items.bind(this);
        this.set_resize_listener = this.set_resize_listener.bind(this);
    }


    all_items(){
        return this.state.all_items.length;
    }

    all_pages(){
        return Math.ceil(this.all_items() / this.page_size());
    }

    change_index(variant, e){
        e.preventDefault();

        let new_index;
        if(variant === "increase") {
            new_index = this.next_index();
        } else if (variant === "decrease") {
            new_index = this.previous_index();
        } else {
            new_index = 0;
        }
        //Based on the remaining items the displayed compute the items to be displayed
        let displayed_items;
        if(this.remaining_items(new_index) > 0) {
            const length = this.all_items()
            displayed_items = this.state.all_items.slice(new_index * this.page_size(), length - this.remaining_items(new_index) + this.page_size());
            this.setState({displayed_items, index: new_index});
        } else  {
            const displayed_items = this.state.all_items.slice(0,this.state.items_per_page);
            this.setState({displayed_items, index: new_index})
        }
        return false;
    }

    get_items(){
        return get_data().then(cards => {
            if(cards.length > this.state.displayed_items.length) {
                this.setState({
                all_items: cards,
                displayed_items: cards.slice(this.state.index * this.state.items_per_page, this.state.index * this.state.items_per_page + this.state.items_per_page)
                })
            } else {
                this.setState({
                all_items: cards,
                displayed_items: cards
                })
            }
            this.set_resize_listener();
        });
    }

    get_slide_size(){
        return this.slider.current.querySelector(".card").clientWidth;
    }
    
    like_card(id) {
        const item = this.state.all_items.find(el => el.id === id);
        const body = JSON.stringify({is_liked: !item.is_liked});
        fetch(`http://localhost:3001/cards/${id}`, {
            method: "PATCH",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            this.get_items();
        }).catch(console.log)
    }

    next_index(){
        const index = this.state.index;
        if((index + 1) * this.page_size() >= this.all_items()) {
            return 0;
        } else {
            return index + 1;
        }
    }

    previous_index(){
        const index = this.state.index;
        if(index <= 0) {
            return Math.ceil(this.all_items() / this.page_size()) - 1;
        } else {
            return index - 1;
        }
    }

    page_size(){
        return this.state.items_per_page;
    }

    remaining_items(index){
        const remainder = this.all_items() - index  *  this.page_size();
        if(remainder <= 0) {
            return 0;
        } else {
            return remainder;
        }
    }

    set_resize_listener(){
        window.addEventListener("resize", ()=>{
            if(this.resize_timer) {
                clearTimeout(this.resize_timer);
            }
            this.resize_timer = setTimeout( () => {
                console.log("triggered");
                const current_size = this.slider.current.clientWidth;
                const items_per_page = Math.min(this.state.max_items_per_page, Math.floor(current_size / this.get_slide_size()));
                if(items_per_page <= 1) {
                    this.setState({index: 1, items_per_page: 1});
                } else {
                    this.setState({index: 1, items_per_page})
                }
                this.change_index();
            } ,200);
        })
    }

      
    componentDidMount(){
        this.get_items()
    }

    render(){
        const cards = this.state.displayed_items.map( (el, index )=> 
            <Card {...el} 
                  key={el.title} 
                  animation_duration={(index + 1) * this.state.animation_duration}  
                  click_handler={this.like_card}/>
                  );
    return (
            <div className={`slider`}  ref={this.slider} >
                <ReactCSSTransitionGroup className="items" component="div"
                    transitionName="example"
                    transitionEnter={true}
                    transitionEnterTimeout={500}
                    transitionLeave={false}>
                    {cards}
                </ReactCSSTransitionGroup>
                <div className="arrows">
                    <a href="/" className="left_arrow" onClick={(e) => this.change_index("decrease", e)} tabIndex="0">
                        <span style={{display: "none"}}>Load next cards</span>
                    </a>
                    <a href="/" className="right_arrow" onClick={(e) => this.change_index("increase", e)} tabIndex="0">
                        <span style={{display: "none"}}>Load Next Cards</span>
                    </a>
                </div>
            </div>
        )
    }

    
}
