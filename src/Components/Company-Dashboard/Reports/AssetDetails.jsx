// components/AssetDetails.js
import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Badge,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const allAssetDetails = {
  cash: {
    title: "Cash Inflows",
    data: [
      { customer: "ABC Traders", amount: "$15,000", date: "2025-07-01", mode: "Cash" },
      { customer: "Retail Shop", amount: "$22,000", date: "2025-07-03", mode: "Cash" },
      { customer: "John Doe", amount: "$38,000", date: "2025-07-05", mode: "Cash" },
    ],
  },
  bank: {
    title: "Bank Transactions",
    data: [
      { customer: "TechCorp", amount: "$85,000", date: "2025-07-02", ref: "NEFT-8890", bank: "HDFC" },
      { customer: "Global Ltd", amount: "$60,000", date: "2025-07-04", ref: "IMPS-1234", bank: "SBI" },
      { customer: "Innovate Inc", amount: "$100,000", date: "2025-07-06", ref: "RTGS-5678", bank: "Axis" },
    ],
  },
  stock: {
    title: "Inventory Details",
    data: [
      { product: "Laptops", qty: 50, value: "$150,000", category: "Electronics" },
      { product: "Chairs", qty: 200, value: "$70,000", category: "Furniture" },
      { product: "Cables", qty: 1000, value: "$100,000", category: "Accessories" },
    ],
  },
  receivable: {
    title: "Outstanding Receivables",
    data: [
      { customer: "FutureTech", amount: "$95,000", due: "2025-07-15", status: "Overdue" },
      { customer: "Smart Solutions", amount: "$90,000", due: "2025-07-20", status: "Pending" },
    ],
  },
};

// 💡 Calculate total
const calculateTotal = (data, valueKey = "amount") => {
  return data
    .reduce((sum, item) => {
      const num = parseFloat(item[valueKey].replace(/[$,]/g, "")) || 0;
      return sum + num;
    }, 0)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};

