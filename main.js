const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const ampmElement = document.getElementById('ampm');
        const dayElement = document.getElementById('day');
        const dateElement = document.getElementById('date');
        const yearElement = document.getElementById('year');
        const timezoneElement = document.getElementById('timezone');
        const themeToggle = document.getElementById('themeToggle');
        const format12Btn = document.getElementById('format12');
        const format24Btn = document.getElementById('format24');
        const pauseBtn = document.getElementById('pauseBtn');
        const alarmBtn = document.getElementById('alarmBtn');
        const body = document.body;
        
        // Configuration
        let is24HourFormat = false;
        let isPaused = false;
        let isDarkTheme = true;
        let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Days and months arrays
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Initialize
        timezoneElement.textContent = userTimezone;
        
        // Update time function
        function updateTime() {
            if (isPaused) return;
            
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            // Handle 12/24 hour format
            let ampm = 'AM';
            if (!is24HourFormat) {
                ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;
            }
            
            const hoursStr = hours.toString().padStart(2, '0');
            
            // Update time with animation if changed
            updateWithAnimation(hoursElement, hoursStr);
            updateWithAnimation(minutesElement, minutes);
            updateWithAnimation(secondsElement, seconds);
            ampmElement.textContent = ampm;
            
            // Update date
            dayElement.textContent = days[now.getDay()];
            dateElement.textContent = `${now.getDate()} ${months[now.getMonth()]}`;
            yearElement.textContent = now.getFullYear();
        }
        
        // Update element with animation if value changed
        function updateWithAnimation(element, newValue) {
            if (element.textContent !== newValue) {
                element.classList.add('digit-change');
                element.textContent = newValue;
                setTimeout(() => {
                    element.classList.remove('digit-change');
                }, 500);
            }
        }
        
        // Theme toggle
        themeToggle.addEventListener('click', () => {
            isDarkTheme = !isDarkTheme;
            
            if (isDarkTheme) {
                body.classList.remove('day-mode');
                body.classList.add('night-mode');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.classList.remove('night-mode');
                body.classList.add('day-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
        
        // Format toggle
        format12Btn.addEventListener('click', () => {
            is24HourFormat = false;
            format12Btn.classList.add('active');
            format24Btn.classList.remove('active');
            ampmElement.style.display = 'block';
            updateTime();
        });
        
        format24Btn.addEventListener('click', () => {
            is24HourFormat = true;
            format24Btn.classList.add('active');
            format12Btn.classList.remove('active');
            ampmElement.style.display = 'none';
            updateTime();
        });
        
        // Pause button
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseBtn.innerHTML = isPaused 
                ? '<i class="fas fa-play"></i> Resume' 
                : '<i class="fas fa-pause"></i> Pause';
        });
        
        // Alarm button
        alarmBtn.addEventListener('click', () => {
            alert('Alarm feature would be implemented in a full version!');
        });
        
        // Initialize and start clock
        updateTime();
        setInterval(updateTime, 1000);
   
        
