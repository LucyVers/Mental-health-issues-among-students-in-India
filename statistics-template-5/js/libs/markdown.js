// Simple markdown to HTML converter
import addToPage from './addToPage.js';

// Convert markdown headings to HTML
function convertHeadings(text) {
    return text
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^###### (.*$)/gm, '<h6>$1</h6>');
}

// Convert markdown paragraphs to HTML
function convertParagraphs(text) {
    const lines = text.split('\n');
    let inParagraph = false;
    let html = '';

    lines.forEach(line => {
        // Skip if line is a heading or empty
        if (line.startsWith('#') || line.trim() === '') {
            if (inParagraph) {
                html += '</p>\n';
                inParagraph = false;
            }
            html += line + '\n';
        } else {
            // Handle paragraphs
            if (!inParagraph) {
                html += '<p>';
                inParagraph = true;
            }
            html += line + ' ';
        }
    });

    if (inParagraph) {
        html += '</p>\n';
    }

    return html;
}

// Convert markdown to HTML
function markdownToHtml(markdown) {
    let html = markdown;
    
    // Convert headings
    html = convertHeadings(html);
    
    // Convert paragraphs
    html = convertParagraphs(html);
    
    // Pass through HTML divs unchanged
    html = html.replace(/<div.*?>.*?<\/div>/gs, match => match);
    
    return html;
}

// Add markdown content to page
export function addMdToPage(markdown) {
    const html = markdownToHtml(markdown);
    addToPage(html);
} 