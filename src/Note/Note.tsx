import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import NoteProps from "./NoteProps";
import './Note.scss';

const Note = forwardRef((props: NoteProps, ref: ForwardedRef<unknown>) => {
  // audio context setup
  const context = props.context;
  const oscNode = context.createOscillator();
  const gainNode = context.createGain();
  const frequency = props.frequency;
  const volume = props.volume;

  // note settings
  const noteLength_ms: number = 1000;

  // css hooks
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(false);

  // audio setup
  gainNode.connect(props.merger);
  oscNode.connect(gainNode);

  // initialize oscillator type and frequency and set volume to 0 before first play
  oscNode.type = props.type;
  oscNode.frequency.setValueAtTime(frequency, context.currentTime);
  gainNode.gain.setValueAtTime(0, props.context.currentTime);

  oscNode.start();

  const playOneShot = (volume: number) => {
    setPlaying(true);
    gainNode.gain.setValueAtTime(volume, context.currentTime);
    setTimeout(() => {stop();}, noteLength_ms);
  }

  const stop = () => {
    gainNode.gain.setValueAtTime(0, context.currentTime);
    setPlaying(false);
  }

  const toggleActive = () => {
    setActive(currentState => !currentState);
  }

  useImperativeHandle(ref, () => {
    return {
      play: () => {playOneShot(volume);},
      stop: () => {stop();},
      active: active
    }
  });

  return (
    <button onClick={() => {toggleActive(); stop();}} className={(active ? 'active ' : '') + (playing ? 'playing ' : '') }>helloRef</button>
  );
});

export default Note;