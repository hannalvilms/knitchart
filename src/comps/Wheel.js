import React, {useState} from 'react';

const Wheel = (props) => {
    let [selectedItem, setSelectedItem] = useState(null);

    const selectItem = () => {
        if (selectedItem === null) {
        selectedItem = Math.floor(Math.random() * props.items.length);
            if (props.onSelectItem) {
                props.onSelectItem(selectedItem);
            }
        setSelectedItem(selectedItem)
        } else {
        selectedItem = null
        setSelectedItem(selectedItem);
        setTimeout(selectItem, 500);
        }
    }

    const wheelVars = {
        '--nb-item': props.items.length,
        '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
        <div className="wheel-container">
            <div className={`wheel ${spinning}`} style={wheelVars} onClick={selectItem}>
                {props.items.map((item, index) => (
                <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                    <p>{item.name}</p>
                    <img src={item.items} alt={props.name}/>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Wheel