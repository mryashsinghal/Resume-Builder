<div align="center">
  <img src="./resumeBuilder/logo.svg" alt="Logo" height="100">
</div>


Welcome to the Interactive Resume Builder project! This is an interactive resume-building application that utilizes Shepherd.js for guided tours. This project is perfect for individuals looking to create professional resumes with ease and for developers who want to learn how to integrate guided tours into their applications.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Create and customize professional resumes
- **Improved guided tour system** - Non-intrusive tour notifications for first-time users
- Manual tour access via prominent tour buttons
- Save and download resume as a PDF
- Edit and update resume information easily
- User-friendly and interactive interface
- **Smart tour management** - Tours only show for new users, with manual access for returning users

## Tour System

The application features an improved tour system that enhances user experience:

### For New Users
- **Subtle notifications** appear instead of automatic tour start
- Notifications auto-dismiss after 8 seconds
- Users can choose to start the tour or dismiss the notification

### For Returning Users
- **Manual tour buttons** are always available in the top-right corner
- No intrusive automatic tours
- Clean, uninterrupted experience

### Tour Features
- **Homepage Tour**: Guides users through the main features and navigation
- **Resume Editor Tour**: Shows how to use the resume building interface
- **Responsive Design**: Tours work seamlessly on all device sizes
- **Keyboard Shortcuts**: 
  - `Ctrl+Shift+T`: Reset homepage tour status (for testing)
  - `Ctrl+Shift+R`: Reset resume tour status (for testing)

### Tour Management
- Tour status is stored locally and persists across sessions
- Tour status is cleared on logout for fresh user experience
- Users can manually trigger tours anytime via the tour buttons

## Demo

Check out a live demo of the application by clicking the below image [![Screenshot 2024-01-21 192347](https://github.com/mryashsinghal/Resume-Builder/assets/152426138/54ac6a3e-031c-4065-9617-0d3273efd9b5)](https://youtu.be/upznrHXO-Dw?si=B1EpDP8iqVAwdYT6)

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/mryashsinghal/Resume-Builder.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd Resume-Builder/resumeBuilder
   ```
3. **Run HTML File:**
   ```sh
   index.html
   ```
   _Or if you are using a code editor like VS CODE, you can use live server extension_

## Usage

Once you have the application running locally:

1. **Create a Resume:**

   - Enter your personal information, education, work experience, and skills in the provided fields.
   - Use the guided tour to understand how to use each section effectively.

2. **Edit a Resume:**

   - Click on the section you want to edit and update the information.

3. **Save and Download:**
   - Once your resume is complete, save it and download it as a PDF.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. **Fork the Project:**
   ```sh
   git fork https://github.com/mryashsinghal/Resume-Builder.git
   ```
2. **Create your Feature Branch:**
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes:**
   ```sh
   git commit -m 'Add AmazingFeature'
   ```
4. **Push to the Branch:**
   ```sh
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Yash Singhal: https://www.linkedin.com/in/yash--singhal/

Project Link: [https://github.com/mryashsinghal/Resume-Builder](https://github.com/mryashsinghal/Resume-Builder)
