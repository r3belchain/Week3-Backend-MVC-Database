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
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("Connection failed:", err);
  }
}




    //     Masukkan data berikut ke dalam Colections Products dengan isi data (_id, product_name, category, price) :

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




async function createProductsCollection() {
  try {

    const productsCollection = db.collection("Products");

    const existingProducts = await productsCollection.find().toArray();
    if (existingProducts.length > 0) {
      console.log("Products collection already exists. Skipping insertion.");
      return;
    }

    const result = await productsCollection.insertMany(sampleProducts);
    console.log(`${result.insertedCount} products ditambahkan!`); 
  } catch (err) {
    console.error("Error inserting products:", err);
  }
}

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

(async () => {
  try {
    await run();
    await createProductsCollection();
    await getAllProducts();
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  } finally {
    await client.close();
  }
})();
