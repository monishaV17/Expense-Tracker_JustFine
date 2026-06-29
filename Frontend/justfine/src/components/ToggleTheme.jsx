import {React, useEffect, useState} from "react";

function ToggleTheme(){
    const[theme,setTheme]=useState("light");

    useEffect(()=>{
        document.body.className=theme;
    },[theme]);

    useEffect(()=>{                    //default
    document.body.className="light";
  },[]);

    const buttonStyle={
        width: "125px",
        padding: "10px 20px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "600",
        background: theme === "light" ? "#2563eb" : "#3b82f6",
        color: "#fff",
    }

    return(

        <button style={buttonStyle} onClick={()=> setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
}

export default ToggleTheme;