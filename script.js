document.getElementById('startCountdown').addEventListener('click', () => {
    const year = document.getElementById('yearInput').value;
    if (!year || year < 2023 || year > 2100) {
      alert('Please enter a valid year between 2023 and 2100.');
      return;
    }
  
    // Fetch Ramadan date for the given year
    fetch(`https://api.aladhan.com/v1/gToHCalendar/${year}/9`) // 9 is the month of Ramadan
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data); // Log the API response
        const ramadanStartDate = data.data[0].gregorian.date; // Get the Gregorian date for the start of Ramadan
        console.log('Ramadan Start Date:', ramadanStartDate); // Log the Ramadan start date
  
        // Reformat the date from DD-MM-YYYY to YYYY-MM-DD
        const [day, month, year] = ramadanStartDate.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        const ramadanDate = new Date(formattedDate);
        console.log('Parsed Ramadan Date:', ramadanDate); // Log the parsed Ramadan date
  
        startCountdown(ramadanDate);
      })
      .catch((error) => {
        console.error('Error fetching Ramadan date:', error);
        alert('An error occurred. Please try again.');
      });
  });
  
  function startCountdown(ramadanDate) {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = ramadanDate.getTime() - now;
  
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  
      if (timeRemaining < 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = '<h2>Ramadan Mubarak! 🌙</h2>';
      }
    }, 1000);
  }