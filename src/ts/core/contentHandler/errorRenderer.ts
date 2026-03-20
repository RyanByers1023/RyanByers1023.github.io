const ERROR_CONTAINER_CLASSES = 'text-center py-16';
const ERROR_TEXT_CLASSES = 'text-red-600';

export function generateErrorHTML(message: string): string {
    return `
        <div class='${ERROR_CONTAINER_CLASSES}'>
            <p class='${ERROR_TEXT_CLASSES}'>${message}</p>
        </div>
    `;
}
