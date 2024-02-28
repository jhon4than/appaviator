import React from "react";

const FacebookPixel = () => {
  React.useEffect(() => {
    // Cria um novo script para o Pixel
    const script = document.createElement("script");
    script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '247484568334989');
    fbq('track', 'PageView');
    
    `;
    document.head.appendChild(script);

    // Cria um novo elemento noscript para o Pixel
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = "1";
    img.width = "1";
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=247484568334989&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }, []);

  return null;
};

export default FacebookPixel;
