const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://rebelchain:TqGAAMqg9VchM6ci@cluster0.fnzo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("warehouseDB");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connectionx`
    await client.db("admin").command({ ping: 1 });
    console.log("Koneksi ke mongoDB berhasil dilakukan");
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

//* Membuat Collection Products
async function createProductsCollection() {
  try {
    const productsCollection = db.collection("Products");

    const existingProducts = await productsCollection.find().toArray();
    if (existingProducts.length > 0) {
      console.log("Koleksi Products sudah ada. Lewati pemrosesan!");
      return;
    }

    const result = await productsCollection.insertMany(sampleProducts);
    console.log(`${result.insertedCount} products ditambahkan!`);
  } catch (err) {
    console.error("Gagal menambah produk.", err);
  }
}

// *    Masukkan data berikut ke dalam Colections Products dengan isi data (_id, product_name, category, price) :

// (1, 'Laptop', 'Elektronik', 999,99)
// (2, 'Meja Kursi', 'Perabot', 199,99)
// (3, 'Printer', 'Elektronik', 299,99)
// (4, 'Rak Buku', 'Perabot', 149,99)

const sampleProducts = [
  { _id: 1, product_name: "Laptop", category: "Elektronik", price: 999.99 },
  {
    _id: 2,
    product_name: "Meja Kursi",
    category: "Perabot",
    price: 199.99,
  },
  {
    _id: 3,
    product_name: "Printer",
    category: "Elektronik",
    price: 299.99,
  },
  { _id: 4, product_name: "Rak Buku", category: "Perabot", price: 149.99 },
];

