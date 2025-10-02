document.addEventListener('DOMContentLoaded', () => {
    // --- Required Elements ---
    const bootScreen = document.getElementById('boot-screen');
    const bootOutput = document.getElementById('boot-output');
    const terminalContainer = document.getElementById('terminal-container');
    
    // --- INTRO ANIMATION SECTION ---
    const bootMessages = [
        'Initializing connection...',
        'Establishing secure channel...',
        'Memory check: 32768MB OK',
        'Loading kernel modules... [OK]',
        'Mounting file systems... [OK]',
        'Starting network service... [OK]',
        'Authenticating user...',
        'Welcome, guest.',
        'Boot sequence complete. Loading portfolio...'
    ];
    let messageIndex = 0;

    function showBootMessage() {
        if (messageIndex < bootMessages.length) {
            const p = document.createElement('p');
            p.textContent = bootMessages[messageIndex];
            bootOutput.appendChild(p);
            window.scrollTo(0, document.body.scrollHeight);
            messageIndex++;
            setTimeout(showBootMessage, Math.random() * 350 + 150);
        } else {
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                bootScreen.style.transition = 'opacity 0.5s ease-out';
                terminalContainer.style.display = 'block';
                initializeTerminal();
                setTimeout(() => bootScreen.remove(), 500);
            }, 1000);
        }
    }

    // --- MAIN TERMINAL SECTION ---
    function initializeTerminal() {
        const input = document.getElementById('input');
        const output = document.getElementById('output');
        let commandHistory = [];
        let historyIndex = -1;
        let isTyping = false;

        // *** NEW: Animation Frames ***
        const asciiFrame1 = `<pre id="ascii-art"> ██████╗  ██████╗ ██╗  ██╗███████╗██████╗ \n██╔═══██╗██╔════╝ ██║ ██╔╝██╔════╝██╔══██╗\n██║   ██║╚██████╗ █████╔╝ █████╗  ██████╔╝\n██║   ██║ ╚═══██║██╔═██╗ ██╔══╝  ██╔══██╗\n╚██═══██╝██████╔╝ ██║ ╚██╗███████╗██║  ██║\n ╚═════╝ ╚═════╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝</pre>`;
        const asciiFrame2 = `<pre id="ascii-art"> ██████╗  ██████╗ ██╗  ██╗███████╗██████╗ \n██╔═══██╗██╔════╝ ██║ ██╔╝██╔════╝██╔══██╗\n██║   ██║╚██████╗ █████╔╝ █████╗  ██████╔╝\n██║   ██║ ╚═══██║██╔═██╗ ██╔══╝  ██╔══██╗\n╚██═══██╝██████╔╝ ██║ ╚██╗█ █████╗██║  ██║\n ╚═════╝ ╚═════╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝</pre>`;
        const asciiFrame3 = `<pre id="ascii-art"> ██████╗  ██████╗ ██╗  ██╗███████╗██████╗ \n██╔═══██╗█ ╔════╝ ██║ ██╔╝██╔════╝██╔══██╗\n██║   ██║╚██████╗ █████╔╝ █████╗  ██████╔╝\n██║   ██║ ╚═══██║██╔═██╗ ██╔══╝  ██╔══██╗\n╚██═══██╝██████╔╝ ██║ ╚██╗███████╗██║  ██║\n ╚═════╝ ╚═════╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝</pre>`;
        const asciiFrames = [asciiFrame1, asciiFrame2, asciiFrame3];
        let currentFrame = 0;
        
        terminalContainer.addEventListener('click', () => {
            if (!isTyping) input.focus();
        });

        input.addEventListener('keydown', (e) => {
            if (isTyping) return;
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[commandHistory.length - 1 - historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[commandHistory.length - 1 - historyIndex];
                } else {
                    historyIndex = -1;
                    input.value = '';
                }
            } else if (e.key === 'Enter') {
                const command = input.value.trim().toLowerCase();
                printToOutput(`<span class="prompt">guest@portfolio:~$</span> ${command}`, false);
                if (command) commandHistory.push(command);
                historyIndex = -1;
                handleCommand(command);
                input.value = '';
            }
        });

        function typeWriter(element, text, callback) {
            let i = 0;
            element.innerHTML = "";
            isTyping = true;
            input.disabled = true;
            function type() {
                if (i < text.length) {
                    if (text.charAt(i) === '<') {
                        const endIndex = text.indexOf('>', i);
                        element.innerHTML += text.substring(i, endIndex + 1);
                        i = endIndex;
                    } else {
                        element.innerHTML += text.charAt(i);
                    }
                    i++;
                    setTimeout(type, 20);
                } else {
                    isTyping = false;
                    input.disabled = false;
                    input.focus();
                    if (callback) callback();
                }
            }
            type();
        }

        function printToOutput(text, useTypewriter = true, callback) {
            const p = document.createElement('p');
            output.appendChild(p);
            if (useTypewriter) {
                typeWriter(p, text, callback);
            } else {
                p.innerHTML = text;
                if (callback) callback();
            }
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
        }
        
        function handleCommand(command) {
            switch (command) {
                case 'root':
                    printToOutput("Access granted. Loading CV...", true, () => {
                        setTimeout(() => window.location.href = 'cv.html', 500);
                    });
                    break;
                case 'help':
                    const helpText = `
<span class="help-command">root</span>      - <span class="help-description">Access the main page (CV).</span>
<span class="help-command">fetch</span>     - <span class="help-description">Displays summary information.</span>
<span class="help-command">projects</span>  - <span class="help-description">Lists my main projects.</span>
<span class="help-command">social</span>    - <span class="help-description">Shows social media links.</span>
<span class="help-command">whoami</span>    - <span class="help-description">Displays a short bio.</span>
<span class="help-command">clear</span>     - <span class="help-description">Clears the terminal screen.</span>`;
                    // *** CORRECTION: The ‘help’ command now loads instantly. ***
                    printToOutput(helpText, false);
                    break;
                case 'fetch':
                    const fetchInfo = `<pre>
<span style="color: #00ffff;">          -</span>          <span style="color: #00ffff;">User:</span> <span style="color: #cccccc;">Full Name</span>
<span style="color: #00ffff;">          .</span>          <span style="color: #00ffff;">University:</span> <span style="color: #cccccc;">University</span>
<span style="color: #00ffff;">         / \\</span>         <span style="color: #00ffff;">Field:</span> <span style="color: #cccccc;">Field</span>
<span style="color: #00ffff;">        / _ \\</span>        <span style="color: #00ffff;">OS:</span> <span style="color: #cccccc;">OS and Programming Languages</span>
<span style="color: #00ffff;">       |.o_o.|</span>       <span style="color: #00ffff;">Shell:</span> <span style="color: #cccccc;">bash, zsh</span>
<span style="color: #00ffff;">       |:_/ |</span>       
<span style="color: #00ffff;">      //   \\ \\</span>      
<span style="color: #00ffff;">     (|     | )</span>     
<span style="color: #00ffff;">    /'\\_   _/'\\</span>    
<span style="color: #00ffff;">    \\___)=(___/</span></pre>`;
                    printToOutput(fetchInfo, false);
                    break;
                case 'projects':
                    const projectsText = `
<span class="help-command">Project 1:</span>
<span class="help-description">> Description of Project 1</span>
<span class="help-command">Project 2:</span>
<span class="help-description">> Description of Project 2</span>`;
                    printToOutput(projectsText, false);
                    break;
                case 'whoami':
                    printToOutput("Who Am I short brief");
                    break;
                case 'social':
                    const socialLinks = `
<a href="https://www.linkedin.com/in/emre-sudi-ulker-17b2a1325/" target="_blank">LinkedIn</a>
<a href="https://ctf.hackthebox.com/user/profile/901399" target="_blank">Hack The Box</a>
<a href="https://github.com/osker35" target="_blank">Github</a>`;
                    printToOutput(socialLinks, false);
                    break;
                case 'clear':
                    // When cleaning, preserve the first frame and ID of the animation
                    output.innerHTML = asciiFrame1;
                    break;
                 default:
                    if (command) {
                        printToOutput(`bash: command not found: ${command}`);
                    }
                    break;
            }
        }

        // --- Terminal Start ---
        output.innerHTML = asciiFrames[0];
        const welcomeMessage = "Welcome to my portfolio. Type 'root' to enter.<br>Type 'help' for available commands.";
        printToOutput(welcomeMessage);

        // *** Animation Loop ***
        setInterval(() => {
            const artElement = document.querySelector('#ascii-art');
            if (artElement) {
                currentFrame = (currentFrame + 1) % asciiFrames.length;
                const newContent = asciiFrames[currentFrame].match(/<pre id="ascii-art">([\s\S]*)<\/pre>/)[1];
                artElement.innerHTML = newContent;
            }
        }, 1000); // Changes in every 1 second
    }

    // --- Start Everything ---
    showBootMessage();
});