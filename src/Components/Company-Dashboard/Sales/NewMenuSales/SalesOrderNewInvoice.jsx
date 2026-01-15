import React, { useState, useMemo } from 'react';
import { Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";

import SalesOrderNewTab from './SalesOrderNewTab';

const statusBadge = (status) => {
  const variant = status === 'Done' ? 'success' : status === 'Pending' ? 'secondary' : 'warning';
  return <Badge bg={variant}>{status}</Badge>;
};

// Static data to replace API response
const staticQuotations = [
  {
    id: 1,
    quotation_no: 'QTN-001',
    customer_name: 'ABC Corporation',
    quotation_date: '2023-05-15',
    grand_total: 1250.00,
    items: [
      { id: 1, amount: 750.00 },
      { id: 2, amount: 500.00 }
    ]
  },
  {
    id: 2,
    quotation_no: 'QTN-002',
    customer_name: 'XYZ Industries',
    quotation_date: '2023-06-20',
    grand_total: 2100.50,
    items: [
      { id: 1, amount: 1500.00 },
      { id: 2, amount: 600.50 }
    ]
  },
  {
    id: 3,
    quotation_no: 'QTN-003',
    customer_name: 'Global Solutions',
    quotation_date: '2023-07-10',
    grand_total: 875.25,
    items: [
      { id: 1, amount: 400.00 },
      { id: 2, amount: 475.25 }
    ]
  }
];

const SalesOrderNewInvoice = () => {
  const [orders, setOrders] = useState([]);
  const [stepModal, setStepModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filters
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [invoiceNoFilter, setInvoiceNoFilter] = useState('');
  const [quotationStatusFilter, setQuotationStatusFilter] = useState('');
  const [salesOrderStatusFilter, setSalesOrderStatusFilter] = useState('');
  const [deliveryChallanStatusFilter, setDeliveryChallanStatusFilter] = useState('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');

  // Initialize with static data
  useState(() => {
    const mappedOrders = staticQuotations.map(quotation => {
      // Determine statuses based on presence of data
      const hasQuotation = !!quotation.quotation_no;
      const hasSalesOrder = false;
      const hasDeliveryChallan = false;
      const hasInvoice = false;
      const hasPayment = false;

      return {
        id: quotation.id,
        orderNo: quotation.id,
        vendor: quotation.customer_name || 'Unknown Customer',
        date: quotation.quotation_date || '-',
        amount: quotation.grand_total 
          ? `R ${parseFloat(quotation.grand_total).toFixed(2)}`
          : `R ${quotation.items?.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)}`,
        
        // Original data for editing
        originalQuotation: quotation,

        // Statuses
        quotationStatus: hasQuotation ? 'Done' : 'Pending',
        salesOrderStatus: hasSalesOrder ? 'Done' : 'Pending',
        deliveryChallanStatus: hasDeliveryChallan ? 'Done' : 'Pending',
        invoiceStatus: hasInvoice ? 'Done' : 'Pending',
        paymentStatus: hasPayment ? 'Done' : 'Pending',
        
        // Draft step (start from quotation)
        draftStep: 'quotation',
      };
    });

    setOrders(mappedOrders);
  });

  const handleCreateNewInvoice = (order = null) => {
    setSelectedOrder(order);
    setStepModal(true);
  };

  const handleCloseModal = () => {
    setStepModal(false);
    setSelectedOrder(null);
  };

  const handleFormSubmit = (formData, lastStep = 'quotation') => {
    const isEdit = selectedOrder?.id;
    
    const newOrder = {
      id: isEdit ? selectedOrder.id : Date.now(),
      orderNo: isEdit ? selectedOrder.orderNo : (orders.length ? Math.max(...orders.map(o => o.orderNo)) + 1 : 2045),
      vendor: formData.quotation?.customer || selectedOrder?.vendor || 'Unknown',
      date: new Date().toISOString().split('T')[0],
      amount: `R ${formData.payment?.amount ? parseFloat(formData.payment.amount).toFixed(2) : '0.00'}`,
      quotation: formData.quotation,
      salesOrder: formData.salesOrder,
      deliveryChallan: formData.deliveryChallan,
      invoice: formData.invoice,
      payment: formData.payment,
      quotationStatus: formData.quotation?.quotationNo ? 'Done' : 'Pending',
      salesOrderStatus: formData.salesOrder?.orderNo ? 'Done' : 'Pending',
      deliveryChallanStatus: formData.deliveryChallan?.challanNo ? 'Done' : 'Pending',
      invoiceStatus: formData.invoice?.invoiceNo ? 'Done' : 'Pending',
      paymentStatus: formData.payment?.amount ? 'Done' : 'Pending',
      draftStep: lastStep,
    };

    setOrders(prev =>
      isEdit
        ? prev.map(o => (o.id === selectedOrder.id ? { ...o, ...newOrder } : o))
        : [newOrder, ...prev]
    );

    handleCloseModal();
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Date Filter
      const orderDate = new Date(order.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      const dateMatch = (!from || orderDate >= from) && (!to || orderDate <= to);

      // Invoice No Filter
      const invoiceNoMatch =
        !invoiceNoFilter ||
        (order.invoice?.invoiceNo &&
          order.invoice.invoiceNo.toLowerCase().startsWith(invoiceNoFilter.toLowerCase()));

      // Individual Status Filters
      const matchesQuotation = !quotationStatusFilter || order.quotationStatus === quotationStatusFilter;
      const matchesSalesOrder = !salesOrderStatusFilter || order.salesOrderStatus === salesOrderStatusFilter;
      const matchesDeliveryChallan = !deliveryChallanStatusFilter || order.deliveryChallanStatus === deliveryChallanStatusFilter;
      const matchesInvoice = !invoiceStatusFilter || order.invoiceStatus === invoiceStatusFilter;
      const matchesPayment = !paymentStatusFilter || order.paymentStatus === paymentStatusFilter;

      return (
        dateMatch &&
        invoiceNoMatch &&
        matchesQuotation &&
        matchesSalesOrder &&
        matchesDeliveryChallan &&
        matchesInvoice &&
        matchesPayment
      );
    });
  }, [
    orders,
    fromDate,
    toDate,
    invoiceNoFilter,
    quotationStatusFilter,
    salesOrderStatusFilter,
    deliveryChallanStatusFilter,
    invoiceStatusFilter,
    paymentStatusFilter,
  ]);

  return (
    <div className="p-4">
      <div className="p-4 d-flex align-items-center justify-content-between">
  {/* Left: Back arrow + title */}
  <div className="d-flex align-items-center gap-2">
    <FaArrowLeft size={20} color="blue" />
    <h5 className="mb-0">Sales Workflow</h5>
  </div>

  {/* Right: Button */}
  <Button 
    variant="primary" 
    onClick={() => handleCreateNewInvoice()} 
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: "#53b2a5",
      border: "none",
      padding: "8px 16px"
    }}
  >
    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>+</span> Create sales order
  </Button>
