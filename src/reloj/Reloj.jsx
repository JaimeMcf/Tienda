import { useEffect, useState } from "react";

function RelojDigital() { 

const [hora, setHora] = useState(new Date());
const [activo, setActivo] = useState(true);


useEffect (()=> { 

    let intervalo = null; 

    if(activo) { intervalo = setInterval(() => { 


setHora(new Date())


}, 1000) 
             }




return () => { 


    if(intervalo) { clearInterval(intervalo)   }


    }



},[activo])


const toggle = () => { 
    setActivo(!activo); 
  };

const boton= () => {

if(activo) { 

return 'Pausar Reloj ⏸️';
}

else { 

return 'Reanudar Reloj ▶️';


}  }


  let colorFondo = "";

  if (activo) {
    colorFondo = "#e74c3c"; // Rojo si está activo
  } else {
    colorFondo = "#2ecc71"; // Verde si está pausado
  }


return (

<div style={{padding:"30", fontFamily:"Arial", textAling: "center"  }}>

    <h2>Reloj Digital ⏰</h2>

<div style={{ 
        fontSize: '48px', 
        fontWeight: 'bold', 
        color: '#2c3e50', 
        background: '#ecf0f1', 
        padding: '20px 40px', 
        borderRadius: '12px', 
        display: 'inline-block',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>


{hora.toLocaleTimeString()}

</div>

<div style={{background: colorFondo, marginTop: '20px' }}>
        <button 
          onClick={toggle}
          style={{ 
            background: colorFondo,
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            fontSize: '16px', 
            cursor: 'pointer', 
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          {boton}
        </button>
      </div>
    </div>
  );  
}

export default RelojDigital;