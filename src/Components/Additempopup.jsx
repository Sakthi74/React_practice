import React, { useState,useEffect } from "react";
import "../Style/AddItemPopup.css";

const Additempopup = ({ closePopup,addItem,editItem,selecteditem,updateItem }) => {
  const [trackOpen, setTrackOpen] = useState(false);
    const [weightOpen, setWeightOpen] = useState(false);
    const [formData,setFormData]=useState({
  upc:"",
  name:"",
  price:"",
  category:"",
  manufacturer:""
    })
    const handlechange=(e) => { console.log(e.target.name, e.target.value);
  setFormData({...formData, [e.target.name]: e.target.value})
        
    }

  const handleSave = () => {
    if (editItem) {
      updateItem({
        ...selecteditem,
        ...formData
      });
    } else {
      const newitem = {
        id: Date.now(),
        image: "https://picsum.photos/200",
        ...formData
      };
      addItem(newitem);
    };
    closePopup();
  }
  
  useEffect(() => {
    if (selecteditem) {
      setFormData(selecteditem)
    }
  }, [selecteditem])
  console.log("Selected Item:", selecteditem)

  return (
    <div className="popup-overlay">
      <div className="popup-container">

        {/* Header */}
        <div className="popup-header">
          <button className="close-btn" onClick={closePopup}>✕</button>
          <h2>Add Quick Item</h2>
          <button className="add-btn" onClick={handleSave}>
            ✓ Add
          </button>
        </div>

        {/* Body */}
        <div className="popup-body">

          {/* UPC */}
          <input type="text" placeholder="UPC" name="upc" className="popupinput full-width"  onChange={handlechange} />

          {/* Product Name + Price in a row */}
          <div className="row-group">
            <input type="text" placeholder="* Product Name" name="name" className="popupinput grow" onChange={handlechange} />
            <input type="number" placeholder="Price" name="price" className="popupinput price-input" onChange={handlechange} />
          </div>

          {/* Category + red + button */}
          <div className="category-row">
            <div className="category-left">
              <span className="category-label">SELECT CATEGORY</span>
              <select
  className="category-select"
  name="category"
  onChange={handlechange}
>
  <option value="Appetizers">Appetizers</option>
  <option value="Wraps">Wraps</option>
  <option value="Breakfast">Breakfast</option>
  <option value="Soup salad">Soup salad</option>
  <option value="Sandwich">Sandwich</option>
  <option value="Bottled Beer">Bottled Beer</option>
  <option value="Dinner">Dinner</option>
  <option value="Openitem">Openitem</option>
</select>
            </div>
            <button className="red-plus-btn">+</button>
          </div>

          {/* Default Tax */}
          <select className="popupinput full-width" >
            <option>Default Tax</option>
            <option>GST 5%</option>
            <option>GST 12%</option>
          </select>

          {/* Manufacturer */}
          <input type="text" placeholder="Select Manufacturer" onChange={handlechange} className="popupinput full-width" />

          {/* Track Inventory collapsible */}
          <div className="collapsible-section">
            <div className="collapsible-header" onClick={() => setTrackOpen(!trackOpen)}>
              <span>Track Inventory</span>
              <button className="plus-toggle">{trackOpen ? "−" : "+"}</button>
            </div>
            {trackOpen && (
              <div className="collapsible-body">
                <label className="checkbox-label">
                  <input type="checkbox" /> Enable Track Inventory
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> Enable Negative Inventory
                </label>
              </div>
            )}
          </div>

          {/* Enable Weight collapsible */}
          <div className="collapsible-section">
            <div className="collapsible-header" onClick={() => setWeightOpen(!weightOpen)}>
              <span>Enable Weight</span>
              <button className="plus-toggle">{weightOpen ? "−" : "+"}</button>
            </div>
            {weightOpen && (
              <div className="collapsible-body">
                <label className="checkbox-label">
                  <input type="checkbox" /> Enable Weight Tracking
                </label>
              </div>
            )}
          </div>

          {/* Bottom checkboxes (always visible as in image) */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" /> Enable Track Inventory
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Enable Negative Inventory
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Additempopup;