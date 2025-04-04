import React from "react";


const AdminLoginLoader = ({ towerColor = "white", ballColor = "white" }) => {
  return (
    <div className="loader-container">
      <div className="loader">
        <style jsx>{`
          .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.67); /* Fade effect */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }


          .loader {
            width: 40px;
            height: 30px;
            --c: no-repeat linear-gradient(${towerColor} 0 0); /* Tower color */
            background:
              var(--c) 0 100%/8px 30px,
              var(--c) 50% 100%/8px 20px,
              var(--c) 100% 100%/8px 10px;
            position: relative;
            clip-path: inset(-100% 0);
          }


          .loader:before {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${ballColor}; /* Ball color */
            left: -16px;
            top: 0;
            animation:
              l5-1 2s linear infinite,
              l5-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
          }


          @keyframes l5-1 {
            0% {
              left: -16px;
              transform: translateY(-8px);
            }
            100% {
              left: calc(100% + 8px);
              transform: translateY(22px);
            }
          }


          @keyframes l5-2 {
            100% {
              top: -0.1px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};


export default AdminLoginLoader;