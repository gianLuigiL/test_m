//Dependencies
import React from 'react';
import jest from "jest-mock";
import { shallow, mount } from "../../enzyme";

import Card from "../card";


const card_el = {
    "id": 1,
    "title": "Test title.",
    "subtitle": "Test subtitle.",
    "text": "Test text",
    "image_url": "https://picsum.photos/300/150/?random",
    "href": "https://mindera.com/people-and-culture/we-are-humans/",
    "is_liked": true
}

//Shallow rendering
describe("Card test", () => {
    it("Renders a card", () => {
        const wrapper = shallow(<Card {...card_el}/>);

        //The card does exist
        expect(wrapper.find(".card")).toBeDefined();
        expect(wrapper.find(".card")).toHaveLength(1);

        //The img in the card does exist
        expect(wrapper.find("img")).toBeDefined();
        expect(wrapper.find("img")).toHaveLength(1);

        //The like heart does exist and has a "liked" class from properties
        expect(wrapper.find(".like")).toBeDefined();
        expect(wrapper.find(".like")).toHaveLength(1);
        expect(wrapper.find(".liked")).toBeDefined();
        expect(wrapper.find(".liked")).toHaveLength(1);
    });


    it("Passes properties and handles defaults", () => {
        const wrapper = shallow(<Card {...card_el}/>);

        expect(wrapper.find("img").get(0).props.alt).toBeTruthy();
    })


    it("Renders a card", () => {
        const wrapper = mount(<Card {...card_el}/>);

        //The child Paragraph does exist
        expect(wrapper.find(".paragraph")).toBeDefined();
        expect(wrapper.find(".paragraph")).toHaveLength(1);
    });

    it("Handles clicks clicks", () => {
        const click_handler = jest.fn(() => "hello");
        const wrapper = mount( <Card {...card_el} click_handler={click_handler}/> );
        wrapper.find(".like").simulate("click");
        expect(click_handler).toHaveBeenCalled();
    });
});



