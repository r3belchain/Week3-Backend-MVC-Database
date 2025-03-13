-- Tulis query untuk menampilkan semua produk beserta nama dan harganya, diurutkan berdasarkan harga dalam urutan menurun.
SELECT P.Product_name, P.Price 
FROM Products P 
ORDER BY P.Price DESC;



-- Tulis Query untuk menggabungkan tabel Produk dan Inventaris, yang menampilkan nama produk, kuantitas, dan lokasi untuk semua produk.
SELECT P.Product_name, I.Quantity, I.Location 
FROM Products P 
JOIN Inventory I ON P.Product_id = I.Product_id;



-- Perbarui harga 'Laptop' menjadi 1099,99.
UPDATE Products 
SET Price = 1099.99 
WHERE Product_name = 'Laptop';




-- Tuliskan kueri untuk menghitung nilai total inventaris pada setiap gudang.
SELECT I.Location, SUM(I.Quantity * P.Price) AS Total_Value
FROM Inventory I
JOIN Products P ON I.Product_id = P.Product_id
GROUP BY I.Location;



-- Tulis Query untuk menampilkan jumlah total untuk setiap pesanan, termasuk order_id, order_date, dan total_amount.
SELECT O.Order_id, O.Order_date, SUM(D.Quantity * P.Price) AS Total_amount
FROM Orders O
    JOIN OrderDetails D ON O.Order_id = D.Order_id
    JOIN Products P ON D.Product_id = P.Product_id
    GROUP BY O.Order_id, O.Order_date;




-- Tulis kueri untuk mencari produk yang belum pernah dipesan.
SELECT P.Product_name
FROM Products P
LEFT JOIN OrderDetails D ON P.Product_id = D.Product_id
WHERE D.Product_id IS NULL;



-- Buat tampilan yang menunjukkan tingkat stok saat ini untuk semua produk, termasuk nama_produk, jumlah, dan lokasi.
CREATE OR REPLACE VIEW CurrentStock AS
SELECT P.Product_name, I.Quantity, I.Location
FROM Products P
    JOIN Inventory I ON P.Product_id = I.Product_id;

SELECT * FROM CurrentStock;