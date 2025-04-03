/**
 * Dynamically loads and displays essays from the essays.json file.
 * Essays are sorted by date with newest first.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading essays...');
    loadEssays();
});

/**
 * Main function to load and display essays
 */
function loadEssays() {
    const container = document.getElementById('essay-list');
    if (!container) {
        console.error('Essay list container not found');
        return;
    }

    // Load essays from the JSON file
    fetch('essays.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load essays.json: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(essays => {
            console.log(`Loaded ${essays.length} essays from essays.json`);
            
            if (essays.length === 0) {
                container.innerHTML = '<li>No essays found. Add some essays to the essays directory.</li>';
                return;
            }
            
            // Essays are already sorted by date in the JSON
            renderEssays(container, essays);
        })
        .catch(error => {
            console.error('Error loading essays:', error);
            container.innerHTML = `
                <li class="error-message">
                    <p>Failed to load essays: ${error.message}</p>
                    <p>Make sure that essays.json exists and is valid. You can generate it by running:</p>
                    <pre>node generate-essays-json.js</pre>
                </li>
            `;
        });
}

/**
 * Render the essays to the container
 */
function renderEssays(container, essays) {
    container.innerHTML = ''; // Clear existing content
    
    essays.forEach(essay => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'essay-template.html';
        a.className = 'essay-link';
        a.setAttribute('data-essay', essay.id);
        
        // Title
        const titleSpan = document.createElement('span');
        titleSpan.className = 'essay-title';
        titleSpan.textContent = essay.title;
        a.appendChild(titleSpan);
        
        // Date
        const timeElem = document.createElement('time');
        const date = new Date(essay.date);
        timeElem.setAttribute('datetime', essay.date);
        timeElem.textContent = date.toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });
        a.appendChild(timeElem);
        
        // Tags
        if (essay.tags && essay.tags.length > 0) {
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'tags';
            
            essay.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tagsDiv.appendChild(tagSpan);
            });
            
            a.appendChild(tagsDiv);
        }
        
        li.appendChild(a);
        container.appendChild(li);
    });
    
    console.log(`Rendered ${essays.length} essays`);
    
    // Add event listeners to essay links
    document.querySelectorAll('.essay-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const essayId = this.getAttribute('data-essay');
            if (essayId) {
                localStorage.setItem('selectedEssay', essayId);
                window.location.href = this.getAttribute('href');
            }
        });
    });
} 