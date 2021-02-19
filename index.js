/**
 *
 * @param {string} type 震动波形类别 sine|square|triangle|sawtooth
 * @param {string} value 音调
 * @param {number} delay 音量0-1 时间
 * @param {number} fade 音量1-0 时间
 */
function music(type, value, delay, fade) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = type;
  oscillator.frequency.value = value;
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + delay);
  oscillator.start(audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + fade
  );
  oscillator.stop(audioCtx.currentTime + fade);
}
