# Cybersecurity Interactive Terminal Portfolio

[Portfolio Demo GIF](https://github.com/osker35/portfolio-website/blob/main/demo.gif?raw=true) 
This is not your average portfolio. It's an immersive, interactive terminal experience designed to showcase my skills in web development and my passion for cybersecurity. The entire site is built to mimic a retro BASH terminal, complete with a system boot-up sequence and custom commands.

## ✨ Features

* **Animated Boot-Up Intro:** A realistic BIOS/boot sequence that runs before the terminal loads.
* **Interactive Terminal:** A fully functional terminal interface built with vanilla JavaScript.
* **Animated ASCII Art Header:** A continuously animating "glitch" effect on the "OSKER" ASCII art title.
* **Custom Commands:** A variety of commands to explore my profile, skills, and projects.
* **Typewriter Effect:** Command outputs are typed out character-by-character for a realistic feel.
* **Command History:** Navigate through your previously entered commands using the Up/Down arrow keys.
* **Dark-Themed CV Page:** The `root` command grants access to a clean, modern, dark-themed CV page.
* **Pure Vanilla JS:** No frameworks or external libraries (except for the optional Typewriter.js). Lightweight and fast.

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3**
* **Vanilla JavaScript (ES6+)**

---

## 🚀 Getting Started

To run this project locally:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/](https://github.com/)osker35/portfolio-website.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd portfolio-website
    ```
3.  Open the `index.html` file in your favorite web browser.

---

## 👨‍💻 Available Commands

The terminal accepts the following commands:

| Command    | Description                                          |
| :--------- | :--------------------------------------------------- |
| `root`     | Grants access and redirects to the full CV page.     |
| `help`     | Displays a list of all available commands.           |
| `fetch`    | Shows a summary of my profile with a cool ASCII art. |
| `whoami`   | Prints a short biography.                            |
| `social`   | Displays my social and professional links.           |
| `projects` | Lists my key projects and their descriptions.        |
| `clear`    | Clears the terminal screen, keeping the header art.  |

---

## 🎨 Customization

Want to fork this and make it your own? Here’s how:

* **Intro Sequence:** Modify the `bootMessages` array at the top of `script.js`.
* **ASCII Art & Animation:** The `asciiFrame1`, `asciiFrame2`, etc., constants in `initializeTerminal()` within `script.js` hold the animation frames. You can generate your own ASCII art and create new frames.
* **Command Outputs:** All command responses can be found and edited inside the `handleCommand` function in `script.js`.
* **CV Details:** All personal information, experience, and skills can be edited directly in the `cv.html` file.

---

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.
