/**
 * Reads --flip-duration from the card element's computed style and converts
 * it to milliseconds. CSS is the single source of truth for this value.
 *
 * Handles both "0.8s" and "800ms" formats.
 */
export function readFlipDurationMs(card: HTMLElement): number {
    const raw = getComputedStyle(card).getPropertyValue('--flip-duration').trim();

    if (raw.endsWith('ms')) return parseFloat(raw);
    if (raw.endsWith('s'))  return parseFloat(raw) * 1000;

    console.warn(`Unexpected --flip-duration format: "${raw}", falling back to 800ms`);
    return 800;
}