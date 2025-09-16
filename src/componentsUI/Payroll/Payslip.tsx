
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { getPayslip} from "@/Services/PayrollService";
// import type { Payslip } from "@/Services/type";

export default function Payslip() {
  //  const location = useLocation();
  //  const { employeeId, year, month } = location.state || {};
  //  const [payslip, setPayslip] = useState<Payslip | null>(null);

  //   useEffect(() => {
  //   if (employeeId && year && month) {
  //     getPayslip(employeeId, year, month)
  //       .then((data) => setPayslip(data))
  //       .catch((err) => console.error("Error fetching payslip:", err));
  //   }
  //  }, [employeeId, year, month]);

  //  if (!payslip) return <p>Loading payslip...</p>;


  return (
    <div>
      <style>{`
        body {
          font-family: sans-serif;
        }

        .payslip-container {
          width: 800px;
          font-family: sans-serif;
          margin: 20px auto;
          padding: 20px;
          color: #333;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
        }

        .company-header {
          width: 100%;
          margin-bottom: 20px;
          box-shadow: none;
        }

        .header{
          width: 100%;
          border-collapse: collapse;
        }

        .logo{
          border-top:none;
          border-bottom:none;
          }

        .logo img {
          width: 180px;
          height: auto;
          object-fit: contain;
        }

        .payslip-month{
         border-top:none;
          border-bottom:none;
          text-align:right;
        }

        .section {
          margin-bottom: 30px;
          line-height: 28px;
        }

        .address {
          font-weight: bold;
          margin-bottom: 15px;
        }

        .income {
          margin-top: 30px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .summary{
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
          margin-top:20px;
        }

        th, td {
          text-align: left;
          padding: 10px;
          border-bottom: 1px solid #f0f0f0;
          border-top: 1px solid #f0f0f0;
        }

        th {
          font-weight: bold;
          color: #333;
        }

        td.amount {
          text-align: left;
          color: #444;
        }

        .pay {
          font-weight: bold;
          background-color: #F9F9FB;
        }

        .netpay {
          width: 100%;
          border: 1px solid #eee;
          margin: 40px 0;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
        }

        .netpay td {
          padding: 15px;
          font-weight: bold;
        }

        .netpay .label {
          text-align: left;
        }

        .netpay .value {
          text-align: right;
          background-color: #F9F9FB;
        }

        .size {
          font-size: 12px;
        }

        .last {
          margin-bottom: 30px;
        }

        .button {
          width: 100%;
          margin-top: 30px;
          box-shadow: none;
        }

        .button td {
          border: none;
          padding-right: 50px;
        }

        .red {
          background-color: #3e8edf;
          padding: 10px 20px;
          border-radius: 10px;
          color: #fff;
          border: none;
          box-shadow: none;
        }

        .reset {
          border: 1px solid #E7E9EB;
          padding: 10px 20px;
          border-radius: 10px;
          background: #fff;
          box-shadow: none;
        }
      `}</style>

      <div className="payslip-container">
        <div className="company-header">
          <table className="header">
            <tr>
              <td className="logo">
                <img src="/logo.svg" alt="Company Logo" />
              </td>
              <td className="payslip-month">
                <h6>Payslip For the Month</h6>
                 {/* <p>{`${payslip.month}/${payslip.year}`}</p> */}
                <p>September 2025</p>
              </td>
            </tr>
          </table>
        </div>

        <div className="section">
          <h4>Genx Thofa Technologies</h4>
          <h6>No.40, PNS Tower,100 Feet RD, SundararajaNagar</h6>
          <h6>Karamanikuppam</h6>
          <h6>Puducherry-605005</h6>
        </div>

        <div>
          <h4 className="address">Employee Pay Summary</h4>
          <table className="summary">
            <tr>
              <td>Employee Name : Meera Krishnan 
                {/* {payslip.employeeName} */}
              </td>
              <td>Employee Id : ET1005
                {/* {payslip.employeeId} */}
              </td>

            </tr>
            <tr>
              <td>Pay Period :
                {/* {payslip.payPeriod} */}
              </td>
              <td>Paid Days :
                {/* {payslip.paidDays} */}
              </td>
            </tr>
            <tr>
              <td>Loss of Pay Days :
                 {/* {payslip.lopDays} */}
              </td>
              <td>Pay Date :
                {/* {payslip.payDate} */}
              </td>
            </tr>
          </table>
        </div>

        <div className="section">
          <h4 className="income">Income Details</h4>
           <table className="summary">
             <tr>
               <th>Earnings</th>
               <th>Amount</th>
               <th>Deductions</th>
               <th>Amount</th>
            </tr>
            <tr>
              <td>Basic</td>
              <td className="amount">0
                  {/* {payslip.basic} */}
              </td>
              <td>Employee State Insurance</td>
              <td className="amount">0
                  {/* {payslip.ESI} */}
              </td>
            </tr>
            <tr>
              <td>Conveyance</td>
              <td className="amount">0
              {/* {payslip.conveyance} */}
              </td>
              <td>Labour Welfare</td>
              <td className="amount">0
                {/* {payslip.labourWelfare} */}
              </td>
            </tr>
            <tr>
              <td>Medical Allowance</td>
              <td className="amount">0
                {/* {payslip.medicalAllowance} */}
              </td>
              <td>Provident Fund</td>
              <td className="amount">0
                {/* {payslip.providentFund} */}
              </td>
            </tr>
            <tr className="pay">
              <td>Gross Earnings</td>
              <td>0
                {/* {payslip.grossEarnings} */}
              </td>
              <td>Total Deductions</td>
              <td>0
                {/* {payslip.totalDeductions} */}
              </td>
            </tr>
          </table>
        </div>

        <table className="netpay">
          <tr>
            <td className="label">
              <p>Total Net Payable</p>
              <p className="size">Gross Earnings - Total Deductions</p>
            </td>
            <td className="value">0</td>
          </tr>
        </table>

        <div className="last">
          <p>Amount in words:</p>
          <p className="size">Indian rupees zero only</p>
        </div>
        <hr />

        <div className="button">
          <table>
            <tr>
              <td><button className="red">Download Payslip</button></td>
              <td><button className="reset">Reset</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}


