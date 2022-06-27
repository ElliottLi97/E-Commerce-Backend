const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
      const categoryData = await Category.findAll({
        include: [        
          {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          }
        ]  
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//TODO
router.get('/:id',  async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [
        {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const locationData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }  
});


//TODO
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const locationData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
//done