export function receiptTemplate(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
body{
  font-family: Inter, Arial, sans-serif;
  background:#fff;
  padding:0;
}

.receipt {
  width: 210mm;
  height: 297mm;
  padding: 12mm;
  overflow: hidden;
}


.header{
  background:#070511;
  color:white;
  padding:16px 24px;
  border-bottom:4px solid #8B5CF6;
}

.header-inner{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
}

.logo{
  width:140px;
}

.title{
  text-align:right;
}

.title h1{
  font-size:22px;
  margin-bottom:4px;
}

.title p{
  font-size:12px;
  color:#d1d5db;
}

.content{
  padding:24px 32px;
}

.row{
  display:flex;
  gap: 12px;
  margin-bottom: 10px;
}

.card{
  flex:1;
  border:1px solid #e5e7eb;
  border-radius:16px;
  padding:18px;
}

.card-title{
  color:#7c3aed;
  font-weight:700;
  margin-bottom:20px;
}

.info-item{
  margin-bottom:8px;
  font-size:14px;
  line-height:1.4;
}

.info-label{
  font-weight:600;
  display:inline-block;
  width:120px;
}

.receipt-side{
  flex:1;
}

.receipt-side .item{
  margin-bottom: 18px;
}

.receipt-side .label{
  color:#6b7280;
  font-size:14px;
}

.receipt-side .value{
  font-size:16px;
  font-weight:700;
}

.status{
  color:#16a34a;
}

table{
  width:100%;
  border-collapse:collapse;
  margin-top:20px;
}

thead{
  background:#070511;
  color:white;
}

th{
  padding:10px 12px;
  text-align:left;
}

td{
  border:1px solid #e5e7eb;
  padding:10px 12px;
}

.payment-box{
  margin-top:18px;
  padding: 18px 22px;
  border-radius:16px;
  background:#faf5ff;
  border:1px solid #e9d5ff;
  position:relative;
}

.payment-box h2{
  color:#7c3aed;
  margin-bottom:20px;
}

.amount{
  font-size:36px;
  font-weight:700;
  color:#6d28d9;
}

.bottom{
  margin-top:20px;
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
}

.help{
  width:220px;
  padding:16px;
  font-size:13px;
  background:#070511;
  color:white;
  border-radius:16px;
}

.signature{
  text-align:center;
}

.signature img{
  width:100px;
}

.stamp{
  width:100px;
}

.watermark{
  position:absolute;
  right:20px;
  bottom:20px;
  opacity:0.08;
  width:160px;
}


table,
tr{
  page-break-inside: avoid;
  break-inside: avoid;
}

@page{
  size:A4;
  margin:10mm;
}
</style>
</head>

<body>

<div class="receipt">

<div class="header">
<div class="header-inner">

<div>
<img
src="${process.env.NEXT_PUBLIC_APP_URL}/korva-logo.png"
class="logo"
/>
</div>

<div class="title">
<h1>PAYMENT RECEIPT</h1>
<p>Thank you for choosing Korva Tech Hub</p>
</div>

</div>
</div>

<div class="content">

<div class="row">

<div class="card">
<div class="card-title">STUDENT INFORMATION</div>

<div class="info-item">
<span class="info-label">Name:</span>
${data.name}
</div>

<div class="info-item">
<span class="info-label">Email:</span>
${data.email}
</div>

<div class="info-item">
<span class="info-label">Phone:</span>
${data.phone}
</div>

<div class="info-item">
<span class="info-label">Student ID:</span>
${data.studentId}
</div>

</div>

<div class="receipt-side">

<div class="item">
<div class="label">RECEIPT ID</div>
<div class="value">${data.receiptId}</div>
</div>

<div class="item">
<div class="label">DATE</div>
<div class="value">${data.date}</div>
</div>

<div class="item">
<div class="label">PAYMENT STATUS</div>
<div class="value status">PAID</div>
</div>

</div>

</div>

<table>

<thead>
<tr>
<th>DESCRIPTION</th>
<th>DETAILS</th>
</tr>
</thead>

<tbody>

<tr>
<td>Program</td>
<td>${data.program}</td>
</tr>

<tr>
<td>Duration</td>
<td>${data.duration}</td>
</tr>

<tr>
<td>Start Date</td>
<td>${data.startDate}</td>
</tr>

<tr>
<td>Access Includes</td>
<td>
✓ Learning Materials<br/>
✓ Live Classes & Recordings<br/>
✓ Community Access<br/>
✓ Certificate of Completion
</td>
</tr>

</tbody>

</table>

<div class="payment-box">

<h2>PAYMENT SUMMARY</h2>

<p><strong>Payment Method:</strong> Paystack</p>
<p><strong>Transaction ID:</strong> ${data.reference}</p>

<br/>

<div class="amount">
₦${Number(data.amount || 0).toLocaleString()}
</div>

<br/>

<p>
Amount in Words:
${data.amountWords}
</p>

<img
src="${process.env.NEXT_PUBLIC_APP_URL}/korva-watermark.png"
class="watermark"
/>

</div>

<div class="bottom">

<div class="help">
<h3>Need Help?</h3>

<br/>

support@korvatechhub.com

<br/><br/>

+234 9052639990
</div>

<div class="signature">

<p>
Your payment has been received successfully.
</p>

<img
src="${process.env.NEXT_PUBLIC_APP_URL}/signature.png"
/>

<h3>Team Korva Tech Hub</h3>

</div>

<img
src="${process.env.NEXT_PUBLIC_APP_URL}/verified-stamp.png"
class="stamp"
/>

</div>

</div>

</div>

</body>
</html>
`;
}