// * Tulis query untuk menampilkan semua produk beserta nama dan harganya, diurutkan berdasarkan harga dalam urutan menaik (Asceding).
async function getAllProducts() {
  try {
    const productsCollection = db.collection("Products");

    //* Query untuk menampilkan semua produk hanya dengan product_name dan price
    const products = await productsCollection
      .find({}, { projection: { _id: 0, product_name: 1, price: -1 } })
      .sort({ price: 1 })
      .toArray();

    console.log("Daftar Produk:");
    products.forEach((product) => {
      console.log(`Nama: ${product.product_name}, Harga: ${product.price}`);
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}









//* Membuat Collection Inventory

async function createInventoryCollection() {
  try {
    const inventoryCollection = db.collection("Inventory");

    const existingInventory = await inventoryCollection.find().toArray();
    if (existingInventory.length > 0) {
      console.log("Koleksi Inventory sudah ada. Lewati pemrosesan!");
      return;
    }

    const result = await inventoryCollection.insertMany(sampleInventory);
    console.log(`${result.insertedCount} produk ditambahkan ke Inventory!`);
  } catch (err) {
    console.error("Gagal menambah produk ke Inventory.", err);
  }
}

// * Masukkan data berikut ke dalam Colection Inventory dengan isi data (_id, product_id, quantity, location) :

// (1, 1, 50, 'Gudang A')
// (2, 2, 30, 'Gudang B')
// (3, 3, 20, 'Gudang A')
// (4, 4, 40, 'Gudang B')

const sampleInventory = [
  { _id: 1, product_id: 1, quantity: 50, location: "Gudang A" },
  { _id: 2, product_id: 2, quantity: 30, location: "Gudang B" },
  { _id: 3, product_id: 3, quantity: 20, location: "Gudang A" },
  { _id: 4, product_id: 4, quantity: 40, location: "Gudang B" },
];











// * Tulis Query untuk menggabungkan tabel (aggregate) Produk dan Inventaris, yang menampilkan nama produk, kuantitas, dan lokasi untuk semua produk. Expected output:

async function aggregateProductInventory() {
  try {
    const inventoryCollection = db.collection("Inventory");

    const viewResults = await inventoryCollection
      .aggregate([
        {
          $lookup: {
            from: "Products",
            localField: "product_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: "$productDetails",
        },
        {
          $project: {
            _id: 0,
            product_name: "$productDetails.product_name",
            quantity: 1,
            location: 1,
          },
        },
      ])
      .toArray();

    const orderedResult = viewResults.map(
      ({ product_name, quantity, location }) => ({
        product_name,
        quantity,
        location,
      })
    );

    console.log("Hasil Agregasi Produk & Inventory:");
    orderedResult.forEach(({ product_name, quantity, location }) => {
      console.log(
        `Nama Produk: ${product_name}\nJumlah: ${quantity}\nLokasi: ${location}\n`
      );
    });
  } catch (e) {
    console.error("Error aggregating product inventory:", e);
  }
}






// *Perbarui harga 'Laptop' menjadi 1099,99.
async function updateLaptopPrice() {
  try {
    const productsCollection = db.collection("Products");

    const updateResult = await productsCollection.updateOne(
      { product_name: "Laptop" },
      { $set: { price: 1099.99 } }
    );
    console.log(
      `Update harga laptop: ${updateResult.matchedCount} produk ditemukan dan ${updateResult.modifiedCount} produk berhasil diperbarui!`
    );
  } catch (e) {
    console.error("Error updating laptop price:", e);
  }
}







// * Tuliskan query untuk menghitung nilai total inventaris pada setiap gudang.
async function calculateTotalPriceByLocation() {
  try {
    const inventoryCollection = db.collection("Inventory");

    const result = await inventoryCollection
      .aggregate([
        {
          $lookup: {
            from: "Products",
            localField: "product_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: "$productDetails",
        },
        {
          $group: {
            _id: "$location",
            total_value: {
              $sum: {
                $multiply: ["$quantity", "$productDetails.price"],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            location: "$_id",
            total_value: 1,
          },
        },
      ])
      .toArray();

    console.log("Total harga berdasarkan lokasi:");
    result.forEach(({ location, total_value }) => {
      console.log(`Lokasi: ${location}, Total Harga: ${total_value}`);
    });
  } catch (e) {
    console.error("Error calculating total price by location:", e);
  }
}















// * membuat Orders Collection
async function createOrdersColllection() {
  try {
    const ordersCollection = db.collection("Orders");
    const existingOrdersCollection = await ordersCollection.find().toArray();
    if (existingOrdersCollection.length > 0) {
      console.log("Koleksi Products sudah ada. Lewati pemrosesan!");
      return;
    }

    const result = await ordersCollection.insertMany(ordersCollectionData);
    console.log(`${result.insertedCount} orders ditambahkan ke Orders!`);
  } catch (e) {
    console.error("Gagal menambah orders ke Orders.", e);
  }
}

// * Masukkan data berikut ke dalam Colection Orders :
// {
//   _id: 1,
//   customer_id: 101,
//   order_date: ISODate("2024-08-12"),
//   order_details: [
//     { product_id: 1, quantity: 2 },
//     { product_id: 3, quantity: 1 }
//   ]
// },
// {
//   _id: 2,
//   customer_id: 102,
//   order_date: ISODate("2024-08-13"),
//   order_details: [
//     { product_id: 2, quantity: 1 },
//     { product_id: 4, quantity: 2 }
//   ]
// }
const ordersCollectionData = [
  {
    _id: 1,
    customer_id: 101,
    order_date: new Date("2024-08-12"),
    order_details: [
      { product_id: 1, quantity: 2 },
      { product_id: 3, quantity: 1 },
    ],
  },
  {
    _id: 2,
    customer_id: 102,
    order_date: new Date("2024-08-13"),
    order_details: [
      { product_id: 2, quantity: 1 },
      { product_id: 4, quantity: 2 },
    ],
  },
];








//  * Tulis Query untuk menampilkan jumlah total untuk setiap pesanan, termasuk order_id, order_date, dan total_amount.

async function viewOrderDetails() {
  try {
    const ordersCollection = db.collection("Orders");

    const result = await ordersCollection
      .aggregate([
        {
          $unwind: "$order_details", // Buka array order_details
        },
        {
          $lookup: {
            from: "Products", // Gabung dengan koleksi Products
            localField: "order_details.product_id",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo", // Buka hasil lookup
        },
        {
          $project: {
            order_id: "$_id",
            order_date: 1,
            total_amount: {
              $multiply: ["$order_details.quantity", "$productInfo.price"],
            },
          },
        },
        {
          $group: {
            _id: "$_id", // Group berdasarkan order_id
            order_date: { $first: "$order_date" },
            total_amount: { $sum: "$total_amount" },
          },
        },
        {
          $project: {
            _id: 0,
            order_id: "$_id",
            order_date: 1,
            total_amount: 1,
          },
        },
      ])
      .toArray();

    console.log(result);
  } catch (e) {
    console.error("Error view order details:", e);
  }
}








// * Tulis query untuk mencari produk yang belum pernah dipesan.
async function getUnorderedProducts() {
  try {
    const productsCollection = db.collection("Products");

    const result = await productsCollection
      .aggregate([
        {
          $lookup: {
            from: "Orders",
            localField: "_id",
            foreignField: "order_details.product_id",
            as: "orderInfo",
          },
        },
        {
          $match: {
            orderInfo: { $size: 0 }, 
          },
        },
        {
          $project: {
            _id: 0,
            product_id: "$_id",
            product_name: 1,
          },
        },
      ])
      .toArray();

      console.log(result);
  } catch (e) {
    console.error("Error get unordered products:", e);
  }
}

(async () => {
  try {
    await run();
    await createProductsCollection();
    await getAllProducts();
    await createInventoryCollection();
    await aggregateProductInventory();
    await updateLaptopPrice();
    await calculateTotalPriceByLocation();
    await createOrdersColllection();
    await viewOrderDetails();
    await getUnorderedProducts();
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  } finally {
    await client.close();
  }
})();
