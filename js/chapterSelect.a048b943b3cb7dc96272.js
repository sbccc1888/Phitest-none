DeviceOrientationEvent&&(console.log("DeviceOrientationEvent detected, attaching event listener."),window.addEventListener("deviceorientation",(e=>{const{gamma:t,beta:n}=e;o.style.setProperty("--gamma",t),o.style.setProperty("--beta",n)}),!0))}))})();
