import assert from "node:assert/strict";
import test from "node:test";
import * as heroProgress from "./hero-progress.ts";

const { calculateScrollProgress, progressToVideoTime } = heroProgress;

const geometry = {
  sectionTop: 80,
  sectionHeight: 3000,
  stickyHeight: 920,
  stickyTop: 80,
};

test("calculates normalized progress across the sticky scroll distance", () => {
  assert.equal(calculateScrollProgress({ ...geometry, scrollY: 0 }), 0);
  assert.equal(calculateScrollProgress({ ...geometry, scrollY: 1040 }), 0.5);
  assert.equal(calculateScrollProgress({ ...geometry, scrollY: 2080 }), 1);
});

test("clamps progress before and after the hero", () => {
  assert.equal(calculateScrollProgress({ ...geometry, scrollY: -200 }), 0);
  assert.equal(calculateScrollProgress({ ...geometry, scrollY: 2400 }), 1);
});

test("maps normalized progress to a safe video time", () => {
  assert.equal(progressToVideoTime(0.5, 8), 4);
  assert.equal(progressToVideoTime(-1, 8), 0);
  assert.equal(progressToVideoTime(2, 8), 8);
  assert.equal(progressToVideoTime(0.5, Number.NaN), 0);
});

test("defers a new video seek while the previous seek is active", () => {
  assert.equal(typeof heroProgress.decideVideoSeek, "function");

  assert.equal(
    heroProgress.decideVideoSeek({
      currentTime: 1,
      targetTime: 2,
      isSeeking: true,
      minimumDelta: 1 / 60,
    }),
    "defer",
  );
  assert.equal(
    heroProgress.decideVideoSeek({
      currentTime: 1,
      targetTime: 2,
      isSeeking: false,
      minimumDelta: 1 / 60,
    }),
    "seek",
  );
  assert.equal(
    heroProgress.decideVideoSeek({
      currentTime: 1,
      targetTime: 1.005,
      isSeeking: false,
      minimumDelta: 1 / 60,
    }),
    "skip",
  );
});

test("skips invalid and redundant targets even during an active seek", () => {
  for (const targetTime of [Number.NaN, Number.POSITIVE_INFINITY, 1, 1.005]) {
    assert.equal(
      heroProgress.decideVideoSeek({
        currentTime: 1,
        targetTime,
        isSeeking: true,
        minimumDelta: 1 / 60,
      }),
      "skip",
    );
  }
});
