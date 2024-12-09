const sectionSlider = (e: React.MouseEvent<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement>) => {
  const container = containerRef.current;
  if (!container) return;

  const startX = e.pageX - container.offsetLeft;
  const { scrollLeft } = container;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const x = moveEvent.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

export default sectionSlider;
