/**
 * Dynamically loads and displays essays from markdown files.
 * This script categorizes essays based on their tags and renders them.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading essays...');
    loadEssays();
});

// Essay data structure - maps to actual markdown files
const essays = [
    { 
        id: 'sample-essay', 
        title: 'Sample Essay With Mathematics',
        date: '2023-01-01',
        tags: ['Mathematics', 'Data Visualization', 'Example']
    },
    { 
        id: 'sample-tech-essay', 
        title: 'Sample Technology Essay',
        date: '2023-02-01',
        tags: ['Technology', 'Web Development', 'Programming']
    },
    { 
        id: 'sample-philosophy-essay', 
        title: 'Sample Philosophy Essay',
        date: '2023-03-01',
        tags: ['Philosophy', 'Ethics', 'Epistemology']
    }
];

/**
 * Main function to load and display essays
 */
function loadEssays() {
    const container = document.querySelector('main article');
    if (!container) {
        console.error('Essay container not found');
        return;
    }

    // Remove existing hardcoded sections
    const existingSections = container.querySelectorAll('.essay-category');
    existingSections.forEach(section => section.remove());
    
    // Get existing heading and intro paragraph
    const heading = container.querySelector('h1');
    const intro = heading ? heading.nextElementSibling : null;
    
    // Group essays by primary tag (first tag in the array)
    const categories = {};
    
    essays.forEach(essay => {
        if (essay.tags && essay.tags.length > 0) {
            const primaryTag = essay.tags[0];
            if (!categories[primaryTag]) {
                categories[primaryTag] = [];
            }
            categories[primaryTag].push(essay);
        }
    });
    
    // Sort categories alphabetically
    const sortedCategories = Object.keys(categories).sort();
    
    // Create and append sections for each category
    sortedCategories.forEach(category => {
        const section = document.createElement('section');
        section.className = 'essay-category';
        
        const h2 = document.createElement('h2');
        h2.textContent = category;
        section.appendChild(h2);
        
        const ul = document.createElement('ul');
        ul.className = 'essay-list';
        
        // Sort essays within this category by date (newest first)
        categories[category]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(essay => {
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
                
                // Tags (excluding the primary/category tag)
                const tagsDiv = document.createElement('div');
                tagsDiv.className = 'tags';
                
                essay.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag;
                    tagsDiv.appendChild(tagSpan);
                });
                
                a.appendChild(tagsDiv);
                li.appendChild(a);
                ul.appendChild(li);
            });
        
        section.appendChild(ul);
        container.appendChild(section);
    });
    
    console.log(`Loaded ${essays.length} essays in ${sortedCategories.length} categories`);
    
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