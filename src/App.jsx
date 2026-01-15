import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Dashboardd from "./Components/Dashboard/Dashboardd";
import Company from "./Components/Dashboard/Company";
import PlansPricing from "./Components/Dashboard/PlansPricing/PlansPricing";
import RequestPlan from "./Components/Dashboard/RequestPlan";
import Payments from "./Components/Dashboard/Payments";
import Inventorys from "./Components/Company-Dashboard/Inventory/Inventorys";
import UnitofMeasure from "./Components/Company-Dashboard/Inventory/UnitofMeasure";
import Invoice from "./Components/Company-Dashboard/Sales/Invoice";
import SalesDelivery from "./Components/Company-Dashboard/Sales/SalesDelivery";
import SalesReturn from "./Components/Company-Dashboard/Sales/SalesReturn";
import GSTReturns from "./Components/Company-Dashboard/GST/GSTReturns";
import TdsTcs from "./Components/Company-Dashboard/GST/TdsTcs";
import ITCReport from "./Components/Company-Dashboard/GST/ITCReport";
import EWayBill from "./Components/Company-Dashboard/GST/EWayBill";
import PurchaseReturn from "./Components/Company-Dashboard/Purchases/PurchaseReturn";
import DayBook from "./Components/Company-Dashboard/Reports/DayBook";
import Expense from "./Components/Company-Dashboard/Reports/Expense";
import JournalEntries from "./Components/Company-Dashboard/Reports/JournalEntries";
import Ledger from "./Components/Company-Dashboard/Reports/Ledger";
import TrialBalance from "./Components/Company-Dashboard/Reports/TrialBalance";
import Posreport from "./Components/Company-Dashboard/Reports/Posreport";
import CreateVoucher from "./Components/Company-Dashboard/Inventory/CreateVoucher";
import Taxreport from "./Components/Company-Dashboard/Reports/Taxreports";
import InventorySummary from "./Components/Company-Dashboard/Reports/InventorySummary";
import VatReport from "./Components/Company-Dashboard/Reports/VatReport";
import BalanceSheet from "./Components/Company-Dashboard/Reports/BalanceSheet";
import CashFlow from "./Components/Company-Dashboard/Reports/CashFlow";
import ProfitLoss from "./Components/Company-Dashboard/Reports/ProfitLoss";
import Users from "./Components/Company-Dashboard/UserManagement/Users";
import RolesPermissions from "./Components/Company-Dashboard/UserManagement/RolesPermissions";
import DeleteAccountRequest from "./Components/Company-Dashboard/UserManagement/DeleteAccountRequest";
import CompanyInfo from "./Components/Company-Dashboard/Settings/CompanyInfo";
import Salesreport from "./Components/Company-Dashboard/Reports/Salesreport";
import WareHouse from "./Components/Company-Dashboard/Inventory/SiteData/WareHouse";
import BrandPage from "./Components/Company-Dashboard/Inventory/SiteData/BrandPage";
import Productt from "./Components/Company-Dashboard/Inventory/Productt";
import DevicePage from "./Components/Company-Dashboard/Inventory/SiteData/DevicePage";
import StockTransfer from "./Components/Company-Dashboard/Inventory/SiteData/StockTransfer";
import PointOfSale from "./Components/Company-Dashboard/Inventory/Pos/PointOfSale";
import InvoiceSummary from "./Components/Company-Dashboard/Inventory/Pos/InvoiceSummary";
import ManageInvoices from "./Components/Company-Dashboard/Inventory/Pos/ManageInvoice";
import ViewInvoice from "./Components/Company-Dashboard/Inventory/Pos/ViewInvoice";
import EditInvoice from "./Components/Company-Dashboard/Inventory/Pos/EditInvoice";
import Profile from "./Layout/ProfileModal";
import PurchaseOrderView from "./Components/Company-Dashboard/Purchases/PurchaseOrderView";
import ViewInvoicee from "./Components/Company-Dashboard/Sales/ViewInvoicee";
import Categories from "./Components/Company-Dashboard/Inventory/SiteData/Categories";
import AllAcounts from "./Components/Company-Dashboard/Accounts/ChartsofAccount/AllAcounts";
import Ledgercustomer from "./Components/Company-Dashboard/Accounts/Ledgercustomer";
import Ledgervendor from "./Components/Company-Dashboard/Accounts/Ledgervendor";
import VendorsCreditors from "./Components/Company-Dashboard/Accounts/VendorsCreditors";
import PurchaseVoucher from "./Components/Company-Dashboard/Inventory/PurchaseVoucher";
import Transaction from "./Components/Company-Dashboard/Accounts/Transaction";
import SalesVoucher from "./Components/Company-Dashboard/Inventory/SalesVoucher";
import PurchaseVoucherView from "./Components/Company-Dashboard/Inventory/PurchaseVoucherView";
import SalesVoucherView from "./Components/Company-Dashboard/Inventory/SalesVoucherView";
import AddProduct from "./Components/Company-Dashboard/Inventory/Product/AddProduct";
import SettingModal from "./Components/SettingModal";
import PaymentEntry from "./Components/Company-Dashboard/Accounts/PaymentEntry";
import ReceiptEntry from "./Components/Company-Dashboard/Accounts/ReceiptEntry";
import WareHouseDetail from "./Components/Company-Dashboard/Inventory/SiteData/WareHouseDetail";
import DeliveryChallans from "./Components/Company-Dashboard/Sales/DeliveryChallans";
import PurchaseOrderr from "./Components/Company-Dashboard/Purchases/PurchaseOrderr";
import MultiStepPurchaseForms from "./Components/Company-Dashboard/Purchases/MultiStepPurchaseForms";
import AddProductModal from "./Components/Company-Dashboard/Inventory/AddProductModal";
import AssetDetails from "./Components/Company-Dashboard/Reports/AssetDetails";
import Liabilitydetails from "./Components/Company-Dashboard/Reports/Liabilitydetails";
import MultiStepSalesForm from "./Components/Company-Dashboard/Sales/MultiStepSalesForm";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import Income from "./Components/Company-Dashboard/Reports/Income";
import WithoutHeader from "./Layout/WithoutHeader";
import Purchasereport from "./Components/Company-Dashboard/Reports/Purchasereport";
import AddCustomerModal from "./Components/Company-Dashboard/Accounts/AddCustomerModal";
import AddVendorModal from "./Components/Company-Dashboard/Accounts/AddVendorModal";
import LedgerPageAccount from "./Components/Company-Dashboard/Accounts/LedgerPageAccount";
import Service from "./Components/Company-Dashboard/Inventory/SiteData/Service";
import CustomerItemDetailsView from "./Components/Company-Dashboard/Accounts/CustomerItemDetailsView";
import CustomerTransactionDetails from "./Components/Company-Dashboard/Accounts/CustomerTransactionDetails";
import VendorTransactionDetails from "./Components/Company-Dashboard/Accounts/VendorTransactionDetails";
import VendorItemDetailsView from "./Components/Company-Dashboard/Accounts/VendorItemDetailsView";
import InventoryDetails from "./Components/Company-Dashboard/Inventory/InventoryDetails";
import InventoryAdjustment from "./Components/Company-Dashboard/Inventory/InventoryAdjustment";
import PurchaseQuotationPage from "./Components/Company-Dashboard/Purchases/PurchaseQuotationPage";
import PurchaseOrderPage from "./Components/Company-Dashboard/Purchases/PurchaseOrderPage";
import GoodsReceiptPage from "./Components/Company-Dashboard/Purchases/GoodsReceiptPage";
import BillPage from "./Components/Company-Dashboard/Purchases/BillPage";
import PaymentPage from "./Components/Company-Dashboard/Purchases/PaymentPage";
import ContraVoucher from "./Components/Company-Dashboard/Reports/ContraVoucher";
import PaymnetSupplier from "./Components/Company-Dashboard/Reports/PaymnetSupplier";
import ReceivedCustomer from "./Components/Company-Dashboard/Reports/ReceivedCustomer";
import CustomersDebtors from "./Components/Company-Dashboard/Accounts/CustomersDebtors/CustomersDebtors";
import CompanyDashboard from "./Components/Company-Dashboard/CompanyDashbaord";
import EmployeeManagement from "./Components/Company-Dashboard/Payroll/EmployeeManagement";
import SalaryStructure from "./Components/Company-Dashboard/Payroll/SalaryStructure";
import GeneratePayroll from "./Components/Company-Dashboard/Payroll/GeneratePayroll";
import PaySlipReports from "./Components/Company-Dashboard/Payroll/PaySlipReports";
import PayrollReports from "./Components/Company-Dashboard/Payroll/PayrollReports";
import PayrollSettings from "./Components/Company-Dashboard/Payroll/PayrollSettings";
import ProfileModal from "./Layout/ProfileModal";
import BankDetails from "./Components/Company-Dashboard/Settings/BankDetails";
import InvoiceSetting from "./Components/Company-Dashboard/Settings/InvoiceSetting";
import NewClient from "./Components/Company-Dashboard/Clien/NewClient";
import AllClient from "./Components/Company-Dashboard/Clien/AllClient";
import DeliveryNote from "./Components/Company-Dashboard/Accounts/ChartsofAccount/DeliveryNote";
import CreditNote from "./Components/Company-Dashboard/Accounts/ChartsofAccount/CreditNote";
import DayMonth from "./Components/Company-Dashboard/Statement/DayMonth";
import QuotationNewInvoice from "./Components/Company-Dashboard/Sales/NewMenuSales/QuotationNewInvoice";
import SalesOrderNewInvoice from "./Components/Company-Dashboard/Sales/NewMenuSales/SalesOrderNewInvoice";
import DeliveryChallanNewInvoice from "./Components/Company-Dashboard/Sales/NewMenuSales/DeliveryChallanNewInvoice";
import InvoiceNewInvoice from "./Components/Company-Dashboard/Sales/NewMenuSales/InvoiceNewInvoice";
import PaymentNewInvoice from "./Components/Company-Dashboard/Sales/NewMenuSales/PaymentNewInvoice";
import BillNew from "./Components/Company-Dashboard/Purchases/NewPurchaseMenu/BillNew";
import GoodsReceiptNew from "./Components/Company-Dashboard/Purchases/NewPurchaseMenu/GoodsReceiptNew";
import PaymentPurchaseNew from "./Components/Company-Dashboard/Purchases/NewPurchaseMenu/PaymentPurchaseNew";
import PurchaseOrderNew from "./Components/Company-Dashboard/Purchases/NewPurchaseMenu/PurchaseOrderNew";
import PurchaseQuotationNew from "./Components/Company-Dashboard/Purchases/NewPurchaseMenu/PurchaseQuotationNew";
// Website Pages
import Overview from "./Components/Website/Pages/Overview";
import Features from "./Components/Website/Pages/Features";
import Pricing from "./Components/Website/Pages/Pricing";
import Contact from "./Components/Website/Pages/Contact";
import Aboutus from "./Components/Website/Pages/Aboutus";
import NewInterprice from "./Components/Website/Pages/NewInterprice";
import PrivacyPolicy from "./Components/Website/Pages/PrivacyPolicy";
import TermsConditions from "./Components/Website/Pages/TermsConditions";
import ModalForm from "./Components/testing";

