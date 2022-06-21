const Category = require('./Category')
const Product = require('./Product')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')

Product.belongsTo(Category,{
    foreignKey: 'category_id',
})

Category.hasMany(Product,{
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
})

Product.belongsToMany(Tag,{
    through:{
        model: ProductTag,
        unique: false
    },
    as: 'product_id' //thing1
})

Tag.belongsToMany(Product,{
    through:{
        model: ProductTag,
        unique: false
    },
    as: 'tag_id' //thing2
})

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
  };
  