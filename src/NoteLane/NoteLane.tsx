import './NoteLane.scss'
import Note from '../Note/Note';
import { getTempoMs } from '../util';
import { useRef, useState } from 'react';
import { mouse } from '../util';

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
  // let tempo_bpm: number = 120;
  const [tempo_bpm, setTempoBPM] = useState(120);
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
      }, getTempoMs(tempo_bpm));
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

  const dragThreshold: number = 10;
  let dragStartY: number;
  let dragCurrentY: number;
  const tempoSelectStart = () => {
    dragStartY = mouse.y;
  }
  const tempoSelect = (e) => {
    e.preventDefault();
    dragCurrentY = mouse.y;
    const diff = dragCurrentY - dragStartY;
    if (diff > dragThreshold) {
      // tempo_bpm--;
      setTempoBPM((prevTempo) => prevTempo - 1);
      dragStartY = dragCurrentY;
      console.log(tempo_bpm);
    }
    if (diff < (dragThreshold * -1)) {
      // tempo_bpm++;
      setTempoBPM((prevTempo) => prevTempo + 1);
      dragStartY = dragCurrentY;
      console.log(tempo_bpm);
    }
  }

  return (
    <>
      <button onClick={play} className={playingCSS ? 'playOn' : ''}>PLAY</button>
      <button onClick={stop}>STOP</button>
      <button className="tempoSelect" draggable onDrag={tempoSelect} onMouseDown={tempoSelectStart}>{ tempo_bpm }</button>
      <Note ref={notes[0]} context={actx} type='sine' volume={.2} frequency={440} merger={merger}/>
      <Note ref={notes[1]} context={actx} type='sine' volume={.2} frequency={550} merger={merger}/>
      <Note ref={notes[2]} context={actx} type='sine' volume={.2} frequency={660} merger={merger}/>
    </>
  );
}
export default NoteLane;