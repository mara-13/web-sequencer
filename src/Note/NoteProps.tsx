export default interface NoteProps {
  context: AudioContext;
  merger: ChannelMergerNode;
  type: OscillatorType;
  volume: number;
  frequency: number;
}