</div>


      {/* Top Filter Section */}
      <div className="mb-2 p-3 bg-light rounded d-flex flex-wrap gap-3 align-items-end">
        <div>
          <label className="form-label text-secondary">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label text-secondary">To Date</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label text-secondary">Invoice No. (INV...)</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. INV-123"
            value={invoiceNoFilter}
            onChange={(e) => setInvoiceNoFilter(e.target.value)}
            style={{ minWidth: "150px" }}
          />
        </div>

        {/* Quotation Status */}
        {/* <div>
          <label className="form-label text-secondary">Quotation</label>
          <Form.Select
            value={quotationStatusFilter}
            onChange={(e) => setQuotationStatusFilter(e.target.value)}
            style={{ minWidth: "130px" }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </div> */}

        {/* Sales Order */}
        <div>
          <label className="form-label text-secondary">Sales Order</label>
          <Form.Select
            value={salesOrderStatusFilter}
            onChange={(e) => setSalesOrderStatusFilter(e.target.value)}
            style={{ minWidth: "130px" }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </div>

        {/* Delivery Challan */}
        {/* <div>
          <label className="form-label text-secondary">Delivery Challan</label>
          <Form.Select
            value={deliveryChallanStatusFilter}
            onChange={(e) => setDeliveryChallanStatusFilter(e.target.value)}
            style={{ minWidth: "130px" }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </div> */}

        {/* Invoice */}
        {/* <div>
          <label className="form-label text-secondary">Invoice</label>
          <Form.Select
            value={invoiceStatusFilter}
            onChange={(e) => setInvoiceStatusFilter(e.target.value)}
            style={{ minWidth: "130px" }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </div> */}

        {/* Payment */}
        {/* <div>
          <label className="form-label text-secondary">Payment</label>
          <Form.Select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            style={{ minWidth: "130px" }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </div> */}

        {/* Clear Button */}
        <Button
          variant="secondary"
          onClick={() => {
            setFromDate('');
            setToDate('');
            setInvoiceNoFilter('');
            setQuotationStatusFilter('');
            setSalesOrderStatusFilter('');
            setDeliveryChallanStatusFilter('');
            setInvoiceStatusFilter('');
            setPaymentStatusFilter('');
          }}
          style={{ height: "fit-content" }}
        >
          Clear
        </Button>
      </div>

      <Table bordered hover responsive className="text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            {/* <th>Quotation</th> */}
            <th>Sales Order</th>
            {/* <th>Delivery Challan</th>
            <th>Invoice</th>
            <th>Payment</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center text-muted">
                No quotations found.
              </td>
            </tr>
          ) : (
            filteredOrders.map((order, idx) => (
              <tr key={order.id}>
                <td>{idx + 1}</td>
                <td>{order.invoice?.invoiceNo || '-'}</td>
                <td>{order.vendor}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                {/* <td>{statusBadge(order.quotationStatus)}</td> */}
                <td>{statusBadge(order.salesOrderStatus)}</td>
                {/* <td>{statusBadge(order.deliveryChallanStatus)}</td>
                <td>{statusBadge(order.invoiceStatus)}</td>
                <td>{statusBadge(order.paymentStatus)}</td> */}
                <td>
                  <Button
                    size="sm"
                    className="me-1 mb-1"
                    variant="outline-primary"
                    onClick={() => handleCreateNewInvoice(order)}
                  >
                    Continue
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {stepModal && (
  <Modal show={stepModal} onHide={handleCloseModal} size="xl" centered>
    <Modal.Header closeButton>
      <Modal.Title>
        {selectedOrder ? 'Continue Sales Workflow' : 'Create Sales Order'}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
   




        <SalesOrderNewTab         key={selectedOrder?.id || 'new'} // force remount on different order
        initialData={selectedOrder}
        initialStep={selectedOrder?.draftStep || 0}
        onSubmit={handleFormSubmit}/>
    </Modal.Body>
  </Modal>
)}

    </div>
  );
};

export default SalesOrderNewInvoice;