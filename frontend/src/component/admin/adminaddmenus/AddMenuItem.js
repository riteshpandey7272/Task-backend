import React, { useEffect, useState } from "react";
import axios from "axios";

const AddMenuItem = ({
  userId,
  selectedMenu,
  categories,
  menuItemData,
  setMenuItemData,
}) => {
  const [restaurants, setRestaurants] = useState([]); 
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null); 
  const handleMenuItemChange = (e) => {
    setMenuItemData({ ...menuItemData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/resturents');
        const fetchedRestaurants = response.data[0]?.resturents || []; 
        setRestaurants(fetchedRestaurants); 
        console.log("Fetched Restaurants:", fetchedRestaurants);

        const matchingRestaurants = fetchedRestaurants.filter(
          restaurant => restaurant.Userid === userId
        );

        if (matchingRestaurants.length > 0) {
          setSelectedRestaurantId(matchingRestaurants[0].resturentid); 
          console.log("Matching Resturent ID:", matchingRestaurants[0].resturentid);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    axios
      .post("/addMenuItem", {
        ...menuItemData,
        userId,
        resturentid: selectedRestaurantId, 
      })
      .then((response) => {
        console.log("Menu item added:", response.data);
        setMenuItemData({
          name: "",
          description: "",
          regularprice: "",
          mediumprice: "",
          largeprice: "",
          menuid: selectedMenu ? selectedMenu.menuid : "",
          categoryid: "",
        }); 
      })
      .catch((error) => {
        console.error("Error adding menu item:", error);
      });
  };

  return (
    <div className="card">
      <h2>Add Menu Item</h2>
      <form className="adform" onSubmit={handleAddMenuItem}>
        <div className="input-group">
          <input
            type="text"
            name="menuid"
            value={selectedMenu ? selectedMenu.menuname : ""}
            readOnly 
            required
          />
        </div>

        <div className="input-group">
          <select
            className="select-category"
            name="categoryid"
            value={menuItemData.categoryid}
            onChange={handleMenuItemChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryid} value={category.categoryid}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={menuItemData.name}
            onChange={handleMenuItemChange}
            required
          />
          <label>Name</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            name="description"
            value={menuItemData.description}
            onChange={handleMenuItemChange}
            required
          />
          <label>Description</label>
        </div>

        <div className="input-group">
          <input
            type="number"
            name="regularprice"
            value={menuItemData.regularprice}
            onChange={handleMenuItemChange}
            required
          />
          <label>Regular Price</label>
        </div>

        <div className="input-group">
          <input
            type="number"
            name="mediumprice"
            value={menuItemData.mediumprice}
            onChange={handleMenuItemChange}
            required
          />
          <label>Medium Price</label>
        </div>

        <div className="input-group">
          <input
            type="number"
            name="largeprice"
            value={menuItemData.largeprice}
            onChange={handleMenuItemChange}
            required
          />
          <label>Large Price</label>
        </div>

        <button type="submit" className="btn btn-outline-success">Add Menu Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
