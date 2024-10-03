export function getTempoMs(bpm: number): number {
  return 60000 / bpm 
}

// tracks mouse position. needed for Firefox compatibility - https://bugzilla.mozilla.org/show_bug.cgi?id=505521
/* eslint-disable prefer-const */
export let mouse = {
  x: 0,
  y: 0
}