const HTML_EXT_PATTERN = /\.html$/i;

function idFromFile(file: string): string {
    const filename = file.split('/').pop() || file;
    return filename.replace(HTML_EXT_PATTERN, '');
}

/**
 * Parses an HTML string and extracts a target section element.
 * Prefers a section whose id matches the filename, falls back to the given selector.
 */
export function parseSection(html: string, file: string, fallbackSelector: string): Element | null {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    return temp.querySelector(`#${idFromFile(file)}`) ||
        temp.querySelector(fallbackSelector);
}
