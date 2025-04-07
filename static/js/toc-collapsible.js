/**
 * Simple script to add collapsible functionality to the table of contents
 */
document.addEventListener('DOMContentLoaded', function() {
  // Find the TOC
  const toc = document.querySelector('.toc');
  if (!toc) return;
  
  // Find the header and content
  const tocHeader = toc.querySelector('.toc-header');
  const tocContent = toc.querySelector('.toc-content');
  
  if (!tocHeader || !tocContent) return;
  
  // Add click event listener
  tocHeader.addEventListener('click', function() {
    console.log('TOC header clicked'); // Debug log
    tocHeader.classList.toggle('collapsed');
    tocContent.classList.toggle('collapsed');
  });
  
  // Debug info
  console.log('TOC collapsible script loaded');
}); 