import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customermenuoption.css";

const MenuRender = ({ selectedMenu, onAddToOrder }) => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/menus');
        const menu = response.data[0]; 
        const categories = menu.categories;

        const selectedCategory = categories.find(
          (category) => category.name.toLowerCase() === selectedMenu.toLowerCase()
        );

        const selectedMenuData = selectedCategory ? selectedCategory.menuitems : [];
        setMenuData(selectedMenuData);

        const updatedMenuData = await Promise.all(
          selectedMenuData.map(async (item) => {
            const imageUrl = await fetchImage(item.name);
            return { ...item, imageUrl };
          })
        );

        setMenuData(updatedMenuData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMenuData([]);
      }
    };

    fetchData();
  }, [selectedMenu]);

  const fetchImage = async (query) => {
    const accessKey = 'AHQ2xW8KPT2nOAnbaKAM7SH-yEbtI2_qIUMorOW2gTM';
    const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`;

    try {
      const response = await axios.get(endpoint, {
        headers: { 'Authorization': `Client-ID ${accessKey}` }
      });

      const imageUrl = response.data.results[0]?.urls.small || '';
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
      return '';
    }
  };

  return (
    <div className="menu-render-area">
      <div className="menu-render-name">{selectedMenu}</div>
      <div className="menus-render">
        {menuData.map((item, index) => (
          <div key={item.id || index} className="my-menu-render">
            <div className="menu-render">
              <div className="image">
                <img src={item.imageUrl || 'default_image_url'} className="circular-image" alt={item.name} />
              </div>
              <div className="menu-render-details">
                <h5>{item.name}</h5>
                <small>
                  {item.description}
                </small>
              </div>
            </div>
            <div className="price-details">
              <div className="small-price" onClick={() => onAddToOrder(item, 'Small', item.regularprice)}>
                <p className="size">Small</p>
                <div className="prices">₹{item.regularprice}</div>
              </div>
              <div className="medium-price" onClick={() => onAddToOrder(item, 'Medium', item.mediumprice)}>
                <p className="size">Medium</p>
                <div className="prices">₹{item.mediumprice}</div>
              </div>
              <div className="large-price" onClick={() => onAddToOrder(item, 'Large', item.largeprice)}>
                <p className="size">Large</p>
                <div className="prices">₹{item.largeprice}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuRender;
