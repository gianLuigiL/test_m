//Dependencies
import React from 'react';
//Styles
import "./scss/paragraph.scss";

export default function Paragraph(props) {
    return (
        <div className="paragraph">
            <div className="headings_container">
                <div className="icon">
                    <img src="./assets/images/icon_mindera_g.png" alt="Mindera ribbon icon"/>
                </div>
                <div className="headings">
                    <h2 >{props.title}</h2>
                    {props.subtitle && <h3 >{props.subtitle}</h3>}
                </div>
            </div>
            <p dangerouslySetInnerHTML={{__html: props.text || ""}}></p>
        </div>
    )
}