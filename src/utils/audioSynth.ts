// Web Audio Ambient Synthesizer for FocusTrack Soundscape Mixer
class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private noiseNodes: Map<string, { gain: GainNode; source: AudioNode | null }> = new Map();
  private isMasterMuted = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Create subtle procedural pink/brown noise for rain or library hum
  private createNoiseNode(type: 'rain' | 'library' | 'binaural' | 'hearth', gainNode: GainNode) {
    const ctx = this.getContext();
    if (!ctx) return null;

    if (type === 'binaural') {
      // 40Hz binaural gamma pulse
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(40, ctx.currentTime); // 40Hz gamma rhythm
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);

      lfo.connect(lfoGain.gain);
      osc.connect(gainNode);
      osc.start();
      lfo.start();
      return osc;
    }

    // White/pink/brown noise generator for rain & library
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'rain') {
        // Brown noise filter
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      } else if (type === 'library') {
        // Gentle low pass air hum
        output[i] = (lastOut + 0.01 * white) / 1.01;
        lastOut = output[i];
        output[i] *= 1.2;
      } else {
        // Hearth crackle
        output[i] = Math.random() > 0.995 ? (Math.random() * 2 - 1) * 0.8 : (lastOut + 0.03 * white) / 1.03;
        lastOut = output[i];
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Apply lowpass filter for soothing tone
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(type === 'rain' ? 800 : type === 'library' ? 350 : 1200, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    whiteNoise.start();
    return whiteNoise;
  }

  public setChannelVolume(channelId: string, volume: number, enabled: boolean) {
    const ctx = this.getContext();
    if (!ctx) return;

    if (!this.noiseNodes.has(channelId)) {
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      const source = this.createNoiseNode(channelId as 'rain' | 'library' | 'binaural' | 'hearth', gainNode);
      this.noiseNodes.set(channelId, { gain: gainNode, source });
    }

    const item = this.noiseNodes.get(channelId);
    if (item) {
      const targetGain = !enabled || this.isMasterMuted ? 0 : (volume / 100) * 0.15;
      item.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    }
  }

  public setMasterMute(muted: boolean) {
    this.isMasterMuted = muted;
    const ctx = this.getContext();
    if (!ctx) return;
    this.noiseNodes.forEach(({ gain }, channelId) => {
      if (muted) {
        gain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      } else {
        // will be re-set by caller
      }
    });
  }

  public stopAll() {
    this.noiseNodes.forEach(({ gain }) => {
      if (this.ctx) {
        gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      }
    });
  }
}

export const soundEngine = new SoundscapeEngine();
