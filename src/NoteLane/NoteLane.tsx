import './NoteLane.scss'
import Note from '../Note/Note';
import { useRef, useState } from 'react';

function NoteLane() {
  // audio setup
  const actx = new AudioContext();
  const merger = actx.createChannelMerger();
  merger.connect(actx.destination);

  // note sequencer setup
  const notes = [useRef(), useRef(), useRef()];
  let currentNoteIndex = 0;
  let playback: number;
  let playing: boolean = false;
  const tempo_ms: number = 1000;
  const [playingCSS, setPlayingCSS] = useState(false);

  const play = () => { 
    if (!playing) {
      playing = true;
      if (notes[currentNoteIndex].current.active) {
        notes[currentNoteIndex].current.play();
      }
      currentNoteIndex = (currentNoteIndex + 1) % notes.length;
      playback = setInterval(() => {
        if (notes[currentNoteIndex].current.active) {
          notes[currentNoteIndex].current.play();
        }
        currentNoteIndex = (currentNoteIndex + 1) % notes.length;
      }, tempo_ms);
      // setPlayingCSS(true);
    }
  }

  const stop = () => {
    playing = false;
    for (const note of notes) {
      note.current.stop();
    }
    clearInterval(playback);
    currentNoteIndex = 0;
    // setPlayingCSS(false);
  };

  return (
    <>
      <button onClick={play} className={playingCSS ? 'playOn' : ''}>PLAY</button>
      <button onClick={stop}>STOP</button>
      <Note ref={notes[0]} context={actx} type='sine' volume={.2} frequency={440} merger={merger}/>
      <Note ref={notes[1]} context={actx} type='sine' volume={.2} frequency={550} merger={merger}/>
      <Note ref={notes[2]} context={actx} type='sine' volume={.2} frequency={660} merger={merger}/>
    </>
  );
}
export default NoteLane;