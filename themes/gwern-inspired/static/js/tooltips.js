document.addEventListener('DOMContentLoaded', function() {
  // Find all tooltip elements
  const tooltips = document.querySelectorAll('.tooltip');
  
  // Process each tooltip
  tooltips.forEach(function(tooltip) {
    const text = tooltip.getAttribute('data-tooltip');
    
    // Create the tooltip container and content
    const container = document.createElement('span');
    container.className = 'tooltip-container';
    
    // Add the original content
    container.innerHTML = tooltip.innerHTML;
    
    // Add a small info icon after the text
    const infoIcon = document.createElement('sup');
    infoIcon.innerHTML = ' ℹ';
    infoIcon.className = 'tooltip-icon';
    container.appendChild(infoIcon);
    
    // Create tooltip text element
    const tooltipText = document.createElement('span');
    tooltipText.className = 'tooltip-text';
    // Use innerHTML instead of textContent to support HTML in tooltips
    tooltipText.innerHTML = text;
    
    // Add tooltip content to container
    container.appendChild(tooltipText);
    
    // Replace the original element with the tooltip container
    tooltip.parentNode.replaceChild(container, tooltip);
  });
}); 