// Main JavaScript file that initializes everything
import { initFullpage } from './fullpage-config.js';
import { initEmailHandler } from './email-handler.js';

document.addEventListener('DOMContentLoaded', function() {
    initFullpage();
    initEmailHandler();
});
