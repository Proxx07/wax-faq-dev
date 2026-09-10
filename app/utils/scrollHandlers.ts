export const scrollDirectionTracker = () => {
  let lastTouchY: number | null = null;
  return (e: TouchEvent | WheelEvent): 'up' | 'down' | undefined => {
    let delta: number;

    if ('deltaY' in e) {
      delta = e.deltaY;
    }
    else {
      if (!e.touches[0]) return;
      const y = e.touches[0].clientY;
      delta = lastTouchY === null ? 0 : lastTouchY - y;
      lastTouchY = y;
    }
    if (delta === 0) return;
    lastTouchY = null;
    return delta > 0 ? 'down' : 'up';
  };
};
