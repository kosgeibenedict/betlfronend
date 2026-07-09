const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app');
const appHtmlPath = path.join(srcDir, 'app.component.html');
const homeDir = path.join(srcDir, 'home');

if (!fs.existsSync(homeDir)) {
    fs.mkdirSync(homeDir);
}

const html = fs.readFileSync(appHtmlPath, 'utf8');

// Find nav
const navStart = html.indexOf('<nav');
const navEnd = html.indexOf('</nav>') + 6;
const nav = html.substring(navStart, navEnd);

// Find footer
const footerStart = html.indexOf('<footer');
const footerEnd = html.indexOf('</footer>') + 9;
const footer = html.substring(footerStart, footerEnd);

// Everything between nav and footer is the home content
const mainContent = html.substring(navEnd, footerStart);

const newAppHtml = `<div class="min-h-screen bg-betl-dark text-white overflow-hidden font-sans selection:bg-betl-cyan selection:text-black">
${nav}
<router-outlet></router-outlet>
${footer}
</div>`;

fs.writeFileSync(appHtmlPath, newAppHtml);
fs.writeFileSync(path.join(homeDir, 'home.component.html'), mainContent.trim());

console.log('Refactoring HTML complete.');
