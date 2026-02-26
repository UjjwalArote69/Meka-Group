import React from 'react';

const MekaLogo = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 660 200"
      width="100%"
      height="100%"
      {...props}
    >
      <defs>
        <linearGradient id="redSwooshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B21818" />
          <stop offset="100%" stopColor="#E52D2D" />
        </linearGradient>
      </defs>

      <g fill="#1D1B1B">
        {/* Letter M */}
        <polygon points="40,160 80,40 105,40 120,110 135,40 160,40 200,160 170,160 145,90 120,150 95,90 70,160" />

        {/* Letter E */}
        <polygon points="220,40 300,40 300,70 255,70 255,85 290,85 290,115 255,115 255,130 300,130 300,160 220,160" />

        {/* Letter K */}
        <polygon points="320,160 320,40 355,40 355,90 400,40 440,40 380,105 440,160 400,160 355,120 355,160" />

        {/* Letter A (Black Base) */}
        <polygon points="460,160 510,40 550,40 600,160 560,160 530,88 500,160" />
      </g>

      {/* Red Swoosh (A Crossbar) */}
      <path
        d="M 514 125 C 570 95, 620 85, 655 82 C 620 95, 570 120, 507 142 Z"
        fill="url(#redSwooshGrad)"
      />
    </svg>
  );
};

export default MekaLogo;