const AssetDetails = () => {
  const [cashFilter, setCashFilter] = useState({ customer: "", date: "" });
  const [bankFilter, setBankFilter] = useState({ customer: "", bank: "", date: "" });
  const [stockFilter, setStockFilter] = useState({ product: "", category: "" });
  const [receivableFilter, setReceivableFilter] = useState({ customer: "", status: "", due: "" });

  const filteredCash = allAssetDetails.cash.data.filter(
    (item) =>
      item.customer.toLowerCase().includes(cashFilter.customer.toLowerCase()) &&
      (!cashFilter.date || item.date === cashFilter.date)
  );
  const filteredBank = allAssetDetails.bank.data.filter(
    (item) =>
      item.customer.toLowerCase().includes(bankFilter.customer.toLowerCase()) &&
      item.bank.toLowerCase().includes(bankFilter.bank.toLowerCase()) &&
      (!bankFilter.date || item.date === bankFilter.date)
  );
  const filteredStock = allAssetDetails.stock.data.filter(
    (item) =>
      item.product.toLowerCase().includes(stockFilter.product.toLowerCase()) &&
      item.category.toLowerCase().includes(stockFilter.category.toLowerCase())
  );
  const filteredReceivable = allAssetDetails.receivable.data.filter(
    (item) =>
      item.customer.toLowerCase().includes(receivableFilter.customer.toLowerCase()) &&
      (!receivableFilter.status || item.status === receivableFilter.status) &&
      (!receivableFilter.due || item.due === receivableFilter.due)
  );

  const totalCash = calculateTotal(filteredCash, "amount");
  const totalBank = calculateTotal(filteredBank, "amount");
  const totalStock = calculateTotal(filteredStock, "value");
  const totalReceivable = calculateTotal(filteredReceivable, "amount");

  const grandTotal = (
    parseFloat(totalCash.replace(/[$,]/g, "")) +
    parseFloat(totalBank.replace(/[$,]/g, "")) +
    parseFloat(totalStock.replace(/[$,]/g, "")) +
    parseFloat(totalReceivable.replace(/[$,]/g, ""))
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #dbe9f4, #f7f9fb)",
        minHeight: "100vh",
        paddingBottom: 60,
        transition: "all 0.4s ease",
      }}
    >
      <Container className="py-5">
        {/* Header */}
        <Row className="align-items-center mb-4">
          <Col xs={6} className="text-start">
            <h3
              className="mb-0"
              style={{
                color: "#002d4d",
                fontWeight: 700,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              📊 All Asset Details
            </h3>
          </Col>
          <Col xs={6} className="text-end">
            <Button
              variant="secondary"
              onClick={() => window.history.back()}
              style={{
                background: "linear-gradient(135deg, #4ac7b3, #3a9d88)",
                border: "none",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "10px",
                color: "#fff",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 5px 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 3px 8px rgba(0,0,0,0.15)";
              }}
            >
              ← Back to Balance Sheet
            </Button>
          </Col>
        </Row>

        {/* Dynamic Section Component for Each Asset */}
        <AssetCard
          title={allAssetDetails.cash.title}
          bgGradient="linear-gradient(135deg,#a8edea,#fed6e3)"
          data={filteredCash}
          filters={[
            {
              type: "text",
              placeholder: "Search Customer",
              value: cashFilter.customer,
              onChange: (v) => setCashFilter({ ...cashFilter, customer: v }),
            },
            {
              type: "date",
              value: cashFilter.date,
              onChange: (v) => setCashFilter({ ...cashFilter, date: v }),
            },
          ]}
          onClear={() => setCashFilter({ customer: "", date: "" })}
          columns={["Customer", "Amount", "Date", "Mode"]}
          renderRow={(row) => [row.customer, row.amount, row.date, row.mode]}
          total={totalCash}
        />

        <AssetCard
          title={allAssetDetails.bank.title}
          bgGradient="linear-gradient(135deg,#d4fc79,#96e6a1)"
          data={filteredBank}
          filters={[
            {
              type: "text",
              placeholder: "Customer",
              value: bankFilter.customer,
              onChange: (v) => setBankFilter({ ...bankFilter, customer: v }),
            },
            {
              type: "text",
              placeholder: "Bank",
              value: bankFilter.bank,
              onChange: (v) => setBankFilter({ ...bankFilter, bank: v }),
            },
            {
              type: "date",
              value: bankFilter.date,
              onChange: (v) => setBankFilter({ ...bankFilter, date: v }),
            },
          ]}
          onClear={() => setBankFilter({ customer: "", bank: "", date: "" })}
          columns={["Customer", "Amount", "Date", "Ref", "Bank"]}
          renderRow={(row) => [
            row.customer,
            row.amount,
            row.date,
            row.ref,
            row.bank,
          ]}
          total={totalBank}
        />

        <AssetCard
          title={allAssetDetails.stock.title}
          bgGradient="linear-gradient(135deg,#cfd9df,#e2ebf0)"
          data={filteredStock}
          filters={[
            {
              type: "text",
              placeholder: "Search Product",
              value: stockFilter.product,
              onChange: (v) => setStockFilter({ ...stockFilter, product: v }),
            },
            {
              type: "select",
              value: stockFilter.category,
              onChange: (v) => setStockFilter({ ...stockFilter, category: v }),
              options: ["All Categories", "Electronics", "Furniture", "Accessories"],
            },
          ]}
          onClear={() => setStockFilter({ product: "", category: "" })}
          columns={["Product", "Qty", "Value", "Category"]}
          renderRow={(row) => [row.product, row.qty, row.value, row.category]}
          total={totalStock}
        />

        <AssetCard
          title={allAssetDetails.receivable.title}
          bgGradient="linear-gradient(135deg,#f6d365,#fda085)"
          data={filteredReceivable}
          filters={[
            {
              type: "text",
              placeholder: "Customer",
              value: receivableFilter.customer,
              onChange: (v) =>
                setReceivableFilter({ ...receivableFilter, customer: v }),
            },
            {
              type: "select",
              value: receivableFilter.status,
              onChange: (v) =>
                setReceivableFilter({ ...receivableFilter, status: v }),
              options: ["All Status", "Overdue", "Pending"],
            },
            {
              type: "date",
              value: receivableFilter.due,
              onChange: (v) => setReceivableFilter({ ...receivableFilter, due: v }),
            },
          ]}
          onClear={() =>
            setReceivableFilter({ customer: "", status: "", due: "" })
          }
          columns={["Customer", "Amount", "Due Date", "Status"]}
          renderRow={(row) => [
            row.customer,
            row.amount,
            row.due,
            <Badge bg={row.status === "Overdue" ? "danger" : "warning"}>
              {row.status}
            </Badge>,
          ]}
          total={totalReceivable}
        />

        {/* Grand Total */}
        <Card
          style={{
            borderRadius: 16,
            background: "linear-gradient(135deg,#89f7fe,#66a6ff)",
            color: "#003049",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            transform: "scale(1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
          className="text-center p-3 mb-4"
        >
          <h5 style={{ fontWeight: 700 }}>
            Grand Total of All Assets: <strong>{grandTotal}</strong>
          </h5>
        </Card>
      </Container>
    </div>
  );
};

// 🔹 Reusable Asset Section
const AssetCard = ({
  title,
  bgGradient,
  data,
  filters,
  onClear,
  columns,
  renderRow,
  total,
}) => (
  <Card
    className="mb-4"
    style={{
      borderRadius: 18,
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(255,255,255,0.4)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: "all 0.35s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    }}
  >
    <Card.Header
      style={{
        background: bgGradient,
        color: "#003049",
        fontWeight: 700,
        fontSize: 18,
        borderRadius: "18px 18px 0 0",
      }}
    >
      {title}
    </Card.Header>
    <Card.Body>
      {/* Filters */}
      <Row className="mb-3 g-2">
        {filters.map((f, i) => (
          <Col key={i} xs={12} md={Math.floor(12 / (filters.length + 1))}>
            {f.type === "text" && (
              <Form.Control
                type="text"
                placeholder={f.placeholder}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
              />
            )}
            {f.type === "select" && (
              <Form.Select
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
              >
                {f.options.map((o, i) => (
                  <option key={i} value={o === "All Categories" || o === "All Status" ? "" : o}>
                    {o}
                  </option>
                ))}
              </Form.Select>
            )}
            {f.type === "date" && (
              <Form.Control
                type="date"
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
              />
            )}
          </Col>
        ))}
        <Col xs={12} md={1}>
          <Button variant="outline-secondary" size="sm" onClick={onClear}>
            🗑️
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <div className="table-responsive">
        <Table striped hover bordered>
          <thead className="table-light text-black">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {renderRow(row).map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
            <tr className="table-light font-weight-bold">
              <td colSpan={columns.length - 1}>
                <strong>Total</strong>
              </td>
              <td className="text-end">
                <strong>{total}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Card.Body>
  </Card>
);

export default AssetDetails;
