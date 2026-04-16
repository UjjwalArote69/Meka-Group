// // src/components/Hero.jsx
// import React, { useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react"; 

// gsap.registerPlugin(ScrollTrigger);

// const Hero = ({ onLoadProgress = () => {}, onReady = () => {} }) => {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imagesRef = useRef([]);
//   const frameState = useRef({ currentIndex: 0, maxIndex: 223 });
//   const [_initialShown, setInitialShown] = useState(false);

//   useGSAP(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const context = canvas.getContext("2d", { alpha: false }); 
//     if (!context) return;

//     let animationStarted = false;
//     const images = imagesRef.current;

//     function renderFrame(index) {
//       const img = images[index];
//       if (!img) return;

//       context.clearRect(0, 0, canvas.width, canvas.height);
//       const scale = Math.max(
//         canvas.width / img.width,
//         canvas.height / img.height
//       );
//       const newWidth = img.width * scale;
//       const newHeight = img.height * scale;
//       const offsetX = (canvas.width - newWidth) / 2;
//       const offsetY = (canvas.height - newHeight) / 2;

//       context.imageSmoothingEnabled = true;
//       context.imageSmoothingQuality = "high"; 
//       context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
//     }

//     function setCanvasSize() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       renderFrame(Math.floor(frameState.current.currentIndex));
//     }

//     setCanvasSize();
//     window.addEventListener("resize", setCanvasSize);

//     function startAnimation() {
//       if (animationStarted) return;
//       animationStarted = true;

//       gsap.to(canvas, { autoAlpha: 1, duration: 1.0, ease: "power1.out" });
//       setInitialShown(true);

//       // Frame Sequence Animation
//       gsap.to(frameState.current, {
//         currentIndex: frameState.current.maxIndex - 1,
//         ease: "none",
//         scrollTrigger: {
//           trigger: ".parent",
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 1, 
//         },
//         onUpdate: () => {
//           const index = Math.floor(frameState.current.currentIndex);
//           requestAnimationFrame(() => renderFrame(index));
//         },
//       });

//       const hasAnimated = sessionStorage.getItem("heroTextAnimated_V4");

//       if (hasAnimated) {
//         gsap.set(".hero-word, .hero-sub-text", { opacity: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 });
//       } else {
//         const masterTl = gsap.timeline({
//           scrollTrigger: {
//             trigger: ".parent",
//             start: "top -2%", 
//             once: true,
//           },
//           onComplete: () => {
//             sessionStorage.setItem("heroTextAnimated_V4", "true");
//           }
//         });

//         // Main Headline Animation
//         masterTl.fromTo(
//           ".hero-word",
//           {
//             opacity: 0,
//             filter: "blur(24px)",   
//             scale: 2.5,             
//             x: (index) => (index === 0 ? -400 : index === 2 ? 400 : 0), 
//             y: (index) => (index === 1 ? 250 : -150), 
//           },
//           {
//             opacity: 1,
//             filter: "blur(0px)",
//             scale: 1,
//             x: 0,
//             y: 0,
//             duration: 2.4,       
//             stagger: 0.4,        
//             ease: "expo.out",
//           }
//         );

//         // Sub-text Entrance (Sliding in after the main title)
//         masterTl.fromTo(
//           ".hero-sub-text",
//           { opacity: 0, y: 20, filter: "blur(10px)" },
//           { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, stagger: 0.3, ease: "power3.out" },
//           "-=1.2"
//         );
//       }

//       onReady(); 
//     }

//     function preloadImages() {
//       let loadedCount = 0;
//       const maxIndex = frameState.current.maxIndex;
//       const minFramesToStart = maxIndex; 

//       const firstImg = new Image();
//       firstImg.src = `/frames/frame_0000.webp`;
//       firstImg.onload = () => {
//         images[0] = firstImg;
//         renderFrame(0);
//         onLoadProgress(1);
//       };

//       for (let i = 0; i < maxIndex; i++) {
//         const img = new Image();
//         const src = `/frames/frame_${i.toString().padStart(4, "0")}.webp`;
//         img.src = src;

//         img.onload = () => {
//           loadedCount++;
//           images[i] = img;
//           const percent = Math.min(100, (loadedCount / maxIndex) * 100);
//           onLoadProgress(percent);

//           if (!animationStarted && loadedCount >= minFramesToStart) {
//             startAnimation();
//           }
//         };

//         img.onerror = () => {
//           loadedCount++;
//           const percent = Math.min(100, (loadedCount / maxIndex) * 100);
//           onLoadProgress(percent);
//           if (!animationStarted && loadedCount >= minFramesToStart) startAnimation();
//         };
//       }
//     }

//     gsap.set(canvas, { autoAlpha: 0 });
//     preloadImages();

//     return () => {
//       window.removeEventListener("resize", setCanvasSize);
//     };
//   }, { scope: containerRef, dependencies: [onLoadProgress, onReady] }); 

//   return (
//     <div ref={containerRef} className="w-full z-0">
//       <div className="parent relative w-full h-[800vh] bg-linear-to-b from-black via-neutral-900 to-black">
        
//         <div 
//           className="sticky top-0 left-0 w-full h-screen z-0" 
//           style={{ backgroundImage: "linear-gradient(180deg,#030303,#0a0a0a)" }}
//         >
//           <canvas ref={canvasRef} className="w-full h-full pointer-events-none block" />
//         </div>

//         <div className="sticky top-0 left-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none overflow-hidden px-6">
          
//           {/* Top Subheading - The Legacy */}
//           <p className="hero-sub-text opacity-0 font-sans text-[#0ea5a4] text-[10px] md:text-sm font-bold tracking-[0.5em] uppercase mb-8 text-center drop-shadow-lg">
//             40+ Years of Excellence in Marine Construction & Coastal Infrastructure
//           </p>

//           {/* MAIN HEADLINE */}
//           <h1 id="hero-text" className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-8 select-none">
//             <span 
//               className="hero-word opacity-0 font-sans font-black text-6xl md:text-[8.5rem] uppercase tracking-tighter text-transparent"
//               style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.9)" }}
//             >
//               Build.
//             </span>
//             <span className="hero-word opacity-0 font-serif italic text-6xl md:text-[8.5rem] tracking-tight text-white lowercase">
//               innovate.
//             </span>
//             <span className="hero-word opacity-0 font-sans font-black text-6xl md:text-[8.5rem] uppercase tracking-tighter text-white">
//               Sustain<span className="text-[#0ea5a4]">.</span>
//             </span>
//           </h1>

//           {/* Bottom Subheading - The Global Reach */}
//           <div className="hero-sub-text opacity-0 mt-12 flex flex-col items-center gap-4">
//              <div className="w-12 h-px bg-white/30" />
//              <p className="font-sans text-white/50 text-xs md:text-base font-light tracking-[0.15em] text-center max-w-xl leading-relaxed">
//                Over <span className="text-white font-medium">4,000 plants and equipment</span> installed in <span className="text-white font-medium">110+ countries</span> worldwide.
//              </p>
//           </div>

//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default Hero;