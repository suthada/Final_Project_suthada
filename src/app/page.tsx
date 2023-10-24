import React from 'react';


const centerText: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "20vh",
  textAlign: "center",
};

export default function Home() {
  return (
    <div style={centerText}>
      <h1>คำนวณภาษีที่ดิน</h1>
      <h2>กรุณา sign in</h2>
    </div>
  );
}
