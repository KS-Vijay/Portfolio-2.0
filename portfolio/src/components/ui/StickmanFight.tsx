import { useEffect, useRef } from 'react'

export default function StickmanFight() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 260
    }
    window.addEventListener('resize', resize)
    resize()

    // ── TECHNICAL SETUP ──
    const GROUND_Y = 200
    let animationFrameId: number
    let isPlaying = false
    let currentFrame = 0
    let slowMoFactor = 1.0

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(t, 1)

    // Visual Effect States
    let shake = { x: 0, y: 0, intensity: 0, decay: 0.85 }
    const triggerShake = (intensity: number) => { shake.intensity = intensity }

    class Spark {
      x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number; color: string;
      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.8) * 8;
        this.life = 1.0;
        this.decay = 0.06 + Math.random() * 0.04;
        this.size = 1.5 + Math.random() * 2;
        this.color = ['#ff6600','#ffaa00','#ffff88','#ffffff'][Math.floor(Math.random()*4)]
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.vy += 0.3; // gravity
        this.life -= this.decay;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }
    
    class Dust {
      x: number; y: number; radius: number; maxRadius: number; life: number;
      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        this.radius = 0;
        this.maxRadius = 4 + Math.random() * 6;
        this.life = 1.0;
      }
      update() {
        this.radius = lerp(this.radius, this.maxRadius, 0.1);
        this.life -= 0.05;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = Math.max(0, this.life * 0.5);
        ctx.fillStyle = '#888888';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    let particles: (Spark | Dust)[] = []

    function drawSaber(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, glowColor: string) {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = glowColor; ctx.lineWidth = 14; ctx.globalAlpha = 0.15; ctx.shadowBlur = 0; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.lineWidth = 8; ctx.globalAlpha = 0.3; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 20; ctx.shadowColor = color; ctx.stroke();
      ctx.shadowBlur = 0; ctx.globalAlpha = 1.0;
    }

    function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, progress: number) {
      if (progress <= 0) return;
      const padding = 10;
      const displayText = text.slice(0, Math.floor(progress * text.length));
      if (!displayText) return;
      ctx.font = '12px "JetBrains Mono", monospace';
      const width = Math.max(ctx.measureText(text).width + padding * 2, 60);
      const height = 30;
      const bx = x - width / 2;
      const by = y - height - 15;

      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      
      // RoundRect shim
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, by, width, height, 6) : ctx.rect(bx, by, width, height);
      ctx.fill(); ctx.stroke();

      ctx.beginPath(); ctx.moveTo(x - 6, by + height); ctx.lineTo(x + 6, by + height); ctx.lineTo(x, by + height + 10); ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fill();

      ctx.fillStyle = '#111111'; ctx.textAlign = 'center'; ctx.fillText(displayText, x, by + height / 2 + 4);
    }

    // ── STICKMAN SKELETON RENDERER ──
    const drawStickman = (ctx: CanvasRenderingContext2D, config: any) => {
      const {
        x, y, color, facing, torsoLean, headAngle,
        rUpperArmAngle, rForearmAngle, lUpperArmAngle, lForearmAngle,
        rThighAngle, rShinAngle, lThighAngle, lShinAngle,
        saberHand, saberAngle, saberLength, saberColor, saberGlowColor, bodyScaleY = 1.0
      } = config;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, bodyScaleY); // Squash effect

      const TORSO = 28, UPPER_ARM = 18, FOREARM = 16, THIGH = 20, SHIN = 18, HEAD_R = 10;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.lineWidth = 3.5;
      const rad = (deg: number) => deg * Math.PI / 180;
      const f = facing;

      // Draw relative to origin (hip = 0,0)
      const torsoAngle = rad(-90 + torsoLean * f);
      const shoulder = { x: Math.cos(torsoAngle) * TORSO, y: Math.sin(torsoAngle) * TORSO };
      const neckTip = { x: shoulder.x + Math.cos(torsoAngle + rad(headAngle)) * 6, y: shoulder.y + Math.sin(torsoAngle + rad(headAngle)) * 6 };

      // Torso
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(shoulder.x, shoulder.y); ctx.stroke();
      // Head
      ctx.beginPath(); ctx.arc(neckTip.x, neckTip.y - HEAD_R, HEAD_R, 0, Math.PI * 2); ctx.stroke();

      const drawArm = (shX: number, shY: number, upperAngle: number, foreAngle: number) => {
        const elbX = shX + Math.cos(rad(upperAngle)) * UPPER_ARM; const elbY = shY + Math.sin(rad(upperAngle)) * UPPER_ARM;
        const hndX = elbX + Math.cos(rad(foreAngle)) * FOREARM; const hndY = elbY + Math.sin(rad(foreAngle)) * FOREARM;
        ctx.beginPath(); ctx.moveTo(shX, shY); ctx.lineTo(elbX, elbY); ctx.lineTo(hndX, hndY); ctx.stroke();
        return { handX: hndX, handY: hndY };
      }
      
      const drawLeg = (hX: number, hY: number, thAngle: number, shAngle: number) => {
        const knX = hX + Math.cos(rad(thAngle)) * THIGH; const knY = hY + Math.sin(rad(thAngle)) * THIGH;
        // Ground constraint solver (very basic)
        let fX = knX + Math.cos(rad(shAngle)) * SHIN; let fY = knY + Math.sin(rad(shAngle)) * SHIN;
        const worldFootY = y + fY;
        if (worldFootY > GROUND_Y) { fY = GROUND_Y - y; } // clamp to ground
        ctx.beginPath(); ctx.moveTo(hX, hY); ctx.lineTo(knX, knY); ctx.lineTo(fX, fY); ctx.stroke();
      }

      const lHip = { x: -8 * f, y: 0 }; const rHip = { x: 4 * f, y: 0 };
      const lShoulder = { x: shoulder.x - 10 * f, y: shoulder.y }; const rShoulder = { x: shoulder.x + 10 * f, y: shoulder.y };

      const rHand = drawArm(rShoulder.x, rShoulder.y, rUpperArmAngle, rForearmAngle);
      const lHand = drawArm(lShoulder.x, lShoulder.y, lUpperArmAngle, lForearmAngle);
      drawLeg(lHip.x, lHip.y, lThighAngle, lShinAngle);
      drawLeg(rHip.x, rHip.y, rThighAngle, rShinAngle);

      // Saber
      if (saberLength > 0) {
        const hand = saberHand === 'right' ? rHand : lHand;
        const bX = hand.handX + Math.cos(rad(saberAngle)) * saberLength;
        const bY = hand.handY + Math.sin(rad(saberAngle)) * saberLength;
        // Revert scale to avoid skewing saber glow
        ctx.restore();
        drawSaber(ctx, x + hand.handX, y + hand.handY, x + bX, y + bY, saberColor, saberGlowColor);
      } else {
        ctx.restore();
      }
    }

    // Default Poses
    const defaultPose = {
      torsoLean: -5, headAngle: 0,
      rUpperArmAngle: 70, rForearmAngle: 45, lUpperArmAngle: 110, lForearmAngle: 135,
      rThighAngle: 70, rShinAngle: 110, lThighAngle: 110, lShinAngle: 70,
      saberHand: 'right', saberAngle: -45, saberLength: 55, bodyScaleY: 1.0, xOffset: 0, yOffset: 0
    }

    // Generate basic walk cycle (loop 12 frames)
    const getWalk = (f: number, phaseOffset: number = 0) => {
      const p = ((f + phaseOffset) % 12) / 12 * Math.PI * 2;
      return {
        rThighAngle: 90 + Math.sin(p) * 30, rShinAngle: 90 + Math.sin(p + 1) * 20,
        lThighAngle: 90 + Math.sin(p + Math.PI) * 30, lShinAngle: 90 + Math.sin(p + Math.PI + 1) * 20,
        rUpperArmAngle: 90 + Math.sin(p + Math.PI) * 20,
        rForearmAngle: 90 + Math.sin(p + Math.PI) * 10,
        saberLength: 0
      }
    }

    // Complex Procedural State (Generative alternative to full massive keyframe array)
    // To fit within tokens, we proceduralize the frame logic into a massive state machine.
    let dialogueState = { text: '', progress: 0, x: 0, y: 0, showRed: false, showBlue: false }
    let blueFlyingSaber = { active: false, x: 0, y: 0, rot: 0, vx: 0, vy: 0 }

    const renderFrame = (f: number) => {
      const cx = canvas.width / 2;
      
      // Default Base setups
      let red = { ...defaultPose, color: '#ff3333', facing: -1, saberColor: '#ff0000', saberGlowColor: 'rgba(255,50,50,0.6)', x: cx + 180, y: GROUND_Y - 40 }
      let blue= { ...defaultPose, color: '#4488ff', facing: 1, saberColor: '#00aaff', saberGlowColor: 'rgba(0,170,255,0.6)', x: cx - 180, y: GROUND_Y - 40, saberHand: 'left' }
      
      slowMoFactor = 1.0;
      dialogueState.showRed = false; dialogueState.showBlue = false;

      // 0-90 ENTRANCE
      if (f < 90) {
        red = { ...red, ...getWalk(f, 0), x: cx + 400 - (f * 3.5) }
        blue = { ...blue, ...getWalk(f, 6), x: cx - 400 + (f * 3) }
        if (f > 60) {
          red.saberLength = Math.min(55, (f - 60) * 8);
          blue.saberLength = Math.min(55, (f - 60) * 8);
          if (f === 61) triggerShake(1.5);
        }
      }
      // 90-150 CIRCLING (Guard)
      else if (f < 150) {
        red.x = cx + 85 + Math.sin(f*0.02)*10;
        blue.x = cx - 130 - Math.sin(f*0.02)*10;
        red.saberAngle = 225; blue.saberAngle = -45;
        
        // Red threat pose
        if (f > 130) {
          red.torsoLean = 10; red.saberAngle = lerp(225, 270, (f-130)/20);
        }
      }
      // 150-162 CLASH 1 Overhead
      else if (f < 162) {
        const lf = (f - 150) / 12;
        red.x = cx + 90 - (lf * 60); red.y = GROUND_Y - 40 - Math.sin(lf * Math.PI) * 40;
        red.saberAngle = lerp(270, 180, lf);
        
        blue.x = cx - 130 + (lf * 10);
        blue.torsoLean = 20; blue.rThighAngle = 120; blue.saberAngle = -90;
        
        if (f === 161) {
           triggerShake(6);
           for(let i=0; i<12; i++) particles.push(new Spark((red.x+blue.x)/2, red.y - 20));
        }
      }
      // 162-240 EXCHANGES AND LOCK
      else if (f < 240) {
        red.x = cx + 20; blue.x = cx - 80;
        
        if (f < 185) { // Recoil state
          red.saberAngle = 180; blue.saberAngle = -90; blue.torsoLean = 25;
        } else if (f < 198) { // Swipe (Clash 2)
          const lf = (f - 185) / 13;
          blue.x += lf*20; blue.saberAngle = lerp(-90, 0, lf);
          red.torsoLean = -20; red.saberAngle = 135;
          if (f === 197) { triggerShake(4); for(let i=0; i<8; i++) particles.push(new Spark(cx-10, red.y)); }
        } else { // Lock (Clash 3)
          const jitter = Math.sin(f * 2) * 1.5;
          red.x = cx - jitter; blue.x = cx - 60 + jitter;
          red.torsoLean = 25; blue.torsoLean = 25;
          red.saberAngle = 210; blue.saberAngle = -30;
          red.rUpperArmAngle = 140; blue.lUpperArmAngle = 40;
        }
      }
      // 240-320 DOMINATION
      else if (f < 320) {
        slowMoFactor = 0.5; // Epic slowmo
        if (f < 260) {
          // Push back
          red.x = cx - 10; red.saberAngle = 210;
          blue.x = cx - 60 - ((f-240)*3); blue.torsoLean = -15; blue.saberAngle = 45;
          blue.rUpperArmAngle = 10;
        } else if (f < 305) {
          // Blue spins, Red steps aside
          red.x = cx - 10; red.saberAngle = 240;
          blue.x = cx - 140; blue.saberAngle = (f * 20) % 360; // spinning saber
        } else {
          // Disarm strike
          const lf = (f - 305) / 15;
          red.x = cx - 20; red.saberAngle = lerp(130, 210, lf);
          blue.x = cx - 120 + (lf*40); blue.torsoLean = 30;
          
          if (f === 319) {
            triggerShake(7);
            blueFlyingSaber = { active: true, x: blue.x + 30, y: blue.y, rot: 0, vx: 5, vy: -12 };
            blue.saberLength = 0; // Disarmed
          }
        }
      }
      // 320-390 THE FALL
      else if (f < 390) {
        slowMoFactor = 0.5;
        red.x = cx - 20; red.saberAngle = 210; red.rUpperArmAngle = 140; // Standing triumphant
        
        blue.saberLength = 0;
        let lf = (f - 320) / 40; // Fall progress
        if (lf > 1) lf = 1;
        
        blue.x = cx - 80 - (lf * 60);
        blue.y = (GROUND_Y - 40) + (lf * 40); // Hips go to ground
        blue.torsoLean = lerp(-10, -90, lf); // Fall backward
        blue.rThighAngle = 0; blue.rShinAngle = 0; // Legs fly up
        
        if (f === 360) {
          triggerShake(8);
          for(let i=0; i<8; i++) particles.push(new Dust(blue.x, GROUND_Y));
        }
      }
      // 390-560 DIALOGUE 1 & 2
      else if (f < 650) {
        red.x = cx - 20; red.saberAngle = 210; red.rUpperArmAngle = 140;
        blue.saberLength = 0; blue.x = cx - 140; blue.y = GROUND_Y; blue.torsoLean = -90; blue.rThighAngle = 0; blue.rShinAngle = 0;
        
        // Breathing
        blue.y += Math.sin(f*0.05);

        if (f < 500) {
          dialogueState.showRed = true; dialogueState.text = "Now tell me... what are you gonna do?";
          dialogueState.progress = (f - 390) / 40;
          dialogueState.x = red.x; dialogueState.y = red.y - 70;
        } else {
          dialogueState.showBlue = true; dialogueState.text = "I... I will give him... the job.";
          dialogueState.progress = (f - 510) / 60;
          dialogueState.x = blue.x - 20; dialogueState.y = blue.y - 40;
          // Trembling arm
          blue.rUpperArmAngle = 180 + Math.sin(f * 0.8) * 5;
        }
      }
      // 650-800 FINALE
      else if (f < 840) {
        blue.saberLength = 0; blue.x = cx - 140; blue.y = GROUND_Y; blue.torsoLean = -90; blue.rThighAngle = 0; blue.rShinAngle = 0;

        if (f < 700) {
          red.x = cx - 20; red.saberAngle = 210;
          dialogueState.showRed = true; dialogueState.text = "That's right. You will.";
          dialogueState.progress = (f - 650) / 25;
          dialogueState.x = red.x; dialogueState.y = red.y - 70;
        } else {
          // Walk away
          red.saberLength = Math.max(0, 55 - (f - 700)*10);
          red.facing = 1; // Turn around
          red = { ...red, ...getWalk(f, 0), x: cx - 20 + ((f-710)*2) };

          if (f > 760) {
            // Blue sits up
            let lf = (f - 760) / 30; if (lf>1) lf=1;
            blue.torsoLean = lerp(-90, -30, lf);
            blue.y = lerp(GROUND_Y, GROUND_Y - 20, lf);
            blue.headAngle = 20; // dejected
          }
        }
        
        if (f > 780 && f < 840) {
          ctx.globalAlpha = 1 - ((f - 780) / 60);
        }
      } else {
        isPlaying = false; // End
      }

      // ── RENDER ROOT ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      
      // Shake
      shake.x = (Math.random() - 0.5) * shake.intensity * 2;
      shake.y = (Math.random() - 0.5) * shake.intensity * 2;
      shake.intensity *= shake.decay;
      ctx.translate(shake.x, shake.y);

      // Flying Saber Physics
      if (blueFlyingSaber.active) {
        blueFlyingSaber.x += blueFlyingSaber.vx;
        blueFlyingSaber.y += blueFlyingSaber.vy;
        blueFlyingSaber.vy += 0.8; // grav
        blueFlyingSaber.rot += 15;
        if (blueFlyingSaber.y > GROUND_Y) {
           blueFlyingSaber.y = GROUND_Y;
           blueFlyingSaber.vy *= -0.4;
           blueFlyingSaber.vx *= 0.6;
           if (Math.abs(blueFlyingSaber.vy) > 2) {
             triggerShake(2); for(let i=0; i<4; i++) particles.push(new Spark(blueFlyingSaber.x, GROUND_Y));
           }
        }
        ctx.save();
        ctx.translate(blueFlyingSaber.x, blueFlyingSaber.y);
        ctx.rotate(blueFlyingSaber.rot * Math.PI/180);
        drawSaber(ctx, -27, 0, 27, 0, '#00aaff', 'rgba(0,170,255,0.6)');
        ctx.restore();
      }

      drawStickman(ctx, red);
      drawStickman(ctx, blue);
      
      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      if (dialogueState.showRed || dialogueState.showBlue) {
        drawBubble(ctx, dialogueState.x, dialogueState.y, dialogueState.text, dialogueState.progress);
      }

      ctx.restore();
    }

    const loop = () => {
      if (!isPlaying) return;
      renderFrame(currentFrame);
      currentFrame += slowMoFactor;
      animationFrameId = requestAnimationFrame(loop);
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isPlaying && currentFrame === 0) {
        isPlaying = true;
        loop();
      }
    }, { threshold: 0.8 });

    // Assuming Contact section has an ID #contact, we observe it from document
    const contactNode = document.getElementById('contact');
    if (contactNode) observer.observe(contactNode);

    // Initial clear
    renderFrame(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      id="fight-canvas" 
      className="absolute bottom-0 left-0 w-full z-[100] mix-blend-screen pointer-events-none" 
      style={{ opacity: 0.85, height: '320px' }} // Height expanded slightly to prevent head clipping on tall screens
    />
  )
}
