import React from "react";
export default function Toast({toast}){
  if(!toast) return null;
  return <div className={`toast ${toast.type==="removed"?"toast-red":"toast-green"}`}>
    <span>{toast.type==="removed"?"−":"✓"}</span>{toast.message}
  </div>;
}