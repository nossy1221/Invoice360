import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewProduct = () => {
  const { id } = useParams();
  
  // Static product data instead of API fetch
  const [products] = useState([
    {
      _id: "1",
      name: "Laptop",
      brand: "TechBrand",
      category: "Electronics",
      sku: "LP12345",
      warranty: "1 Year",
      warrantyPeriod: 12,
      description: "High-performance laptop with 16GB RAM and 512GB SSD",
      images: ["https://example.com/laptop.jpg"]
    },
    {
      _id: "2",
      name: "Smartphone",
      brand: "PhoneCorp",
      category: "Electronics",
      sku: "SP67890",
      warranty: "2 Years",
      warrantyPeriod: 24,
      description: "Latest smartphone with advanced camera features",
      images: ["https://example.com/phone.jpg"]
    },
    {
      _id: "3",
      name: "Office Chair",
      brand: "ComfortSeating",
      category: "Furniture",
      sku: "OC54321",
      warranty: "3 Years",
      warrantyPeriod: 36,
      description: "Ergonomic office chair with lumbar support",
      images: ["https://example.com/chair.jpg"]
    },
    {
      _id: "4",
      name: "Desk Lamp",
      brand: "LightWorks",
      category: "Furniture",
      sku: "DL98765",
      warranty: "1 Year",
      warrantyPeriod: 12,
      description: "LED desk lamp with adjustable brightness",
      images: ["https://example.com/lamp.jpg"]
    }
  ]);

  const product = products?.find((item) => item._id === id);

  if (!products || products.length === 0)
    return <p className="text-danger text-center">No products available</p>;
  if (!product)
    return <p className="text-warning text-center">Product not found</p>;

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Product Detail</h4>
        <Link to="/products">
          <button className="btn btn-primary">⬅ Back</button>
        </Link>
      </div>

      <div className="card shadow-lg">
        <div className="card-body">
          {/* Product Title */}
          <h2 className="card-title text-center">{product.name || "N/A"}</h2>

          {/* Product Image & Details */}
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "200px" }}
                />
              ) : (
                <p className="text-muted">No Image Available</p>
              )}
            </div>
            <div className="col-md-8">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Brand</th>
                    <td>{product.brand || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{product.category || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>SKU</th>
                    <td>{product.sku || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Warranty</th>
                    <td>
                      {product.warranty
                        ? `${product.warranty} (${product.warrantyPeriod || 0} months)`
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{product.description || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;