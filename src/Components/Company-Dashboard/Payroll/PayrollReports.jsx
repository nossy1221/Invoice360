import React, { useState } from 'react';
import {
    Tabs,
    Tab,
    Table,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownButton,
    Form,
    Row,
    Col,
    Card,
    Modal
} from 'react-bootstrap';
import {
    FaFilePdf,
    FaFileExcel,
    FaFileCsv,
    FaFilter,
    FaPrint,
    FaChartBar,
    FaChartPie,
    FaEye,
    FaSearch
} from 'react-icons/fa';

const PayrollReports = () => {
    const [key, setKey] = useState('monthly');
    const [selectedMonth, setSelectedMonth] = useState('Oct 2025');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [searchEmployee, setSearchEmployee] = useState('');
    
    // Modal states
    const [showMonthlyModal, setShowMonthlyModal] = useState(false);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [selectedMonthlyData, setSelectedMonthlyData] = useState(null);
    const [selectedDepartmentData, setSelectedDepartmentData] = useState(null);

    // Sample data
    const monthlyData = [
        { month: 'Oct 2025', totalEmployees: 25, grossPay: 'R8,50,000', deductions: 'R85,000', netPay: 'R7,65,000' },
        { month: 'Sep 2025', totalEmployees: 24, grossPay: 'R8,20,000', deductions: 'R82,000', netPay: 'R7,38,000' },
        { month: 'Aug 2025', totalEmployees: 24, grossPay: 'R8,30,000', deductions: 'R83,000', netPay: 'R7,47,000' },
    ];

    const departmentData = [
        { department: 'Sales', employees: 5, totalSalary: 'R2,00,000', avgSalary: 'R40,000' },
        { department: 'Marketing', employees: 4, totalSalary: 'R1,80,000', avgSalary: 'R45,000' },
        { department: 'IT', employees: 8, totalSalary: 'R3,20,000', avgSalary: 'R40,000' },
        { department: 'HR', employees: 3, totalSalary: 'R1,20,000', avgSalary: 'R40,000' },
        { department: 'Finance', employees: 5, totalSalary: 'R2,30,000', avgSalary: 'R46,000' },
    ];

    const employeeHistoryData = [
        { employee: 'John Doe', month: 'Oct 2025', grossPay: 'R45,000', deductions: 'R4,500', netPay: 'R40,500', status: 'Paid' },
        { employee: 'Jane Smith', month: 'Oct 2025', grossPay: 'R42,000', deductions: 'R4,200', netPay: 'R37,800', status: 'Paid' },
        { employee: 'Robert Johnson', month: 'Oct 2025', grossPay: 'R50,000', deductions: 'R5,000', netPay: 'R45,000', status: 'Paid' },
        { employee: 'Emily Davis', month: 'Oct 2025', grossPay: 'R38,000', deductions: 'R3,800', netPay: 'R34,200', status: 'Pending' },
        { employee: 'Michael Wilson', month: 'Oct 2025', grossPay: 'R48,000', deductions: 'R4,800', netPay: 'R43,200', status: 'Paid' },
    ];

    const taxDeductionData = [
        { month: 'Oct 2025', tax: 'R50,000', pf: 'R25,000', insurance: 'R7,000', other: 'R3,000', totalDeductions: 'R85,000' },
        { month: 'Sep 2025', tax: 'R48,000', pf: 'R24,000', insurance: 'R7,000', other: 'R3,000', totalDeductions: 'R82,000' },
        { month: 'Aug 2025', tax: 'R49,000', pf: 'R24,500', insurance: 'R7,000', other: 'R2,500', totalDeductions: 'R83,000' },
    ];

    const months = ['Oct 2025', 'Sep 2025', 'Aug 2025', 'Jul 2025', 'Jun 2025'];
    const departments = ['All', 'Sales', 'Marketing', 'IT', 'HR', 'Finance'];

    // Functions to handle modal opening
    const handleMonthlyView = (data) => {
        setSelectedMonthlyData(data);
        setShowMonthlyModal(true);
    };

    const handleDepartmentView = (data) => {
        setSelectedDepartmentData(data);
        setShowDepartmentModal(true);
    };

    return (
        <div className="container-fluid px-3 px-md-4 py-4">
            <h2 className="mb-4 text-center text-md-start">Payroll Reports</h2>

            <Card className="mb-4">
                <Card.Body>
                    <Row className="align-items-center mb-3">
                        <Col xs={12} md={7} className="mb-3 mb-md-0">
                            <h4 className="mb-0">Reports Overview</h4>
                        </Col>
                        <Col xs={12} md={5} className="text-center text-md-end">
                            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                                <Button variant="outline-primary" size="sm" className="d-flex align-items-center">
                                    <FaFilePdf className="me-1" /> <span className="d-none d-sm-inline">PDF</span>
                                </Button>
                                <Button variant="outline-success" size="sm" className="d-flex align-items-center">
                                    <FaFileExcel className="me-1" /> <span className="d-none d-sm-inline">Excel</span>
                                </Button>
                                <Button variant="outline-info" size="sm" className="d-flex align-items-center">
                                    <FaFileCsv className="me-1" /> <span className="d-none d-sm-inline">CSV</span>
                                </Button>
                                <Button variant="outline-secondary" size="sm" className="d-flex align-items-center">
                                    <FaPrint className="me-1" /> <span className="d-none d-sm-inline">Print</span>
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={6} md={4} className="mb-3 mb-md-0">
                            <Form.Group>
                                <Form.Label>Filter by Month</Form.Label>
                                <Form.Select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    {months.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={4} className="mb-3 mb-md-0">
                            <Form.Group>
                                <Form.Label>Filter by Department</Form.Label>
                                <Form.Select
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                >
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <Form.Group>
                                <Form.Label>Search Employee</Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type="text"
                                        placeholder="Employee name..."
                                        value={searchEmployee}
                                        onChange={(e) => setSearchEmployee(e.target.value)}
                                    />
                                    <Button variant="outline-secondary">
                                        <FaSearch />
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Tabs
                        id="payroll-reports-tabs"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="monthly" title="Monthly Summary">
                            {/* Desktop Table View */}
                            <div className="d-none d-md-block">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Total Employees</th>
                                            <th>Gross Pay</th>
                                            <th>Deductions</th>
                                            <th>Net Pay</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthlyData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.month}</td>
                                                <td>{data.totalEmployees}</td>
                                                <td>{data.grossPay}</td>
                                                <td>{data.deductions}</td>
                                                <td>{data.netPay}</td>
                                                <td>
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm"
                                                        onClick={() => handleMonthlyView(data)}
                                                    >
                                                        <FaEye className="me-1" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            
                            {/* Mobile Card View */}
                            <div className="d-md-none">
                                {monthlyData.map((data, index) => (
                                    <Card key={index} className="mb-3">
                                        <Card.Body>
                                            <Card.Title className="d-flex justify-content-between align-items-center">
                                                <span>{data.month}</span>
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm"
                                                    onClick={() => handleMonthlyView(data)}
                                                >
                                                    <FaEye />
                                                </Button>
                                            </Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Employees:</span>
                                                    <span>{data.totalEmployees}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Gross Pay:</span>
                                                    <span>{data.grossPay}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Deductions:</span>
                                                    <span>{data.deductions}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Net Pay:</span>
                                                    <span>{data.netPay}</span>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>

                        <Tab eventKey="department" title="Department Report">
                            {/* Desktop Table View */}
                            <div className="d-none d-md-block">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Department</th>
                                            <th>Employees</th>
                                            <th>Total Salary</th>
                                            <th>Avg Salary</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departmentData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.department}</td>
                                                <td>{data.employees}</td>
                                                <td>{data.totalSalary}</td>
                                                <td>{data.avgSalary}</td>
                                                <td>
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm"
                                                        onClick={() => handleDepartmentView(data)}
                                                    >
                                                        <FaEye className="me-1" /> 
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            
                            {/* Mobile Card View */}
                            <div className="d-md-none">
                                {departmentData.map((data, index) => (
                                    <Card key={index} className="mb-3">
                                        <Card.Body>
                                            <Card.Title className="d-flex justify-content-between align-items-center">
                                                <span>{data.department}</span>
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm"
                                                    onClick={() => handleDepartmentView(data)}
                                                >
                                                    <FaEye />
                                                </Button>
                                            </Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Employees:</span>
                                                    <span>{data.employees}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Total Salary:</span>
                                                    <span>{data.totalSalary}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Avg Salary:</span>
                                                    <span>{data.avgSalary}</span>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>

                        <Tab eventKey="employee" title="Employee History">
                            {/* Desktop Table View */}
                            <div className="d-none d-md-block">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Employee</th>
                                            <th>Month</th>
                                            <th>Gross Pay</th>
                                            <th>Deductions</th>
                                            <th>Net Pay</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeHistoryData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.employee}</td>
                                                <td>{data.month}</td>
                                                <td>{data.grossPay}</td>
                                                <td>{data.deductions}</td>
                                                <td>{data.netPay}</td>
                                                <td>
                                                    <span className={`badge ${data.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                                                        {data.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            
                            {/* Mobile Card View */}
                            <div className="d-md-none">
                                {employeeHistoryData.map((data, index) => (
                                    <Card key={index} className="mb-3">
                                        <Card.Body>
                                            <Card.Title className="d-flex justify-content-between align-items-center">
                                                <span>{data.employee}</span>
                                                <span className={`badge ${data.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                                                    {data.status}
                                                </span>
                                            </Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Month:</span>
                                                    <span>{data.month}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Gross Pay:</span>
                                                    <span>{data.grossPay}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Deductions:</span>
                                                    <span>{data.deductions}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Net Pay:</span>
                                                    <span>{data.netPay}</span>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>

                        <Tab eventKey="tax" title="Tax & Deduction Report">
                            {/* Desktop Table View */}
                            <div className="d-none d-md-block">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Tax</th>
                                            <th>PF</th>
                                            <th>Insurance</th>
                                            <th>Other</th>
                                            <th>Total Deductions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxDeductionData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.month}</td>
                                                <td>{data.tax}</td>
                                                <td>{data.pf}</td>
                                                <td>{data.insurance}</td>
                                                <td>{data.other}</td>
                                                <td>{data.totalDeductions}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            
                            {/* Mobile Card View */}
                            <div className="d-md-none">
                                {taxDeductionData.map((data, index) => (
                                    <Card key={index} className="mb-3">
                                        <Card.Body>
                                            <Card.Title>{data.month}</Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Tax:</span>
                                                    <span>{data.tax}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>PF:</span>
                                                    <span>{data.pf}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Insurance:</span>
                                                    <span>{data.insurance}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Other:</span>
                                                    <span>{data.other}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Total Deductions:</span>
                                                    <span>{data.totalDeductions}</span>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>

            {/* Monthly Summary Modal */}
            <Modal 
                show={showMonthlyModal} 
                onHide={() => setShowMonthlyModal(false)} 
                size="lg"
                fullscreen="md-down"
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Monthly Details - {selectedMonthlyData?.month}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMonthlyData && (
                        <div>
                            <Row className="mb-3">
                                <Col xs={12} md={6} className="mb-3 mb-md-0">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Employee Information</Card.Title>
                                            <p><strong>Total Employees:</strong> {selectedMonthlyData.totalEmployees}</p>
                                            <p><strong>Month:</strong> {selectedMonthlyData.month}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Financial Summary</Card.Title>
                                            <p><strong>Gross Pay:</strong> {selectedMonthlyData.grossPay}</p>
                                            <p><strong>Deductions:</strong> {selectedMonthlyData.deductions}</p>
                                            <p><strong>Net Pay:</strong> {selectedMonthlyData.netPay}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Employee Breakdown</Card.Title>
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Employee Name</th>
                                                    <th>Department</th>
                                                    <th>Gross Pay</th>
                                                    <th>Deductions</th>
                                                    <th>Net Pay</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employeeHistoryData
                                                    .filter(emp => emp.month === selectedMonthlyData.month)
                                                    .map((emp, index) => (
                                                        <tr key={index}>
                                                            <td>{emp.employee}</td>
                                                            <td>{departmentData.find(dept => dept.employees > 0)?.department || 'N/A'}</td>
                                                            <td>{emp.grossPay}</td>
                                                            <td>{emp.deductions}</td>
                                                            <td>{emp.netPay}</td>
                                                            <td>
                                                                <span className={`badge ${emp.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                                                                    {emp.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="flex-column flex-md-row">
                    <Button variant="secondary" onClick={() => setShowMonthlyModal(false)} className="w-100 w-md-auto mb-2 mb-md-0">
                        Close
                    </Button>
                    <Button variant="primary" className="w-100 w-md-auto">
                        Export Details
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Department Report Modal */}
            <Modal 
                show={showDepartmentModal} 
                onHide={() => setShowDepartmentModal(false)} 
                size="lg"
                fullscreen="md-down"
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Department Details - {selectedDepartmentData?.department}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDepartmentData && (
                        <div>
                            <Row className="mb-3">
                                <Col xs={12} md={6} className="mb-3 mb-md-0">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Department Information</Card.Title>
                                            <p><strong>Department:</strong> {selectedDepartmentData.department}</p>
                                            <p><strong>Number of Employees:</strong> {selectedDepartmentData.employees}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Salary Information</Card.Title>
                                            <p><strong>Total Salary:</strong> {selectedDepartmentData.totalSalary}</p>
                                            <p><strong>Average Salary:</strong> {selectedDepartmentData.avgSalary}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Employees in {selectedDepartmentData.department} Department</Card.Title>
                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Employee Name</th>
                                                    <th>Month</th>
                                                    <th>Gross Pay</th>
                                                    <th>Deductions</th>
                                                    <th>Net Pay</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employeeHistoryData
                                                    .filter(emp => emp.month === selectedMonth)
                                                    .map((emp, index) => (
                                                        <tr key={index}>
                                                            <td>{emp.employee}</td>
                                                            <td>{emp.month}</td>
                                                            <td>{emp.grossPay}</td>
                                                            <td>{emp.deductions}</td>
                                                            <td>{emp.netPay}</td>
                                                            <td>
                                                                <span className={`badge ${emp.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                                                                    {emp.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="flex-column flex-md-row">
                    <Button variant="secondary" onClick={() => setShowDepartmentModal(false)} className="w-100 w-md-auto mb-2 mb-md-0">
                        Close
                    </Button>
                    <Button variant="primary" className="w-100 w-md-auto">
                        Export Details
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PayrollReports;