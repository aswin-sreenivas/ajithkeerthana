// High-fidelity synthesized romantic ambient piano & string synthesizer for seamless playback
class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  // Romantic chord progression in F# minor / A major / D major / E major (warm, ethereal)
  private chords = [
    [220.00, 261.63, 329.63, 440.00, 523.25], // A Minor / Major 7th
    [174.61, 220.00, 261.63, 349.23, 440.00], // F Major 7th
    [146.83, 220.00, 293.66, 369.99, 440.00], // D Major 9th
    [164.81, 246.94, 329.63, 392.00, 493.88], // E Minor 7th
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      // Warm low-pass filter for cozy intimate ambient tone
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.masterGain.connect(this.filterNode);
      this.filterNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, delay = 0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + delay;

    // Oscillator 1 - Warm Sine fundamental
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscillator 2 - Soft Triangle harmonic
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.003, now); // Gentle chorus detune

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.14, now + 0.12);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + duration + 0.2);
    osc2.stop(now + duration + 0.2);
  }

  private playArpeggio() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    // Play chord tones with subtle arpeggiation
    chord.forEach((freq, idx) => {
      this.playTone(freq, 4.8, idx * 0.4);
    });

    // High melodic chime
    const highNote = chord[Math.floor(Math.random() * chord.length)] * 2;
    this.playTone(highNote, 3.2, 2.2);

    this.timerId = window.setTimeout(() => {
      this.playArpeggio();
    }, 4000);
  }

  public async start(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx) return false;
      this.isPlaying = true;
      this.playArpeggio();
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();

