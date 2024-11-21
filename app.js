// Predefined users
const predefinedUsers = [
    { username: 'Farida Sarhank', password: 'Farida', fullName: 'Farida Sarhank', email: 'farida@example.com', dob: '1995-01-01' },
    { username: 'Yassin Abdelrazek', password: 'Yassin', fullName: 'Yassin Abdelrazek', email: 'yassin@example.com', dob: '1994-02-02' },
    { username: 'Yasmeen Waleed', password: 'Yasmeen', fullName: 'Yasmeen Waleed', email: 'yasmeen@example.com', dob: '1993-03-03' },
    { username: 'Menna Emam', password: 'Menna', fullName: 'Menna Emam', email: 'menna@example.com', dob: '1992-04-04' },
    { username: 'Nour Bahaa', password: 'Nour', fullName: 'Nour Bahaa', email: 'nour@example.com', dob: '1991-05-05' },
    { username: 'Jolie Khaled', password: 'Jolie', fullName: 'Jolie Khaled', email: 'jolie@example.com', dob: '1990-06-06' }
  ];
 
  // Predefined plant history
let plantHistory = JSON.parse(localStorage.getItem('plantHistory')) || [
  {
      name: 'Rose',
      readings: {
          temperature: 22.5,
          moisture: 45.3,
          pH: 6.8,
          humidity: 50.1,
      },
      removedAt: '2024-11-01 10:00 AM',
  },
  {
      name: 'Cactus',
      readings: {
          temperature: 30.1,
          moisture: 15.0,
          pH: 7.2,
          humidity: 20.3,
      },
      removedAt: '2024-10-20 03:45 PM',
  },
  {
      name: 'Sunflower',
      readings: {
          temperature: 25.0,
          moisture: 55.0,
          pH: 6.5,
          humidity: 60.0,
      },
      removedAt: '2024-10-10 08:30 AM',
  },
];

