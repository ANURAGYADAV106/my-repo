export function now(req) {
  if (process.env.TEST_MODE === "1") {
    const fakeTime = req.headers["x-test-now-ms"];
    if (fakeTime) return Number(fakeTime);
  }
  return Date.now();
}
