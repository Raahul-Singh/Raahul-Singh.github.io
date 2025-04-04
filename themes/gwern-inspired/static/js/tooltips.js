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
    
    // Add hover events for desktop
    container.addEventListener('mouseenter', function() {
      tooltipText.classList.add('tooltip-visible');
    });
    
    container.addEventListener('mouseleave', function() {
      tooltipText.classList.remove('tooltip-visible');
    });
    
    // Add click events for mobile compatibility
    container.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check if this tooltip is already open
      const isOpen = tooltipText.classList.contains('tooltip-visible');
      
      // Close all open tooltips first
      document.querySelectorAll('.tooltip-text.tooltip-visible').forEach(function(tip) {
        if (tip !== tooltipText) {
          tip.classList.remove('tooltip-visible');
        }
      });
      
      // Toggle this tooltip
      tooltipText.classList.toggle('tooltip-visible');
      
      // Stop propagation to prevent document click from immediately closing it
      e.stopPropagation();
    });
    
    // Close tooltip when clicking elsewhere
    document.addEventListener('click', function() {
      tooltipText.classList.remove('tooltip-visible');
    });
    
    // Replace the original element with the tooltip container
    tooltip.parentNode.replaceChild(container, tooltip);
  });
}); 