// Function to update localStorage with plant history
function updatePlantHistory() {
  localStorage.setItem('plantHistory', JSON.stringify(plantHistory));
}

 
  // Retrieve or set up user database
  let userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [...predefinedUsers];
 
 
  // Update localStorage with the user database
  function updateLocalStorage() {
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
  }
 
 
  function generateImages() {
    const imagePaths = ['./Images/1.png', './Images/2.png', './Images/3.png', './Images/4.png', './Images/5.png', './Images/6.png'];
 
 
    const numberOfImages = 10; // Number of images to be placed on the screen
 
 
    for (let i = 0; i < numberOfImages; i++) {
      imagePaths.forEach((path, index) => {
        const img = document.createElement('img');
        img.src = path;
        img.className = 'background-image';
 
 
        // Calculate positions to evenly spread images
        const topPosition = (i + index * numberOfImages) % 100;
        const leftPosition = (i * numberOfImages + index) % 100;
 
 
        img.style.position = 'absolute';
        img.style.top = `${topPosition}vh`;
        img.style.left = `${leftPosition}vw`;
        document.body.appendChild(img);
      });
    }
  }
 
  generateImages();
 
 
  // Handle login functionality
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
 
 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
 
 
    const user = userDatabase.find(user => user.username === username && user.password === password);
 
 
    if (!user) {
      errorMessage.textContent = 'Invalid username or password. Please try again.';
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
      welcomeUser(user);
    }
  });
 
 
  // Add event listener to the "Create One" button
  document.getElementById('create-one-btn').addEventListener('click', showRegistrationForm);
 
 
  // Show Registration Form when "Create One" is clicked
  function showRegistrationForm() {
    document.body.innerHTML = `
        <div class="registration-container">
            <h2>Create Account</h2>
            <form id="registration-form">
                <input type="text" id="new-username" placeholder="Username" required>
                <input type="password" id="new-password" placeholder="Password" required>
                <input type="text" id="new-full-name" placeholder="Full Name" required>
                <input type="email" id="new-email" placeholder="Email" required>
                <input type="date" id="new-dob" required>
                <button type="submit">Create Account</button>
                <button id="back-to-login-btn" type="button">Back to Login</button>
                <p id="registration-error-message"></p>
            </form>
        </div>
    `;
 
 
    document.getElementById('back-to-login-btn').addEventListener('click', function() {
      window.location.reload();
    });
 
 
    document.getElementById('registration-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('new-username').value;
      const password = document.getElementById('new-password').value;
      const fullName = document.getElementById('new-full-name').value;
      const email = document.getElementById('new-email').value;
      const dob = document.getElementById('new-dob').value;
 
 
      if (userDatabase.some(user => user.username === username)) {
        document.getElementById('registration-error-message').textContent = 'Username already exists. Choose another one.';
        return;
      }
 
 
      const newUser = { username, password, fullName, email, dob };
      userDatabase.push(newUser);
      updateLocalStorage();
      alert('Account created successfully!');
      window.location.reload();
    });
  }
 
 
  // Utility to get the currently logged-in user
  function getCurrentUser() {
    const username = localStorage.getItem('currentUser');
    return userDatabase.find(user => user.username === username);
  }
 
 
  // Function to handle successful login and show plant selection
  function welcomeUser(user) {
    localStorage.setItem('currentUser', user.username);
    showPlantSelection();
  }
 
 
  const predefinedPlants = ['Rose', 'Tulip', 'Sunflower', 'Orchid', 'Fern', 'Cactus', 'Bonsai', 'Aloe Vera', 'Lavender', 'Mint', 'Other'];
 
 
  let userPlants = [];
 
 
  /// Adjusted showPlantSelection function to transition to location selection
  function showPlantSelection() {
    const currentUser = getCurrentUser();
 
 
    document.body.innerHTML = `
        <div class="plant-selection-container">
            <h2>Welcome, ${currentUser.fullName}!</h2>
            <h3>Select Your Plant</h3>
            <form id="plant-selection-form">
                <select id="plant-list">
                    ${predefinedPlants.map(plant => `<option value="${plant}">${plant}</option>`).join('')}
                </select>
                <input type="text" id="custom-plant" placeholder="Enter custom plant name" style="display:none;">
                <button type="submit">Submit</button>
            </form>
            <p id="selection-message"></p>
            <p id="error-message" style="color: red; display: none;"></p>
        </div>
    `;


    const plantList = document.getElementById('plant-list');
    const customPlantInput = document.getElementById('custom-plant');
 
 
      // Show custom input field if "Other" is selected
      plantList.addEventListener('change', function() {
        if (this.value === 'Other') {
            customPlantInput.style.display = 'block';
        } else {
            customPlantInput.style.display = 'none';
        }
    });
 
 
 
 
    // Handle plant selection submission
    document.getElementById('plant-selection-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedPlant = plantList.value === 'Other' ? customPlantInput.value.trim() : plantList.value; // Trim whitespace
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none'; // Reset error message visibility
 
 
 
 
        // Convert selectedPlant to lowercase for case-insensitive comparison
        const lowerCaseSelectedPlant = selectedPlant.toLowerCase();
       
        // Check if the "Other" option is selected before checking for duplicates
        if (plantList.value === 'Other' && predefinedPlants.some(plant => plant.toLowerCase() === lowerCaseSelectedPlant)) {
            errorMessage.textContent = `Error: This plant name already exists. Please choose it from the list.`;
            errorMessage.style.display = 'block'; // Show error message
        } else {
            document.getElementById('selection-message').textContent = `You have selected: ${selectedPlant}`;
                // Delay before moving to the location selection window
      setTimeout(() => {
        showLocationSelection();
    }, 500); // Adjust delay time (500ms) as needed
        }
 
        userPlants.push(selectedPlant);
 
 
      }
    )};
 
 
  function showLocationSelection() {
    const egyptLocations = [
      'Cairo', 'Alexandria', 'Gizeh', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'al-Mansura', 'El-Mahalla El-Kubra', 'Tanta',
      'Asyut', 'Ismailia', 'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'al-Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada',
      '6th of October City', 'Shibin El Kom', 'Banha', 'Kafr el-Sheikh', 'Arish', 'Mallawi', '10th of Ramadan City', 'Bilbais',
      'Marsa Matruh', 'Mit Ghamr', 'Al-Hamidiyya', 'Desouk', 'Qalyub', 'Abu Kabir', 'Kafr el-Dawwar', 'Girga', 'Akhmim', 'Matareya'
    ];
 
 
    document.body.innerHTML = `
      <div class="location-selection-container">
        <h3>Select Your Location</h3>
        <form id="location-selection-form">
          <select id="location-list">
            ${egyptLocations.map(location => `<option value="${location}">${location}</option>`).join('')}
          </select>
          <h3>Indoor or Outdoor?</h3>
          <select id="indoor-outdoor-list">
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <p id="location-selection-message"></p>
      </div>
    `;
 
 
    const locationForm = document.getElementById('location-selection-form');
    locationForm.onsubmit = null; // Clear any existing event listeners to prevent duplication
 
 
    locationForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const selectedLocation = document.getElementById('location-list').value;
      const indoorOutdoor = document.getElementById('indoor-outdoor-list').value;
 
 
      // Save selected location and type (Indoor/Outdoor) to localStorage or user profile as needed
      const user = getCurrentUser();
      user.location = selectedLocation;
      user.type = indoorOutdoor;
      updateLocalStorage();
 
 
      document.getElementById('location-selection-message').textContent = `You have selected: ${selectedLocation}, ${indoorOutdoor}`;
      showDashboard(); // Ensure this calls the correct function
    });
  }
 
 
  function showRemovePlant() {
    document.body.innerHTML = `
      <div class="remove-plant-container">
        <h2>Select a Plant to Remove</h2>
        <ul class="plant-list">
          ${userPlants.map((plant, index) => `
            <li>
              <h3>${plant}</h3>
              <button class="remove-btn" data-index="${index}">Remove</button>
            </li>
          `).join('')}
        </ul>
        <button id="back-to-dashboard-btn">Back to Dashboard</button>
      </div>
    `;
  
    // Add event listeners to each "Remove" button
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        removePlant(index);
      });
    });
  
    // Add event listener for "Back to Dashboard" button
    document.getElementById('back-to-dashboard-btn').addEventListener('click', showDashboard);
  }
  function removePlant(index) {
    const removedPlant = userPlants.splice(index, 1)[0]; // Remove plant from userPlants array
  
    // Add removed plant to plantHistory
    plantHistory.push({
      name: removedPlant,
      readings: { temperature: 0, moisture: 0, pH: 0, humidity: 0 }, // Default readings
      removedAt: new Date().toLocaleString(), // Timestamp
    });
  
    updatePlantHistory(); // Update plant history in localStorage
    alert(`${removedPlant} has been removed.`);
    showDashboard(); // Return to dashboard after removal
  }
    
 
 
 
  function showDashboard() {
    const currentUser = getCurrentUser();


    // Define plant conditions based on sensor readings
function calculatePlantStatus(plantReadings) {
  let status = 'Healthy';
  let satisfaction = 100;
  let nextWatering = 2; // Default next watering in 2 days
  let statusStyle = 'color: green; font-weight: normal;'; // Default to healthy


  const { temperature, moisture, pH, humidity } = plantReadings;


  // Initialize an array to store all the issues
  let issues = [];


// Check for temperature issues (Too Hot or Too Cold)
if (temperature < 15) {
  issues.push('Too Cold');
  satisfaction -= 20;
  statusStyle = 'color: blue; font-weight: bold;'; // Too Cold
} else if (temperature > 30) {
  issues.push('Too Hot');
  satisfaction -= 20;
  statusStyle = 'color: red; font-weight: bold;'; // Too Hot
}


// Check moisture level
if (moisture < 30) {
  issues.push('Needs Water');
  satisfaction -= 30;
  nextWatering = 1; // Needs water in 1 day
  statusStyle = 'color: red; font-weight: bold;'; // Needs water but not critical
}


// Check pH level
if (pH < 5.5 || pH > 7.5) {
  issues.push('pH Imbalance');
  satisfaction -= 20;
  statusStyle = 'color: red; font-weight: bold;'; // Unhealthy
}


// Check humidity level
if (humidity < 30) {
  issues.push('Low Humidity');
  satisfaction -= 10;
  statusStyle = 'color: red; font-weight: bold;'; // Needs attention but not critical
}


// Determine overall status based on accumulated issues
if (issues.length > 0) {
  status = issues.join(', ');
} else {
  status = 'Healthy';
}


if (satisfaction <= 30) {
  statusStyle = 'color: darkred; font-weight: bold;';
  status = 'Critical - Immediate Attention Needed!';
}


return { status, nextWatering, satisfaction, statusStyle, readings: plantReadings };
}






    document.body.innerHTML = `
        <div class="dashboard-container">
            <h2>Welcome, ${currentUser.fullName}!</h2>
            <div class="top-right-menu">
                <button id="bluetooth-btn" class="bluetooth-button">🔵 Bluetooth</button>
                <div id="bluetooth-dropdown" class="bluetooth-dropdown">
                    <ul>
                        <li class="bluetooth-option" id="soil-tester-btn">
                            Soil Tester
                            <span id="tick-sign" class="tick-sign" style="display:none;">✔️</span>
                        </li>
                        <li class="bluetooth-option">Yasmeen's AirPods</li>
                        <li class="bluetooth-option">WH-1000XM3</li>
                        <li class="bluetooth-option">TV</li>
                    </ul>
                </div>
            </div>
            <div class="plant-status-container">
                ${userPlants.map((plant, index) => {
                    return `
                        <div class="plant-status plant-container">
                            <h3>${plant}</h3>
                            <p>Status: ${'Select a soil tester for live readings'}</p>
                            <p>Next Watering: -</p>
                            <p>Satisfaction: -</p>
                        </div>
                    `;
                }).join('')}
            </div>
            <button id="register-new-plant-btn">+ Register a new plant</button>
            <button id="remove-plant-btn">- Remove a plant</button>
            <div class="feature-bar">
                <button id="plant-facts-btn">Plant Facts</button>
                <button id="home-btn">Home</button>
                <button id="settings-btn">Settings</button>
            </div>
        </div>
    `;


    // Function to generate random values within a specified range
    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }


    // Add functionality for the Bluetooth button
    const bluetoothBtn = document.getElementById('bluetooth-btn');
    const bluetoothDropdown = document.getElementById('bluetooth-dropdown');


    bluetoothDropdown.style.display = 'none'; // Initially hide dropdown


    bluetoothBtn.addEventListener('click', () => {
        const isDropdownVisible = bluetoothDropdown.style.display === 'block';
        bluetoothDropdown.style.display = isDropdownVisible ? 'none' : 'block';
    });


    // Hide dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!bluetoothBtn.contains(event.target) && !bluetoothDropdown.contains(event.target)) {
            bluetoothDropdown.style.display = 'none';
        }
    });


    // Event listener for Soil Tester button
    document.getElementById('soil-tester-btn').addEventListener('click', () => {
        // Show tick mark next to Soil Tester in Bluetooth menu
        document.getElementById('tick-sign').style.display = 'inline';


        // Simulate a delay before showing data
        setTimeout(() => {
            showSoilTester();
        }, 2000); // 2 second delay before data is shown
    });


