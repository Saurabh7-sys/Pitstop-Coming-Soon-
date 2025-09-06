import React from 'react'
import ForDesktop from '../components/ForDesktop/ForDesktop';
import buyAndSell from './assets/buyAndSell.png'
import rent from './assets/Rent.png'
import spareParts from './assets/spareParts.png'
import garage from './assets/garage.png'
import tow from './assets/tow.png'

import style from './DesktopView.module.css'

const DesktopView = () => {

    const items = [
        {
            image: buyAndSell,
            title: (<>Buy/&nbsp;Sell</>),
            // subtitle: "Frontend Developer",
            // handle: "@Pitstop",
            borderColor: "#FFFFFF",
            gradient: "linear-gradient(145deg, #F4B520, #000)",
        },
        {
            image: rent,
            title: "Rent",
            // subtitle: "Backend Engineer",
            // handle: "@Pitstop",
            borderColor: "#FFFFFF",
            gradient: "linear-gradient(145deg, #F4B520, #000)",

        },
        {
            image: spareParts,
            title: (<>Auto&nbsp;Spare&nbsp;Parts</>),
            // subtitle: "Backend Engineer",
            // handle: "@Pitstop",
            borderColor: "#FFFFFF",
            gradient: "linear-gradient(145deg, #F4B520, #000)",

        }
    ];

    const items2 = [
        {
            image: garage,
            title: "Garage",
            // subtitle: "Frontend Developer",
            // handle: "@Pitstop",
            borderColor: "#FFFFFF",
            gradient: "linear-gradient(145deg, #F4B520, #000)",

        },
        {
            image: tow,
            title: (<>Emergency&nbsp;Tow&nbsp;Service</>),
            // subtitle: "Backend Engineer",
            // handle: "@Pitstop",
            borderColor: "#FFFFFF",
            gradient: "linear-gradient(145deg, #F4B520, #000)",

        },

    ];

    return (
        <div className={style.servicesSection}>

            <h1>Services</h1>
            <div style={{ position: 'relative' }}>
                <ForDesktop
                    items={items}
                    radius={300}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                />
                <ForDesktop
                    items={items2}
                    radius={300}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                />
            </div>
        </div>
    )
}

export default DesktopView
