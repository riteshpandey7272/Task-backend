import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminMenu.css";
import ImageDemo from "../../../assets/farmhousepizza.jpeg";

const UNSPLASHAPIKEY = "AHQ2xW8KPT2nOAnbaKAM7SH-yEbtI2_qIUMorOW2gTM"; 

const AdminmenuList = ({ selectedCategory }) => {
  const [menus, setMenus] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    axios
      .get("/menus")
      .then((response) => {
        console.log("menu:", response.data);
        setMenus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = menus.flatMap((menu) =>
        menu.categories.filter((category) => category.name === selectedCategory)
      );
      setFilteredCategories(filtered);
    }
  }, [selectedCategory, menus]);

  useEffect(() => {
    filteredCategories.forEach((category) => {
      category.menuitems.forEach((item) => {
        if (!images[item.name]) {
          fetchImage(item.name);
        }
      });
    });
  }, [filteredCategories]);

  const fetchImage = async (itemName) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(itemName)}&per_page=1`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASHAPIKEY}`,
          },
        }
      );
      const imageUrl = response.data.results[0]?.urls.small;
      if (imageUrl) {
        setImages((prevImages) => ({
          ...prevImages,
          [itemName]: imageUrl,
        }));
      }
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
    }
  };

  return (
    <div className="admin-menu-render-area">
      {filteredCategories.map((category) => (
        <div key={category.categoryid} className="category">
          <h4>{category.name}</h4>
          <div className="catrgory-head">
            {category.menuitems.map((item) => (
              <div key={item._id} className="menu-item">
                <div className="items">
                  <div>
                    <img
                      src={images[item.name] || ImageDemo}
                      alt={item.name}
                      className="item-img"
                    />
                  </div>
                  <div className="item-name">
                    <h5>{item.name}</h5>
                    <small>{item.description}</small>
                  </div>
                </div>

                <div className="item-price">
                  <div className="item-small-price">
                    <p className="item-size">Small</p>
                    <div className="item-prices">₹{item.regularprice}</div>
                  </div>
                  <div className="item-medium-price">
                    <p className="item-size">Medium</p>
                    <div className="item-prices">₹{item.mediumprice}</div>
                  </div>
                  <div className="item-large-price">
                    <p className="item-size">Large</p>
                    <div className="item-prices">₹{item.largeprice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminmenuList;
