const express = require("express");
require("./db/config");
const app = express();
const jwt = require("jsonwebtoken");
const jwtKey = "restro";
const cors = require('cors');
const bcrypt = require('bcrypt');
const Resturent = require('./db/model/Resturent');
const User = require("./db/model/User");
app.use(express.json());
app.use(cors()); 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.post("/signup", async (req, res) => {
  const { role, name, email, mobile_num, password } = req.body;
  try {
    const existingUser = await User.findOne({ 'users.email': email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userDoc = await User.findOne({});
    let nextUserId = 1;

    if (userDoc && userDoc.users.length > 0) {
      const maxUserId = Math.max(...userDoc.users.map(user => user.Userid));
      nextUserId = maxUserId + 1;
    }

    const newUser = {
      Userid: nextUserId,
      role,
      name,
      email,
      mobile_num,
      password,
    };

    if (!userDoc) {
      await User.create({ users: [newUser] });
    } else {
      userDoc.users.push(newUser);
      await userDoc.save();
    }

    const token = jwt.sign({ userId: newUser.Userid }, jwtKey);
    newUser.token = token;

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({
      'users.email': email
    }, { 'users.$': 1 }); 
    
    if (!user || !user.users || user.users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const foundUser = user.users[0]; 
    const token = jwt.sign({
      userId: foundUser.id,
      email: foundUser.email,
      role: foundUser.role
    }, jwtKey, { expiresIn: '1h' }); 

    const userWithoutPassword = {
      id: foundUser.id,
      Userid: foundUser.Userid,
      role: foundUser.role,
      name: foundUser.name,
      email: foundUser.email,
      mobile_num: foundUser.mobile_num,
      restro_name: foundUser.restro_name,
      address: foundUser.address
    };

    res.json({
      token: token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send("Error finding user");
  }
});



const Restaurant = require("./db/model/Resturent");
const Menu = require("./db/model/Menu");

app.get('/menus', async (req, res) => {
  try {
    const menus = await Menu.aggregate([
      {
        $lookup: {
          from: 'categories', 
          localField: 'menuid',
          foreignField: 'menuid',
          as: 'categories'
        }
      },
      {
        $unwind: {
          path: '$categories',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'menuitems',
          localField: 'categories.categoryid',
          foreignField: 'categoryid',
          as: 'categories.menuitems'
        }
      },
      {
        $group: {
          _id: {
            menuid: '$menuid',
            menuname: '$menuname',
            userId: '$userId',
            resturentid: '$resturentid'
          },
          categories: {
            $push: '$categories'
          }
        }
      },
      {
        $project: {
          menuid: '$_id.menuid',
          menuname: '$_id.menuname',
          userId: '$_id.userId',
          resturentid: '$_id.resturentid',
          categories: 1
        }
      }
    ]);

    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/resturents', async (req, res) => {
  console.log(req.body);
  try {
    const resturents = await Restaurant.find();
    res.json(resturents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post("/addResturent", async (req, res) => {
  const {
    Userid,
    resturentName,
    resturentContact,
    resturentEmailid,
    resturentAddress,
    ownerName,
    ownerContact,
    ownerAlternateContact,
    ownerEmail,
    numberOfTables
  } = req.body;

  try {
    const resturentDoc = await Restaurant.findOne({});
    let nextResturentId = 1;

    if (resturentDoc && resturentDoc.resturents.length > 0) {
      const maxResturentId = Math.max(...resturentDoc.resturents.map(rest => rest.resturentid));
      nextResturentId = maxResturentId + 1;
    }

    const newResturent = {
      Userid,
      resturentid: nextResturentId,
      resturentName,
      resturentContact,
      resturentEmailid,
      resturentAddress,
      ownerName,
      ownerContact,
      ownerAlternateContact,
      ownerEmail,
      numberOfTables
    };

    if (!resturentDoc) {
      await Restaurant.create({ resturents: [newResturent] });
    } else {
      resturentDoc.resturents.push(newResturent);
      await resturentDoc.save();
    }

    const newMenu = {
      menuid: 1, 
      menuname: `${resturentName} Menu`,
      userId: Userid,
      resturentid: nextResturentId
    };

    await Menu.create(newMenu);

    res.status(201).json({ message: "Restaurant and menu added successfully", resturent: newResturent });
  } catch (error) {
    console.error("Error in adding restaurant:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});





const Category = require('./db/model/Category'); 

app.get('/categories', async (req, res) => {
  console.log(req.body);
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/addCategory', async (req, res) => {
  const { name, userId, menuid, resturentid} = req.body;

  try {
    const categoryDocs = await Category.find();
    let nextCategoryId = 1;

    if (categoryDocs.length > 0) {
      const maxCategoryId = Math.max(...categoryDocs.map(cat => cat.categoryid));
      nextCategoryId = maxCategoryId + 1;
    }

    const newCategory = new Category({
      categoryid: nextCategoryId,
      name,
      userId,
      resturentid,
      menuid
    });

    await newCategory.save();
    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const MenuItem = require('./db/model/MenuItem');

app.post('/addMenuItem', async (req, res) => {
  const {
    name,
    description,
    regularprice,
    mediumprice,
    largeprice,
    userId,
    menuid,
    categoryid,
    resturentid
  } = req.body;

  try {
    const menuitemDocs = await MenuItem.find();
    let nextMenuitemId = 1;

    if (menuitemDocs.length > 0) {
      const maxMenuitemId = Math.max(...menuitemDocs.map(item => item.menuitemid));
      nextMenuitemId = maxMenuitemId + 1;
    }

    const newMenuItem = new MenuItem({
      menuitemid: nextMenuitemId, 
      name,
      description,
      regularprice,
      mediumprice,
      largeprice,
      userId,
      resturentid,
      menuid,
      categoryid
    });

    await newMenuItem.save();
    res.status(201).json({ message: "Menu item added successfully", menuItem: newMenuItem });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


const Order = require('./db/model/Order');
app.post('/orders', async (req, res) => {
  console.log(req.body);
  try {
    const getNextOrderId = async () => {
      const orders = await Order.find();
      let nextOrderId = 1;

      if (orders.length > 0) {
        const maxOrderId = Math.max(...orders.flatMap(order => order.orders.map(o => o.orderid)));
        nextOrderId = maxOrderId + 1;
      }
      return nextOrderId;
    };

    const getMaxOrderNumber = async () => {
      const orders = await Order.find();
      let maxOrderNumber = 0;

      if (orders.length > 0) {
        maxOrderNumber = Math.max(...orders.flatMap(order => order.orders.map(o => o.ordernumber)));
      }
      return maxOrderNumber;
    };

    const nextOrderId = await getNextOrderId();
    const maxOrderNumber = await getMaxOrderNumber();
    const newOrderNumberStart = maxOrderNumber + 1;

    const newOrders = req.body.orders.map((order, index) => ({
      ...order,
      orderid: nextOrderId + index,      
      ordernumber: newOrderNumberStart + index, 
      date: new Date(),
      payment: req.body.payment,
      paymentMethod: req.body.paymentMethod,
      mobileNumber: req.body.mobileNumber 
    }));

    const existingOrder = await Order.findOne({});
    
    if (existingOrder) {
      existingOrder.orders.push(...newOrders);
      await existingOrder.save();
      res.status(200).send(existingOrder);
    } else {
      const order = new Order({
        orders: newOrders
      });
      await order.save();
      res.status(201).send(order);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/orders', async (req, res) => {
  try {
      const orders = await Order.find();
      res.status(200).send(orders);
  } catch (error) {
      res.status(500).send(error);
  }
});
app.get('/orders/:id', async (req, res) => {
  console.log("body data:", req.body);

  try {
    const orderId = parseInt(req.params.id, 10);
    
    const order = await Order.findOne({ 'orders.orderid': orderId }, { 'orders.$': 1 }).exec();

    if (order && order.orders.length > 0) {
      res.json(order.orders[0]);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/orders/:id/payment-status', async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);

    const updatedOrder = await Order.findOneAndUpdate(
      { 'orders.orderid': orderId },
      { $set: { 'orders.$.payment': 'Done' } },
      { new: true }
    ).exec();

    if (updatedOrder) {
      res.json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/orders/:id/orderStatusOngoing', async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);

    const updatedOrder = await Order.findOneAndUpdate(
      { 'orders.orderid': orderId },
      { $set: { 'orders.$.orderStatus': 'On Going' } },
      { new: true }
    ).exec();

    if (updatedOrder) {
      res.json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error("Error updating orderStatus status:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/orders/:id/orderStatusComplete', async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);

    const updatedOrder = await Order.findOneAndUpdate(
      { 'orders.orderid': orderId },
      { $set: { 'orders.$.orderStatus': 'Complete' } },
      { new: true }
    ).exec();

    if (updatedOrder) {
      res.json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error("Error updating orderStatus status:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/search', async (req, res) => {
  
  try {
    const { query } = req.query;
    const results = await Resturent.find({
      'resturents.resturentName': { $regex: query, $options: 'i' } 
    }, { 'resturents.$': 1 }); 

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for restaurants.' });
  }
});



// Swagger Documentation:

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - role
 *         - name
 *         - email
 *         - mobile_num
 *         - password
 *       properties:
 *         role:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile_num:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         role: admin
 *         name: Rishu Pandey
 *         email: rishu80@gmail.com
 *         mobile_num: "7054219942"
 *         password: password123
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - Userid
 *         - resturentName
 *         - resturentContact
 *         - resturentEmailid
 *         - resturentAddress
 *         - ownerName
 *         - ownerContact
 *         - ownerAlternateContact
 *         - ownerEmail
 *         - numberOfTables
 *       properties:
 *         Userid:
 *           type: integer
 *         resturentName:
 *           type: string
 *         resturentContact:
 *           type: string
 *         resturentEmailid:
 *           type: string
 *         resturentAddress:
 *           type: string
 *         ownerName:
 *           type: string
 *         ownerContact:
 *           type: string
 *         ownerAlternateContact:
 *           type: string
 *         ownerEmail:
 *           type: string
 *         numberOfTables:
 *           type: integer
 *       example:
 *         Userid: 1
 *         resturentName: John's Diner
 *         resturentContact: "1234567890"
 *         resturentEmailid: john.diner@example.com
 *         resturentAddress: 123 Main St
 *         ownerName: John Doe
 *         ownerContact: "0987654321"
 *         ownerAlternateContact: "1122334455"
 *         ownerEmail: john.doe@example.com
 *         numberOfTables: 10
 */

/**
 * @swagger
 * /resturents:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieves a list of all restaurants
 *     responses:
 *       200:
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /resturents/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     description: Retrieve a single restaurant by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: A restaurant object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /resturents:
 *   post:
 *     summary: Create a new restaurant
 *     description: Add a new restaurant to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /resturents/{id}:
 *   patch:
 *     summary: Update a restaurant by ID
 *     description: Modify the details of an existing restaurant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /resturents/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     description: Remove a restaurant from the database by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         Userid:
 *           type: number
 *         resturentName:
 *           type: string
 *         resturentContact:
 *           type: string
 *         resturentEmailid:
 *           type: string
 *         resturentAddress:
 *           type: string
 *         ownerName:
 *           type: string
 *         ownerContact:
 *           type: string
 *         ownerAlternateContact:
 *           type: string
 *         ownerEmail:
 *           type: string
 *         numberOfTables:
 *           type: number
 *     Menu:
 *       type: object
 *       properties:
 *         menuid:
 *           type: number
 *         menuname:
 *           type: string
 *         userId:
 *           type: number
 *         resturentid:
 *           type: number
 *         categories:
 *           type: array
 *           items:
 *             type: object
 *     Category:
 *       type: object
 *       properties:
 *         categoryid:
 *           type: number
 *         name:
 *           type: string
 *         userId:
 *           type: number
 *         resturentid:
 *           type: number
 *         menuid:
 *           type: number
 *     MenuItem:
 *       type: object
 *       properties:
 *         menuitemid:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         regularprice:
 *           type: number
 *         mediumprice:
 *           type: number
 *         largeprice:
 *           type: number
 *         userId:
 *           type: number
 *         resturentid:
 *           type: number
 *         menuid:
 *           type: number
 *         categoryid:
 *           type: number
 *     Order:
 *       type: object
 *       properties:
 *         orderid:
 *           type: number
 *         ordernumber:
 *           type: number
 *         date:
 *           type: string
 *           format: date-time
 *         payment:
 *           type: string
 *         paymentMethod:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         orderStatus:
 *           type: string
 */

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get all menus with categories and menu items
 *     responses:
 *       200:
 *         description: A list of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */

/**
 * @swagger
 * /addResturent:
 *   post:
 *     summary: Add a new restaurant and its default menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant and menu added successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Add a new category to a menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category added successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /addMenuItem:
 *   post:
 *     summary: Add a new menu item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create new orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orders:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Order'
 *               payment:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Orders created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get details of a specific order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}/payment-status:
 *   put:
 *     summary: Update the payment status of an order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Payment status updated
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}/orderStatusOngoing:
 *   put:
 *     summary: Update the order status to "On Going"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}/orderStatusComplete:
 *   put:
 *     summary: Update the order status to "Complete"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for restaurants by name
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query (restaurant name)
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Server error
 */

app.listen(5001);
