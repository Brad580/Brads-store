use('mongodbVSCodePlaygroundDB');

db.carts.insertMany([
  { 
    userId: ObjectId('507f191e810c19729de860ea'), 
    products: [
      { productId: ObjectId('507f191e810c19729de860eb'), quantity: 2, price: 10 },
      { productId: ObjectId('507f191e810c19729de860ec'), quantity: 1, price: 20 }
    ]
    // Removed the date field
  },
  { 
    userId: ObjectId('507f191e810c19729de860ed'),
    products: [ 
      { productId: ObjectId('507f191e810c19729de860ee'), quantity: 10, price: 5 },
      { productId: ObjectId('507f191e810c19729de860ef'), quantity: 2, price: 7.5 }
    ]
  }
]);

db.carts.updateOne(
  { userId: ObjectId('507f191e810c19729de860ea'), 'products.productId': ObjectId('507f191e810c19729de860eb') },
  { $set: { 'products.$.quantity': 10 } } 
);

db.carts.updateOne(
  { userId: ObjectId('507f191e810c19729de860ea') },
  { $pull: { products: { productId: ObjectId('507f191e810c19729de860ec') } } } // Remove the item
);

const cartValue = db.carts.aggregate([
  { $match: { userId: ObjectId('507f191e810c19729de860ea') } },
  { $unwind: '$products' },
  { $group: {
    _id: '$userId',
    totalValue: { $sum: { $multiply: ['$products.price', '$products.quantity'] } }
  }}
]).toArray();

print("Total cart value for user1:");
printjson(cartValue);