// Public Website Layout Components
import Navbar from "./Components/Website/Layout/Navbar";
import Footer1 from "./Components/Website/Layout/Footer1";
import ScrollToTop from "./Components/Website/Layout/ScrollToTop";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentNew from "./Components/Company-Dashboard/Purchases/NewPurchaseMenu/PaymentPurchaseNew";
import PurchaseQuotationNewTab from "./Components/Company-Dashboard/Purchases/NewPurchaseMenu/PurchaseQuotationNewTab";

// ✅ Helper Component: Handles layout logic inside Router
function AppContent() {
  const location = useLocation();

  const hideLayout =
  location.pathname.startsWith("/dashboard") ||
  location.pathname.startsWith("/superadmin/company") ||
  location.pathname.startsWith("/superadmin/planpricing") ||
  location.pathname.startsWith("/superadmin/requestplan") ||
  location.pathname.startsWith("/superadmin/payments") ||
  location.pathname.startsWith("/company/dashboard") ||
  location.pathname.startsWith("/company/allacounts") ||
  location.pathname.startsWith("/company/ledgerpageaccount") ||
  location.pathname.startsWith("/company/Ledgercustomer") ||


  location.pathname.startsWith("/company/customer-item-details") ||
  location.pathname.startsWith("/company/customer-transaction-details") ||
  location.pathname.startsWith("/company/customersdebtors") ||
  location.pathname.startsWith("/company/vendor-transaction-details") ||
  location.pathname.startsWith("/company/vendor-item-details") ||
  location.pathname.startsWith("/company/addcustomersmodal") ||
  location.pathname.startsWith("/company/vendorscreditors") ||
  location.pathname.startsWith("/company/addvendorsmodal") ||
  location.pathname.startsWith("/company/receiptentry") ||
  location.pathname.startsWith("/company/paymententry") ||
  location.pathname.startsWith("/company/transaction") ||
  location.pathname.startsWith("/company/warehouse") ||
  location.pathname.startsWith("/company/warehouse/:id") ||
  location.pathname.startsWith("/company/unitofmeasure") ||
  location.pathname.startsWith("/company/service")||
  location.pathname.startsWith("/company/inventorys")||
  location.pathname.startsWith("/company/inventorydetails/")||
  location.pathname.startsWith("/company/addproduct")||
  location.pathname.startsWith("/company/createvoucher")||
  location.pathname.startsWith("/company/stocktranfer")||
  location.pathname.startsWith("/company/inventory-adjustment")||
  location.pathname.startsWith("/company/salesvoucher")||
  location.pathname.startsWith("/company/purchasevoucher")||
  location.pathname.startsWith("/company/purchasevoucherview")||
  location.pathname.startsWith("/company/salesvoucherview")||
  location.pathname.startsWith("/company/categories") ||
  location.pathname.startsWith("/company/brands") ||
  location.pathname.startsWith("/company/product") ||
  location.pathname.startsWith("/company/createproduct") ||
  location.pathname.startsWith("/company/update-product/:id") ||
  location.pathname.startsWith("/company/device") ||
  location.pathname.startsWith("/company/ponitofsale") ||
  location.pathname.startsWith("/company/invoice-summary") ||
  location.pathname.startsWith("/company/manageinvoice") ||
  location.pathname.startsWith("/company/editinvoice") ||
  location.pathname.startsWith("/company/viewinvoice") ||
  location.pathname.startsWith("/company/deliverychallans") ||
  location.pathname.startsWith("/company/Invoice") ||
  location.pathname.startsWith("/company/multistepsalesform") ||
  location.pathname.startsWith("/company/viewinvoicee") ||
  location.pathname.startsWith("/company/salesdelivery") ||
  location.pathname.startsWith("/company/salesreturn") ||
  location.pathname.startsWith("/company/gstreturns") ||
  location.pathname.startsWith("/company/tdstcs") ||
  location.pathname.startsWith("/company/itcreport") ||
  location.pathname.startsWith("/company/ewaybill") ||
  location.pathname.startsWith("/company/purchasorderr") ||
  location.pathname.startsWith("/company/multiforms") ||
  location.pathname.startsWith("/company/purchasequotationpage") ||
  location.pathname.startsWith("/company/purchaseorderpage") ||
  location.pathname.startsWith("/company/paymentpage") ||
  location.pathname.startsWith("/company/goodreceiptpage") ||
  location.pathname.startsWith("/company/billpage") ||
  location.pathname.startsWith("/company/purchasereturn") ||
  location.pathname.startsWith("/company/purchaseview") ||
  location.pathname.startsWith("/company/daybook") ||
  location.pathname.startsWith("/company/expense") ||
  location.pathname.startsWith("/company/income") ||
  location.pathname.startsWith("/company/contravoucher") ||
  location.pathname.startsWith("/company/paymnetsupplier") ||
  location.pathname.startsWith("/company/receivedcustomer") ||
  location.pathname.startsWith("/company/journalentries") ||
  location.pathname.startsWith("/company/ledger") ||
  location.pathname.startsWith("/company/trialbalance") ||
  location.pathname.startsWith("/company/salesreport") ||
  location.pathname.startsWith("/company/purchasereport") ||
  location.pathname.startsWith("/company/posreport") ||
  location.pathname.startsWith("/company/taxreport") ||
  location.pathname.startsWith("/company/inventorysummary") ||
  location.pathname.startsWith("/company/balancesheet") ||
  location.pathname.startsWith("/company/balancesheet/asstedetails") ||
  location.pathname.startsWith("/company/balancesheet/liabilitydetails") ||
  location.pathname.startsWith("/company/cashflow") ||
  location.pathname.startsWith("/company/profitloss") ||
  location.pathname.startsWith("/company/vatreport") ||
  location.pathname.startsWith("/company/users") ||
  location.pathname.startsWith("/company/rolespermissions") ||
  location.pathname.startsWith("/company/deleteaccountrequests") ||
  location.pathname.startsWith("/company/companyinfo") ||
  location.pathname.startsWith("/company/employeemanagement") ||
  location.pathname.startsWith("/company/salarystructure") ||
  location.pathname.startsWith("/company/generatepayroll") ||
  location.pathname.startsWith("/company/payslipreports") ||
  location.pathname.startsWith("/company/payrollreports") ||
  location.pathname.startsWith("/company/payrollsettings") ||
  location.pathname.startsWith("/company/AllClients") ||
  location.pathname.startsWith("/company/NewClient") ||
  location.pathname.startsWith("/company/Delivery") ||
  location.pathname.startsWith("/company/CreditNote") ||
  location.pathname.startsWith("/company/DayMonth") ||

  location.pathname.startsWith("/company/UserProfile") ||
  location.pathname.startsWith("/company/invoicesettings") ||
  location.pathname.startsWith("/company/bankingdetails") ||
  location.pathname.startsWith("/company/quotation") ||
  location.pathname.startsWith("/company/sales-order") ||
  location.pathname.startsWith("/company/delivery-challan") ||
  location.pathname.startsWith("/company/invoice-tab") ||
  location.pathname.startsWith("/company/payment") ||
  location.pathname.startsWith("/company/bill")||
  location.pathname.startsWith("/company/goods-receipt")||
  location.pathname.startsWith("/company/payment-new")||
  location.pathname.startsWith("/company/purchase-order")||
  location.pathname.startsWith("/company/purchase-quotation")||

  location.pathname === "/login" ||
  location.pathname === "/signup" ||
  location.pathname === "/forgot-password" ||
  location.pathname === "/reset-password";


  if (hideLayout) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Dashboard / Company routes without Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboardd />} />
          <Route path="/superadmin/company" element={<Company />} />
          <Route path="/superadmin/planpricing" element={<PlansPricing />} />
          <Route path="/superadmin/requestplan" element={<RequestPlan />} />
          <Route path="/superadmin/payments" element={<Payments />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/allacounts" element={<AllAcounts />} />
          <Route path="/company/ledgerpageaccount" element={<LedgerPageAccount />} />
          <Route path="/company/Ledgercustomer" element={<Ledgercustomer />} />
          <Route path="/company/customer-item-details" element={<CustomerItemDetailsView />} />
          <Route path="/company/customer-transaction-details" element={<CustomerTransactionDetails />} />
          <Route path="/company/customersdebtors" element={<CustomersDebtors />} />
          <Route path="/company/ledgervendor" element={<Ledgervendor />} />
          <Route path="/company/vendor-transaction-details" element={<VendorTransactionDetails />} />
          <Route path="/company/vendor-item-details" element={<VendorItemDetailsView />} />
          <Route path="/company/addcustomersmodal" element={<AddCustomerModal />} />
          <Route path="/company/vendorscreditors" element={<VendorsCreditors />} />
          <Route path="/company/addvendorsmodal" element={<AddVendorModal />} />
          <Route path="/company/receiptentry" element={<ReceiptEntry />} />
          <Route path="/company/paymententry" element={<PaymentEntry />} />
          <Route path="/company/transaction" element={<Transaction />} />
          <Route path="/company/warehouse" element={<WareHouse />} />
          <Route path="/company/warehouse/:id" element={<WareHouseDetail />} />
          <Route path="/company/unitofmeasure" element={<UnitofMeasure />} />
          <Route path="/company/service" element={<Service />} />
          <Route path="/company/inventorys" element={<Inventorys />} />
          <Route path="/company/inventorydetails/:id" element={<InventoryDetails />} />
          <Route path="/company/addproduct" element={<AddProductModal />} />
          <Route path="/company/createvoucher" element={<CreateVoucher />} />
          <Route path="/company/stocktranfer" element={<StockTransfer />} />
          <Route path="/company/inventory-adjustment" element={<InventoryAdjustment />} />
          <Route path="/company/salesvoucher" element={<SalesVoucher />} />
          <Route path="/company/purchasevoucher" element={<PurchaseVoucher />} />
          <Route path="/company/purchasevoucherview" element={<PurchaseVoucherView />} />
          <Route path="/company/salesvoucherview" element={<SalesVoucherView />} />
          <Route path="/company/categories" element={<Categories />} />
          <Route path="/company/brands" element={<BrandPage />} />
          <Route path="/company/product" element={<Productt />} />
          <Route path="/company/createproduct" element={<AddProduct />} />
          <Route path="/company/update-product/:id" element={<AddProduct />} />
          <Route path="/company/device" element={<DevicePage />} />
          <Route path="/company/ponitofsale" element={<PointOfSale />} />
          <Route path="/company/invoice-summary" element={<InvoiceSummary />} />
          <Route path="/company/manageinvoice" element={<ManageInvoices />} />
          <Route path="/company/editinvoice" element={<EditInvoice />} />
          <Route path="/company/viewinvoice" element={<ViewInvoice />} />
          <Route path="/company/deliverychallans" element={<DeliveryChallans />} />
          <Route path="/company/Invoice" element={<Invoice />} />
          <Route path="/company/multistepsalesform" element={<MultiStepSalesForm />} />
          <Route path="/company/viewinvoicee" element={<ViewInvoicee />} />
          <Route path="/company/salesdelivery" element={<SalesDelivery />} />
          <Route path="/company/salesreturn" element={<SalesReturn />} />
          <Route path="/company/gstreturns" element={<GSTReturns />} />
          <Route path="/company/tdstcs" element={<TdsTcs />} />
          <Route path="/company/itcreport" element={<ITCReport />} />
          <Route path="/company/ewaybill" element={<EWayBill />} />
          <Route path="/company/purchasorderr" element={<PurchaseOrderr />} />
          <Route path="/company/multiforms" element={<MultiStepPurchaseForms />} />
          <Route path="/company/purchasequotationpage" element={<PurchaseQuotationPage />} />
          <Route path="/company/purchaseorderpage" element={<PurchaseOrderPage />} />
          <Route path="/company/paymentpage" element={<PaymentPage />} />
          <Route path="/company/goodreceiptpage" element={<GoodsReceiptPage />} />
          <Route path="/company/billpage" element={<BillPage />} />
          <Route path="/company/purchasereturn" element={<PurchaseReturn />} />
          <Route path="/company/purchaseview" element={<PurchaseOrderView />} />
          <Route path="/company/daybook" element={<DayBook />} />
          <Route path="/company/expense" element={<Expense />} />
          <Route path="/company/income" element={<Income />} />
          <Route path="/company/contravoucher" element={<ContraVoucher />} />
          <Route path="/company/paymnetsupplier" element={<PaymnetSupplier />} />
          <Route path="/company/receivedcustomer" element={<ReceivedCustomer />} />
          <Route path="/company/journalentries" element={<JournalEntries />} />
          <Route path="/company/ledger" element={<Ledger />} />
          <Route path="/company/trialbalance" element={<TrialBalance />} />
          <Route path="/company/salesreport" element={<Salesreport />} />
          <Route path="/company/purchasereport" element={<Purchasereport />} />
          <Route path="/company/posreport" element={<Posreport />} />
          <Route path="/company/taxreport" element={<Taxreport />} />
          <Route path="/company/inventorysummary" element={<InventorySummary />} />
          <Route path="/company/balancesheet" element={<BalanceSheet />} />
          <Route path="/company/balancesheet/asstedetails" element={<AssetDetails />} />
          <Route path="/company/balancesheet/liabilitydetails" element={<Liabilitydetails />} />
          <Route path="/company/cashflow" element={<CashFlow />} />
          <Route path="/company/profitloss" element={<ProfitLoss />} />
          <Route path="/company/vatreport" element={<VatReport />} />
          <Route path="/company/users" element={<Users />} />
          <Route path="/company/rolespermissions" element={<RolesPermissions />} />
          <Route path="/company/deleteaccountrequests" element={<DeleteAccountRequest />} />
          <Route path="/company/companyinfo" element={<CompanyInfo />} />
          <Route path="/company/ledgervendor" element={<Ledgervendor />} />
          <Route path="/company/employeemanagement" element={<EmployeeManagement />} />
          <Route path="/company/salarystructure" element={<SalaryStructure />} />
          <Route path="/company/generatepayroll" element={<GeneratePayroll />} />
          <Route path="/company/payslipreports" element={<PaySlipReports />} />
          <Route path="/company/payrollreports" element={<PayrollReports />} />
          <Route path="/company/payrollsettings" element={<PayrollSettings />} />
          <Route path="/company/UserProfile" element={<ProfileModal/>} />
          <Route path="/company/invoicesettings" element={<InvoiceSetting/>} />
          <Route path="/company/bankingdetails" element={<BankDetails/>} />
          <Route path="/company/NewClient" element={<NewClient/>} />
          <Route path="/company/AllClients" element={<AllClient/>} />
          <Route path="/company/DeliveryNote" element={<DeliveryNote/>} />
          <Route path="/company/CreditNote" element={<CreditNote/>} />
          <Route path="/company/DayMonth" element={<DayMonth/>} />
          <Route path="/company/quotation" element={<QuotationNewInvoice />} />
          <Route path="/company/sales-order" element={<SalesOrderNewInvoice />} />
          <Route path="/company/delivery-challan" element={<DeliveryChallanNewInvoice />} />
          <Route path="/company/invoice-tab" element={<InvoiceNewInvoice />} />
          <Route path="/company/payment" element={<PaymentNewInvoice />} />
          <Route path="/company/bill" element={<BillNew />} />
          <Route path="/company/goods-receipt" element={<GoodsReceiptNew />} />
          <Route path="/company/payment-purchase" element={<PaymentPurchaseNew />} />
          <Route path="/company/purchase-order" element={<PurchaseOrderNew />} />
          <Route path="/company/purchase-quotation" element={<PurchaseQuotationNew />} />
        </Route>
      </Routes>
    );
  }


  return (
    <>
      <Navbar />
      <Routes>
        {/* ========== PUBLIC WEBSITE ROUTES ========== */}
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/newinterprise" element={<NewInterprice />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsConditions" element={<TermsConditions />} />

        {/* ========== DASHBOARD ROUTES ========== */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboardd />} />
          <Route path="/superadmin/company" element={<Company />} />
          <Route path="/superadmin/planpricing" element={<PlansPricing />} />
          <Route path="/superadmin/requestplan" element={<RequestPlan />} />
          <Route path="/superadmin/payments" element={<Payments />} />
        </Route>
                    
        <Route element={<MainLayout />}>
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/allacounts" element={<AllAcounts />} />
          <Route path="/company/ledgerpageaccount" element={<LedgerPageAccount />} />
          <Route path="/company/ledgercustomer" element={<Ledgercustomer />} />
          <Route path="/company/customer-item-details" element={<CustomerItemDetailsView />} />
          <Route path="/company/customer-transaction-details" element={<CustomerTransactionDetails />} />
          <Route path="/company/customersdebtors" element={<CustomersDebtors />} />
          <Route path="/company/ledgervendor" element={<Ledgervendor />} />
          <Route path="/company/vendor-transaction-details" element={<VendorTransactionDetails />} />
          <Route path="/company/vendor-item-details" element={<VendorItemDetailsView />} />
          <Route path="/company/addcustomersmodal" element={<AddCustomerModal />} />
          <Route path="/company/vendorscreditors" element={<VendorsCreditors />} />
          <Route path="/company/addvendorsmodal" element={<AddVendorModal />} />
          <Route path="/company/receiptentry" element={<ReceiptEntry />} />
          <Route path="/company/paymententry" element={<PaymentEntry />} />
          <Route path="/company/transaction" element={<Transaction />} />
          <Route path="/company/warehouse" element={<WareHouse />} />
          <Route path="/company/warehouse/:id" element={<WareHouseDetail />} />
          <Route path="/company/unitofmeasure" element={<UnitofMeasure />} />
          <Route path="/company/service" element={<Service />} />
          <Route path="/company/inventorys" element={<Inventorys />} />
          <Route path="/company/inventorydetails/:id" element={<InventoryDetails />} />
          <Route path="/company/addproduct" element={<AddProductModal />} />
          <Route path="/company/createvoucher" element={<CreateVoucher />} />
          <Route path="/company/stocktranfer" element={<StockTransfer />} />
          <Route path="/company/inventory-adjustment" element={<InventoryAdjustment />} />
          <Route path="/company/salesvoucher" element={<SalesVoucher />} />
          <Route path="/company/purchasevoucher" element={<PurchaseVoucher />} />
          <Route path="/company/purchasevoucherview" element={<PurchaseVoucherView />} />
          <Route path="/company/salesvoucherview" element={<SalesVoucherView />} />
          <Route path="/company/categories" element={<Categories />} />
          <Route path="/company/brands" element={<BrandPage />} />
          <Route path="/company/product" element={<Productt />} />
          <Route path="/company/createproduct" element={<AddProduct />} />
          <Route path="/company/update-product/:id" element={<AddProduct />} />
          <Route path="/company/device" element={<DevicePage />} />
          <Route path="/company/ponitofsale" element={<PointOfSale />} />
          <Route path="/company/invoice-summary" element={<InvoiceSummary />} />
          <Route path="/company/manageinvoice" element={<ManageInvoices />} />
          <Route path="/company/editinvoice" element={<EditInvoice />} />
          <Route path="/company/viewinvoice" element={<ViewInvoice />} />
          <Route path="/company/deliverychallans" element={<DeliveryChallans />} />
          <Route path="/company/invoice" element={<Invoice />} />
          <Route path="/company/multistepsalesform" element={<MultiStepSalesForm />} />
          <Route path="/company/viewinvoicee" element={<ViewInvoicee />} />
          <Route path="/company/salesdelivery" element={<SalesDelivery />} />
          <Route path="/company/salesreturn" element={<SalesReturn />} />
          <Route path="/company/gstreturns" element={<GSTReturns />} />
          <Route path="/company/tdstcs" element={<TdsTcs />} />
          <Route path="/company/itcreport" element={<ITCReport />} />
          <Route path="/company/ewaybill" element={<EWayBill />} />
          <Route path="/company/purchasorderr" element={<PurchaseOrderr />} />
          <Route path="/company/multiforms" element={<MultiStepPurchaseForms />} />
          <Route path="/company/purchasequotationpage" element={<PurchaseQuotationPage />} />
          <Route path="/company/purchaseorderpage" element={<PurchaseOrderPage />} />
          <Route path="/company/paymentpage" element={<PaymentPage />} />
          <Route path="/company/goodreceiptpage" element={<GoodsReceiptPage />} />
          <Route path="/company/billpage" element={<BillPage />} />
          <Route path="/company/purchasereturn" element={<PurchaseReturn />} />
          <Route path="/company/purchaseview" element={<PurchaseOrderView />} />
          <Route path="/company/daybook" element={<DayBook />} />
          <Route path="/company/expense" element={<Expense />} />
          <Route path="/company/income" element={<Income />} />
          <Route path="/company/contravoucher" element={<ContraVoucher />} />
          <Route path="/company/paymnetsupplier" element={<PaymnetSupplier />} />
          <Route path="/company/receivedcustomer" element={<ReceivedCustomer />} />
          <Route path="/company/journalentries" element={<JournalEntries />} />
          <Route path="/company/ledger" element={<Ledger />} />
          <Route path="/company/trialbalance" element={<TrialBalance />} />
          <Route path="/company/salesreport" element={<Salesreport />} />
          <Route path="/company/purchasereport" element={<Purchasereport />} />
          <Route path="/company/posreport" element={<Posreport />} />
          <Route path="/company/taxreport" element={<Taxreport />} />
          <Route path="/company/inventorysummary" element={<InventorySummary />} />
          <Route path="/company/balancesheet" element={<BalanceSheet />} />
          <Route path="/company/balancesheet/asstedetails" element={<AssetDetails />} />
          <Route path="/company/balancesheet/liabilitydetails" element={<Liabilitydetails />} />
          <Route path="/company/cashflow" element={<CashFlow />} />
          <Route path="/company/profitloss" element={<ProfitLoss />} />
          <Route path="/company/vatreport" element={<VatReport />} />
          <Route path="/company/users" element={<Users />} />
          <Route path="/company/rolespermissions" element={<RolesPermissions />} />
          <Route path="/company/deleteaccountrequests" element={<DeleteAccountRequest />} />
          <Route path="/company/companyinfo" element={<CompanyInfo />} />
          <Route path ="/testing" element={<ModalForm />} />
          <Route path ="/company/employeemanagement" element={<EmployeeManagement />} />
          <Route path="/company/salarystructure" element={<SalaryStructure />} />
          <Route path="/company/generatepayroll" element={<GeneratePayroll />} />
          <Route path="/company/payslipreports" element={<PaySlipReports />} />
          <Route path="/company/payrollreports" element={<PayrollReports />} />
          <Route path="/company/payrollsettings" element={<PayrollSettings />} />
          <Route path="/company/UserProfile" element={<ProfileModal/>} />
                <Route path="/company/invoicesettings" element={<InvoiceSetting/>} />
          <Route path="/company/bankingdetails" element={<BankDetails/>} />
          <Route path="/company/NewClient" element={<NewClient/>} />
          <Route path="/company/AllClients" element={<AllClient/>} />
          <Route path="/company/DeliveryNote" element={<DeliveryNote/>} />
          <Route path="/company/CreditNote" element={<CreditNote/>} />
          <Route path="/company/DayMonth" element={<DayMonth/>} />
          <Route path="/company/quotation" element={<QuotationNewInvoice />} />
          <Route path="/company/sales-order" element={<SalesOrderNewInvoice />} />
          <Route path="/company/delivery-challan" element={<DeliveryChallanNewInvoice />} />
          <Route path="/company/invoice-tab" element={<InvoiceNewInvoice />} />
          <Route path="/company/payment" element={<PaymentNewInvoice />} />
          <Route path="/company/bill" element={<BillNew />} />
          <Route path="/company/payment-purchase" element={<PaymentPurchaseNew />} />
          <Route path="/company/purchase-order" element={<PurchaseOrderNew />} />
          <Route path="/company/purchase-quotation" element={<PurchaseQuotationNew />} />
        </Route>
      </Routes>
      <Footer1 />
    </>
  );
}

// ✅ Main App Component
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}