// Function to show soil tester readings
function showSoilTester() {
  document.querySelector('.plant-status-container').innerHTML = userPlants.map((plant, index) => {
      // Simulate the random sensor readings for the selected plant
      const plantReadings = {
          temperature: getRandomInRange(18, 28),  // Simulated temperature (in Celsius)
          moisture: getRandomInRange(10, 100),   // Simulated moisture (%)
          pH: getRandomInRange(5, 8),            // Simulated pH
          humidity: getRandomInRange(30, 70)     // Simulated humidity (%)
      };


      const { status, nextWatering, satisfaction, statusStyle } = calculatePlantStatus(plantReadings);


      // Default visible container only shows status, next watering, and satisfaction
      return `
          <div class="plant-status plant-container" style="border: 2px solid #ddd; border-radius: 8px; padding: 15px; margin: 10px 0; background-color: #f9f9f9;" data-index="${index}">
              <h3 style="font-weight: bold; color: #2C3E50;">${plant}</h3>
              <p style="${statusStyle}; font-size: 16px;">Status: <strong>${status}</strong></p>
              <p style="font-weight: bold;">Next Watering: <span style="font-weight: normal;">In ${nextWatering} day(s)</span></p>
              <p style="font-weight: bold;">Satisfaction: <span style="font-weight: normal;">${satisfaction}%</span></p>
             
              <!-- Hidden details -->
              <div class="hidden-details" style="display: none; margin-top: 15px; background: #f3f3f3; border-radius: 8px; padding: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                  <p style="font-weight: bold; margin: 5px 0;">🌡️ Temperature: <span style="font-weight: normal;">${plantReadings.temperature.toFixed(1)}°C</span></p>
                  <p style="font-weight: bold; margin: 5px 0;">💧 Moisture: <span style="font-weight: normal;">${plantReadings.moisture.toFixed(1)}%</span></p>
                  <p style="font-weight: bold; margin: 5px 0;">🧪 pH: <span style="font-weight: normal;">${plantReadings.pH.toFixed(2)}</span></p>
                  <p style="font-weight: bold; margin: 5px 0;">💨 Humidity: <span style="font-weight: normal;">${plantReadings.humidity.toFixed(1)}%</span></p>
              </div>
          </div>
      `;
  }).join('');


  // Add event listeners to toggle details visibility
  document.querySelectorAll('.plant-container').forEach(container => {
      container.addEventListener('click', () => {
          const details = container.querySelector('.hidden-details');
          const isVisible = details.style.display === 'block';
          details.style.display = isVisible ? 'none' : 'block';


          // Add animation or focus styling when toggled
          if (!isVisible) {
              container.style.borderColor = '#4CAF50'; // Highlight border when expanded
          } else {
              container.style.borderColor = '#ddd'; // Revert to default border
          }
      });
  });
}






    // Add event listeners for other buttons
    document.getElementById('register-new-plant-btn').addEventListener('click', showPlantSelection);
    document.getElementById('settings-btn').addEventListener('click', showSettings);
    document.getElementById('home-btn').addEventListener('click', showDashboard);
    document.getElementById('remove-plant-btn').addEventListener('click', showRemovePlant);

}





