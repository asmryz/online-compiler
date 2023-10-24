import React, { Fragment, useEffect, useState } from "react";
//import ReactDOM from "react-dom";
import axios from "axios";

import IDE from "./IDE";
import "./style.css";

const LiveIDE = () => {

    const [codes, setCodes] = useState([])
    const fetchCodes = () => axios.get(`/api/codes`).then(srces => setCodes(srces.data));


    useEffect(() => {

        window.addEventListener("scroll", () => {
            let current = "";
            document.querySelectorAll("div.sec").forEach((div) => {
                let sectionTop = div.offsetTop;
                if (scrollY >= sectionTop - 65) {
                    current = div.getAttribute("id");
                }
            });
            document.querySelectorAll("nav ul li a").forEach((li) => {
                li.classList.remove("active");
                document.querySelector(`nav ul li a[href*=${current}]`).classList.add("active");
            });
        });
        fetchCodes();
    }, []);

    console.log(`http://${window.location.host}`);

    return (
        <div className="box">
            <div className="content">
                <main>
                    {codes.map((item, i) => (
                        <div className="sec" id={`ide-${item.filename}`} key={i}>
                            <h4>{item.title}</h4>
                            <IDE item={item} />
                        </div>
                    ))}
                </main>

            </div>
            <div className="scroll">
                <nav>
                    <ul>
                        {codes.map((item, i) => (
                            <li key={i}>
                                <a href={`#ide-${item.filename}`} className={i === 0 ? "active" : ""}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default LiveIDE;
