-- Tabel Products
CREATE TABLE Products (
  Product_id INT PRIMARY KEY,
  Product_name VARCHAR(50),
  Category VARCHAR(50),
  Price DECIMAL(10, 2)
);
-- Tabel Inventory (relasi ke Products)
CREATE TABLE Inventory (
  Inventory_id INT PRIMARY KEY,
  Product_id INT,
  Quantity INT,
  Location VARCHAR(50),
  FOREIGN KEY (Product_id) REFERENCES Products(Product_id)
);
-- Tabel Orders
CREATE TABLE Orders (
  Order_id INT PRIMARY KEY,
  Customer_id INT,
  Order_date DATE
);
-- Tabel OrderDetails (relasi ke Orders dan Products)
CREATE TABLE OrderDetails (
  Order_detail_id INT PRIMARY KEY,
  Order_id INT,
  Product_id INT,
  Qty INT,
  FOREIGN KEY (Order_id) REFERENCES Orders(Order_id),
  FOREIGN KEY (Product_id) REFERENCES Products(Product_id)
);
-- Masukkan data berikut ke dalam tabel Products:
-- (1, 'Laptop', 'Elektronik', 999,99)
-- (2, 'Meja Kursi', 'Perabot', 199,99)
-- (3, 'Printer', 'Elektronik', 299,99)
-- (4, 'Rak Buku', 'Perabot', 149,99)
INSERT INTO Products
VALUES (1, 'Laptop', 'Elektronik', 999.99);
INSERT INTO Products
VALUES (2, 'Meja Kursi', 'Perabot', 199.99);
INSERT INTO Products
VALUES (3, 'Printer', 'Elektronik', 299.99);
INSERT INTO Products
VALUES (4, 'Rak Buku', 'Perabot', 149.99);
-- Masukkan data berikut ke dalam tabel Inventaris:
-- (1, 1, 50, 'Gudang A')
-- (2, 2, 30, 'Gudang B')
-- (3, 3, 20, 'Gudang A')
-- (4, 4, 40, 'Gudang B')
INSERT INTO Inventory
VALUES (1, 1, 50, 'Gudang A');
INSERT INTO Inventory
VALUES (2, 2, 30, 'Gudang B');
INSERT INTO Inventory
VALUES (3, 3, 20, 'Gudang A');
INSERT INTO Inventory
VALUES (4, 4, 40, 'Gudang B');
-- Masukkan data berikut ke dalam tabel Orders:
-- Orders: (1, 101, '2024-08-12'), (2, 102, '2024-08-13')
-- OrderDetails: (1, 1, 1, 2), (2, 1, 3, 1), (3, 2, 2, 1), (4, 2, 4, 2)
INSERT INTO Orders
VALUES (1, 101, '2024-08-12');
INSERT INTO Orders
VALUES (2, 102, '2024-08-13');
INSERT INTO OrderDetails
VALUES (1, 1, 1, 2);
INSERT INTO OrderDetails
VALUES (2, 1, 3, 1);
INSERT INTO OrderDetails
VALUES (3, 2, 2, 1);
INSERT INTO OrderDetails
VALUES (4, 2, 4, 2);