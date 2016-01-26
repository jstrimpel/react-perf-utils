import { expect } from 'chai';
import path from 'path';
import fs from 'fs';
import PerfUtils from '../../lib/index';

const measurements = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'test', 'data.json'), 'utf8'));

describe('react-perf-utils', () => {
  it('should get the average render time', () => {
    expect(PerfUtils.getAvgRenderTime('Layout', measurements)).to.be.equal(0.4774999999999636);
  });

  it('should get the average mount time', () => {
    expect(PerfUtils.getAvgMountTime('Layout', measurements)).to.be.equal(1.3649999999999523);
  });

  it('should get the total render time', () => {
    expect(PerfUtils.getTotalRenderTime('Layout', measurements)).to.be.equal(0.9549999999999272);
  });

  it('should get the total mount time', () => {
    expect(PerfUtils.getTotalMountTime('Layout', measurements)).to.be.equal(2.7299999999999045);
  });
});