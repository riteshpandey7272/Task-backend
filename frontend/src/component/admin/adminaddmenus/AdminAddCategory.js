import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAddCategory = ({
  userId, 
  selectedMenu,
  categoryData,
  setCategoryData,
}) => {
  const [restaurants, setRestaurants] = useState([]); 
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null); 

  const handleCategoryChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
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

  const handleAddCategory = (e) => {
    e.preventDefault();
    axios
      .post("/addCategory", {
        ...categoryData,
        userId,
        resturentid: selectedRestaurantId, 
      })
      .then((response) => {
        console.log("Category added:", response.data);
        setCategoryData({
          name: "",
          menuid: selectedMenu ? selectedMenu.menuid : "",
        }); 
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div className="card">
      <h2>Add Category</h2>
      <form className="adform" onSubmit={handleAddCategory}>
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
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleCategoryChange}
            required
          />
          <label>Name</label>
        </div>

        <button type="submit" className="btn btn-outline-success">Add Category</button>
        
      </form>
    </div>
  );
};

export default AdminAddCategory;