function showSettings() {
  document.body.innerHTML = `
      <div class="settings-container">
          <h2>Settings</h2>
          <ul>
              <li><button id="manage-profile-btn">Manage Profile</button></li>
              <li><button id="language-btn">Language</button></li>
              <li><button id="mode-btn">Mode</button></li>
              <li><button id="history-btn">History</button></li>
              <li><button id="sign-out-btn">Sign Out</button></li>
              <li><button id="back-to-dashboard-btn">Back to Dashboard</button></li>
          </ul>
      </div>
  `;

  document.getElementById('manage-profile-btn').addEventListener('click', showManageProfile);
  document.getElementById('sign-out-btn').addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.reload();
  });
  document.getElementById('back-to-dashboard-btn').addEventListener('click', showDashboard);

  // Add event listener for the History button
  document.getElementById('history-btn').addEventListener('click', showHistory);
}


 
 

 
  // Show manage profile page
  function showManageProfile() {
      document.body.innerHTML = `
          <div class="manage-profile-container">
              <h2>Manage Profile</h2>
              <button id="add-image-btn">Add Image</button>
              <button id="change-username-btn">Change Username</button>
              <button id="change-password-btn">Change Password</button>
              <button id="back-to-settings-btn">Back to Settings</button>
          </div>
      `;
 
 
      document.getElementById('add-image-btn').addEventListener('click', addImagePage);
      document.getElementById('change-username-btn').addEventListener('click', editUsernamePage);
      document.getElementById('change-password-btn').addEventListener('click', editPasswordPage);
      document.getElementById('back-to-settings-btn').addEventListener('click', showSettings);
  }
 
  function showHistory() {
    document.body.innerHTML = `
        <div class="history-container">
            <h2>Plant History</h2>
            ${plantHistory.length > 0 ? plantHistory.map((entry, index) => `
                <div class="history-item" style="background: white; border: 1px solid #ddd; border-radius: 8px; margin: 15px; padding: 20px;">
                    <h3>${entry.name}</h3>
                    <p><strong>Removed At:</strong> ${entry.removedAt}</p>
                    <p><strong>Temperature:</strong> ${entry.readings.temperature.toFixed(1)}°C</p>
                    <p><strong>Moisture:</strong> ${entry.readings.moisture.toFixed(1)}%</p>
                    <p><strong>pH:</strong> ${entry.readings.pH.toFixed(2)}</p>
                    <p><strong>Humidity:</strong> ${entry.readings.humidity.toFixed(1)}%</p>
                </div>
            `).join('') : `<p>No history available yet.</p>`}
            <button id="back-to-settings-btn">Back to Settings</button>
        </div>
    `;

    // Add event listener for the "Back to Settings" button
    document.getElementById('back-to-settings-btn').addEventListener('click', showSettings);
}

 
  // Function to navigate to the username edit page
  function editUsernamePage() {
      document.body.innerHTML = `
          <div class="edit-container">
              <h2>Change Username</h2>
              <input type="text" id="new-username" placeholder="Enter new username" required>
              <button id="update-username-btn">Update Username</button>
              <button id="back-to-manage-profile-btn">Back to Manage Profile</button>
              <p id="username-error-message"></p>
          </div>
      `;
 
 
      document.getElementById('update-username-btn').addEventListener('click', function() {
          const newUsername = document.getElementById('new-username').value;
          if (newUsername) {
              const user = getCurrentUser();
              user.username = newUsername;
              updateLocalStorage();
              alert('Username updated successfully!');
              showManageProfile();
          } else {
              document.getElementById('username-error-message').textContent = 'Username cannot be empty.';
          }
      });
 
 
      document.getElementById('back-to-manage-profile-btn').addEventListener('click', showManageProfile);
  }
 
 
  // Function to navigate to the password edit page
  function editPasswordPage() {
      document.body.innerHTML = `
          <div class="edit-container">
              <h2>Change Password</h2>
              <input type="password" id="new-password" placeholder="Enter new password" required>
              <button id="update-password-btn">Update Password</button>
              <button id="back-to-manage-profile-btn">Back to Manage Profile</button>
              <p id="password-error-message"></p>
          </div>
      `;document.getElementById('update-password-btn').addEventListener('click', function() {
        const newPassword = document.getElementById('new-password').value;
        if (newPassword) {
            const user = getCurrentUser();
            user.password = newPassword;
            updateLocalStorage();
            alert('Password updated successfully!');
            showManageProfile();
        } else {
            document.getElementById('password-error-message').textContent = 'Password cannot be empty.';
        }
    });
 
 
    document.getElementById('back-to-manage-profile-btn').addEventListener('click', showManageProfile);
  }
 
 
  // Function to navigate to the add image page
  function addImagePage() {
    document.body.innerHTML = `
        <div class="edit-container">
            <h2>Add Image</h2>
            <input type="file" id="image-upload" accept="image/*" required>
            <button id="upload-image-btn">Upload Image</button>
            <button id="back-to-manage-profile-btn">Back to Manage Profile</button>
            <p id="image-error-message"></p>
        </div>
    `;
 
 
    document.getElementById('upload-image-btn').addEventListener('click', function() {
        const imageUpload = document.getElementById('image-upload').files[0];
        if (imageUpload) {
            const user = getCurrentUser();
            const reader = new FileReader();
            reader.onload = function(e) {
                user.image = e.target.result; // Save the image data URL to the user object
                updateLocalStorage();
                alert('Image uploaded successfully!');
                showManageProfile();
            };
            reader.readAsDataURL(imageUpload);
        } else {
            document.getElementById('image-error-message').textContent = 'Please select an image to upload.';
        }
    });
 
 
    document.getElementById('back-to-manage-profile-btn').addEventListener('click', showManageProfile);
  }
 
 
  // Utility to get the currently logged-in user
  function getCurrentUser() {
    const username = localStorage.getItem('currentUser');
    return userDatabase.find(user => user.username === username);
  }
 
 
  // Update localStorage with the user database
  function updateLocalStorage() {
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
  }


 
