document.addEventListener('DOMContentLoaded', function() {
  const points = document.querySelectorAll('.vendor-point');
  const tooltip = document.getElementById('tooltip');
  const mapContainer = document.querySelector('.map-container');

  // Check if elements exist
  if (!points.length || !tooltip || !mapContainer) {
    console.error("Required elements not found!");
    return;
  }

  points.forEach(point => {
    point.addEventListener('mouseenter', function() {
      const description = this.getAttribute('data-description');
      if (!description) return;

      // Set tooltip content
      tooltip.textContent = description;
      tooltip.style.display = 'block';

      // Get positions
      const pointRect = this.getBoundingClientRect();
      const mapRect = mapContainer.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth;

      // Calculate positions relative to map container
      const leftPosition = pointRect.left - mapRect.left + (this.offsetWidth / 2);
      const topPosition = pointRect.top - mapRect.top + this.offsetHeight + 5;

      // Center tooltip horizontally
      let tooltipLeft = leftPosition - (tooltipWidth / 2);

      // Adjust if tooltip goes outside map container
      if (tooltipLeft < 0) {
        tooltipLeft = 5;
      } else if (tooltipLeft + tooltipWidth > mapRect.width) {
        tooltipLeft = mapRect.width - tooltipWidth - 5;
      }

      // Set tooltip position
      tooltip.style.left = `${tooltipLeft}px`;
      tooltip.style.top = `${topPosition}px`;
    });

    point.addEventListener('mouseleave', function() {
      tooltip.style.display = 'none';
    });
  });
});