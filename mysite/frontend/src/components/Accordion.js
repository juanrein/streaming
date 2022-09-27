import { useState } from "react";
import "../App.css";


/**
 * Accordion element
 * children: array of functions ({isOpen: boolean}) => Component
 */
export default function Accordion(props) {
    let [openISet, setOpenISet] = useState(new Set([0]));

    let elements = props.children.map((itemF, i) => {
        let className = "accordion-item";
        if (openISet.has(i)) {
            className = "accordion-item-open";
        }

        return <div 
                key={i}
                className={className}
                onClick={e => {
                    if (openISet.has(i)) {
                        openISet.delete(i)
                    }
                    else {
                        openISet.add(i);
                    }
                    setOpenISet(new Set(openISet))
                }}
            >
                {itemF(openISet.has(i))}
            </div>
    })
    return <div className="accordion">
        {elements}
    </div>
}