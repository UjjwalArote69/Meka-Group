// src/components/Hero.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; 

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onLoadProgress = () => {}, onReady = () => {} }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameState = useRef({ currentIndex: 0, maxIndex: 223 });
  const [_initialShown, setInitialShown] = useState(false);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false }); 
    if (!context) return;

    let animationStarted = false;
    const images = imagesRef.current;

    function renderFrame(index) {
      const img = images[index];
      if (!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high"; 
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    }

    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.floor(frameState.current.currentIndex));
    }

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    function startAnimation() {
      if (animationStarted) return;
      animationStarted = true;

      gsap.to(canvas, { autoAlpha: 1, duration: 1.0, ease: "power1.out" });
      setInitialShown(true);

      gsap.to(frameState.current, {
        currentIndex: frameState.current.maxIndex - 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".parent",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        },
        onUpdate: () => {
          const index = Math.floor(frameState.current.currentIndex);
          requestAnimationFrame(() => renderFrame(index));
        },
      });

      const hasAnimated = sessionStorage.getItem("heroTextAnimated_V4");

      if (hasAnimated) {
        gsap.set(".hero-word", { opacity: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 });
      } else {
        gsap.fromTo(
          ".hero-word",
          {
            opacity: 0,
            filter: "blur(24px)",   
            scale: 2.5,             
            x: (index) => (index === 0 ? -400 : index === 2 ? 400 : 0), 
            y: (index) => (index === 1 ? 250 : -150), 
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            x: 0,
            y: 0,
            duration: 2.8,       
            stagger: 0.6,        
            ease: "expo.out",    
            scrollTrigger: {
              trigger: ".parent",
              start: "top -2%", 
              once: true,
            },
            onComplete: () => {
              sessionStorage.setItem("heroTextAnimated_V4", "true");
            }
          }
        );
      }

      onReady(); 
    }

    function preloadImages() {
      let loadedCount = 0;
      const maxIndex = frameState.current.maxIndex;
      
      // 🚨 FIX: Force it to wait until ALL 223 frames are loaded
      const minFramesToStart = maxIndex; 

      const firstImg = new Image();
      firstImg.src = `/frames/frame_0000.webp`;
      firstImg.onload = () => {
        images[0] = firstImg;
        renderFrame(0);
        onLoadProgress(1);
      };

      for (let i = 0; i < maxIndex; i++) {
        const img = new Image();
        const src = `/frames/frame_${i.toString().padStart(4, "0")}.webp`;
        img.src = src;

        img.onload = () => {
          loadedCount++;
          images[i] = img;
          const percent = Math.min(100, (loadedCount / maxIndex) * 100);
          onLoadProgress(percent);

          // Now this will ONLY trigger when loadedCount reaches 223
          if (!animationStarted && loadedCount >= minFramesToStart) {
            startAnimation();
          }
        };

        img.onerror = () => {
          loadedCount++;
          const percent = Math.min(100, (loadedCount / maxIndex) * 100);
          onLoadProgress(percent);
          
          if (!animationStarted && loadedCount >= minFramesToStart)
            startAnimation();
        };
      }
    }

    gsap.set(canvas, { autoAlpha: 0 });
    preloadImages();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, { scope: containerRef, dependencies: [onLoadProgress, onReady] }); 

  return (
    <div ref={containerRef} className="w-full z-0">
      <div className="parent relative w-full h-[800vh] bg-linear-to-b from-black via-neutral-900 to-black">
        
        <div 
          className="sticky top-0 left-0 w-full h-screen z-0 bg-center bg-cover" 
          style={{ backgroundImage: "linear-gradient(180deg,#030303,#0a0a0a)" }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full pointer-events-none"
            style={{ display: "block" }}
          />
        </div>

        <div className="sticky top-0 left-0 w-full h-screen z-10 flex items-center justify-center pointer-events-none overflow-hidden">
          
          <h1
            id="hero-text"
            className="text-white font-serif text-5xl md:text-8xl font-bold flex flex-wrap justify-center gap-4 md:gap-8"
            style={{ textShadow: "0px 10px 30px rgba(0,0,0,0.6)" }}
          >
            <span className="hero-word opacity-0">Build.</span>
            <span className="hero-word opacity-0">Innovate.</span>
            <span className="hero-word opacity-0">Sustain.</span>
          </h1>

        </div>
        
      </div>
    </div>
  );
};

export default Hero;