/**
 * Stub for three/webgpu - allows build to resolve when three npm doesn't ship webgpu build.
 * Used only for import resolution; three-globe may use WebGL path instead.
 */
import { BufferAttribute } from 'three';

export class StorageInstancedBufferAttribute extends BufferAttribute {
  constructor(arrayOrCount, itemSize, count) {
    const isCountFirst = typeof arrayOrCount === 'number';
    const array = isCountFirst ? new Float32Array(arrayOrCount * itemSize) : arrayOrCount;
    const c = count ?? (isCountFirst ? arrayOrCount : array.length / itemSize);
    super(array instanceof Float32Array ? array : new Float32Array(array), itemSize, false);
    this.count = c;
  }
}

export class WebGPURenderer {
  constructor() {
    this.isWebGPURenderer = true;
  }
  async computeAsync() {
    throw new Error('WebGPU not available - use WebGL features only');
  }
  getArrayBufferAsync() {
    return Promise.reject(new Error('WebGPU not available'));
  }
}
