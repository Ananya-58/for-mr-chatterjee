const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const initialContent = document.getElementById('initial-content');
const successContent = document.getElementById('success-content');
const music = document.getElementById('loveSong');
const heartBgContainer = document.getElementById('bg-hearts');

let slipCount = 0;

// 1. Background Big Hearts (Continuous)
function createBigHearts() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's';
    if(heartBgContainer) heartBgContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createBigHearts, 800);

// 2. The "Slip and Grow" Logic
noBtn.addEventListener('mouseover', () => {
    if (slipCount < 6) {
        slipCount++;
        
        // Move the No button
        const x = Math.max(50, Math.random() * (window.innerWidth - 150));
        const y = Math.max(50, Math.random() * (window.innerHeight - 100));
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;

        // Grow Yes button proportionally
        let newScale = 1 + (slipCount * 0.8); 
        yesBtn.style.transform = `scale(${newScale})`;
    } 
    
    // THE TRAP: On the 7th attempt (slipCount is 6)
    if (slipCount >= 6) {
        yesBtn.classList.add('full-screen-takeover');
        yesBtn.innerHTML = "Just Say Yes! 😠"; // Updated message
        noBtn.style.display = 'none'; 
    }
});

// 3. The Final Celebration
yesBtn.addEventListener('click', () => {
    // Hide everything else
    initialContent.style.display = 'none';
    yesBtn.style.display = 'none';
    
    // Show "I LOVE YOU Mr. Chatterjee"
    successContent.classList.remove('hidden');
    
    // Play the romantic music
    if (music) {
        music.play().catch(e => console.log("Music waiting for user..."));
    }

    // Start raining hearts and flowers
    setInterval(createRain, 150);
});

// 4. Rain Animation Function
function createRain() {
    const item = document.createElement('div');
    item.innerHTML = Math.random() > 0.5 ? '🌹' : '❤️';
    item.style.position = 'fixed';
    item.style.top = '-50px';
    item.style.left = Math.random() * 100 + 'vw';
    item.style.fontSize = Math.random() * 20 + 20 + 'px';
    item.style.zIndex = '10000';
    item.style.pointerEvents = 'none';
    
    document.body.appendChild(item);

    const fall = item.animate([
        { transform: 'translateY(0vh) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 }
    ], { 
        duration: Math.random() * 2000 + 3000,
        easing: 'linear'
    });

    fall.onfinish = () => item.remove();
}