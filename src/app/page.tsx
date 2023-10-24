import Image from "next/image";



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
      <h1>คำนวณภาษี</h1>
      <h2>กรุณา signin</h2>
    </div> 
  );
}

