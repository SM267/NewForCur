class AnalogClock {
    constructor() {
        this.hourHand = document.getElementById('hour-hand');
        this.minuteHand = document.getElementById('minute-hand');
        this.secondHand = document.getElementById('second-hand');
        this.digitalTime = document.getElementById('digital-time');
        
        this.init();
    }
    
    init() {
        this.updateClock();
        // Update every second
        setInterval(() => this.updateClock(), 1000);
        
        // Add smooth animation class to second hand after initial load
        setTimeout(() => {
            this.secondHand.classList.add('smooth');
        }, 100);
    }
    
    updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Calculate angles for each hand
        const secondAngle = (seconds * 6) - 90; // 6 degrees per second, -90 to start at 12
        const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90; // 6 degrees per minute + smooth seconds
        const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // 30 degrees per hour + smooth minutes
        
        // Apply rotations
        this.secondHand.style.transform = `rotate(${secondAngle}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
        
        // Update digital time display
        this.updateDigitalTime(now);
    }
    
    updateDigitalTime(date) {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        const timeString = date.toLocaleTimeString('en-US', options);
        const dateString = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        this.digitalTime.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 5px;">${timeString}</div>
            <div style="font-size: 14px; opacity: 0.8;">${dateString}</div>
        `;
    }
}

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AnalogClock();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    const clock = document.querySelector('.clock');
    
    // Add click effect
    clock.addEventListener('click', () => {
        clock.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clock.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Add keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            // Toggle between 12-hour and 24-hour format
            const digitalTime = document.getElementById('digital-time');
            const is24Hour = digitalTime.dataset.format === '24';
            digitalTime.dataset.format = is24Hour ? '12' : '24';
        }
    });
});