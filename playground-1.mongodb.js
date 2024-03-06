// Use the 'mongodbVSCodePlaygroundDB' database
use('mongodbVSCodePlaygroundDB');

// Insert sample cart documents into the 'carts' collection
db.getCollection('carts').insertMany([
  { 
    userId: 'user1',
    items: [
      { itemId: 'abc', quantity: 2, price: 10 },
      { itemId: 'jkl', quantity: 1, price: 20 }
    ],
    date: new Date()
  },
  { 
    userId: 'user2',
    items: [
      { itemId: 'xyz', quantity: 10, price: 5 },
      { itemId: 'def', quantity: 2, price: 7.5 }
    ],
    date: new Date()
  }
]);

// Update the quantity of an item ('abc') in user1's cart
db.getCollection('carts').updateOne(
  { userId: 'user1', 'items.itemId': 'abc' },
  { $set: { 'items.$.quantity': 3 } } // Update quantity to 3
);

// Remove an item ('jkl') from user1's cart
db.getCollection('carts').updateOne(
  { userId: 'user1' },
  { $pull: { items: { itemId: 'jkl' } } } // Remove the item with itemId 'jkl'
);

// Aggregate to calculate total cart value for user1
const cartValue = db.getCollection('carts').aggregate([
  { $match: { userId: 'user1' } },
  { $unwind: '$items' },
  { $group: {
    _id: '$userId',
    totalValue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
  }}
]).toArray();

// Print the total cart value for user1
console.log("Total cart value for user1:");
console.log(cartValue);
