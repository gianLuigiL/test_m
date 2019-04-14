//Dependencies
import React from 'react';
import { shallow, mount } from "../../enzyme";
import waitUntil from 'async-wait-until';
import data from "../mocks/api.mock";
import Slider from '../slider';

describe("Should load mock data", () => {

    it("Should load cards", async (done) => {
        const wrapper = shallow(<Slider />);
        await waitUntil( () => wrapper.state("all_items")[0] !== undefined );
        expect(wrapper.state().all_items[0]).toEqual(data.cards[0])
        done();
    })

    it("Should set state correctly", async (done) => {
        const wrapper = shallow(<Slider />);

        expect(wrapper.state("animation_duration")).toEqual(600);
        expect(wrapper.state("items_per_page")).toEqual(2);
        expect(wrapper.state("max_items_per_page")).toEqual(2);
        expect(wrapper.state("index")).toEqual(0);

        await waitUntil( () => wrapper.state("all_items")[0] !== undefined );
        expect(wrapper.state("all_items")).toEqual(data.cards)
        expect(wrapper.state("displayed_items")).toEqual(data.cards.slice(0,wrapper.state("items_per_page")));
        done();
    });

    it("Should change the index correctly", async (done) => {
        const wrapper = mount(<Slider />);

        await waitUntil( () => wrapper.state("all_items")[0] !== undefined );
        //Increase the index and test dispalyed items ahve changed
        wrapper.instance().change_index("increase");
        expect(wrapper.state("displayed_items")).toEqual(data.cards.slice(wrapper.state("index") * wrapper.state("items_per_page"), wrapper.state("index") * wrapper.state("items_per_page") + wrapper.state("items_per_page") ))
        //Decrease
        wrapper.instance().change_index("increase");
        expect(wrapper.state("displayed_items")).toEqual(data.cards.slice(wrapper.state("index") * wrapper.state("items_per_page"), wrapper.state("index") * wrapper.state("items_per_page") + wrapper.state("items_per_page") ))
        
        wrapper.instance().change_index();
        expect(wrapper.state("displayed_items")).toEqual(data.cards.slice(wrapper.state("index") * wrapper.state("items_per_page"), wrapper.state("index") * wrapper.state("items_per_page") + wrapper.state("items_per_page") ))
        done();
    })

    it("Should have correct helper methods", async () => {
        const wrapper = mount(<Slider />);
        const instance = wrapper.instance();

        await waitUntil( () => wrapper.state("all_items")[0] !== undefined );

        expect(instance.all_items()).toEqual(data.cards.length);
        expect(instance.page_size()).toEqual(wrapper.state("items_per_page"));
        expect(instance.all_pages()).toEqual(Math.ceil(data.cards.length / wrapper.state("items_per_page")));
        expect(instance.get_items()).resolves.toBe(undefined);
        expect(instance.next_index()).toEqual(1);
        expect(instance.previous_index()).toEqual(Math.ceil(wrapper.state("all_items").length / wrapper.state("items_per_page")) - 1);
        expect(instance.remaining_items(wrapper.state("index"))).toEqual(wrapper.state("all_items").length - wrapper.state("index") * wrapper.state("items_per_page"));
    })
});