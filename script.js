document.addEventListener('DOMContentLoaded', function () {
  const points = document.querySelectorAll('.vendor-point');
  const tooltip = document.getElementById('tooltip');
  const mapContainer = document.querySelector('.map-container');

  // Check if elements exist
  if (!points.length || !tooltip || !mapContainer) {
    console.error("Required elements not found!");
    return;
  }

  points.forEach(point => {
    point.addEventListener('mouseenter', function () {
      const description = this.getAttribute('data-description');
      const imageUrl = this.getAttribute('data-image');
      if (!description) return;

      // Clear any previous content in the tooltip
      tooltip.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.flexDirection = 'column'; // Stack image and text vertically
      wrapper.style.gap = '8px';

      // Only show image if 'data-image' is not 'none'
      if (imageUrl && imageUrl !== 'none') {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = '';
        img.style.width = '260px';  // Fixed size for the image
        img.style.height = 'auto'; // Fixed size for the image
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px';
        wrapper.appendChild(img);
      }

      const text = document.createElement('span');
      text.textContent = description;
      wrapper.appendChild(text);
      tooltip.appendChild(wrapper);

      tooltip.style.display = 'block';

      // Wait for the image to load before positioning the tooltip
      const pointRect = this.getBoundingClientRect();
      const mapRect = mapContainer.getBoundingClientRect();

      // Calculate the position to place the tooltip above the point
      const leftPosition = pointRect.left - mapRect.left + (this.offsetWidth / 2);
      const topPosition = pointRect.top - mapRect.top - tooltip.offsetHeight - 10; // Position above the point

      let tooltipLeft = leftPosition - (tooltip.offsetWidth / 2);

      // Adjust tooltip position if it goes outside the map container
      if (tooltipLeft < 0) {
        tooltipLeft = 5;
      } else if (tooltipLeft + tooltip.offsetWidth > mapRect.width) {
        tooltipLeft = mapRect.width - tooltip.offsetWidth - 5;
      }

      tooltip.style.left = `${tooltipLeft}px`;
      tooltip.style.top = `${topPosition}px`;
    });

    point.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
      tooltip.innerHTML = ''; // Clear content when hiding
    });
  });
});