document.getElementById('funFactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    function formatFact(fact) {
        const parts = fact.split(':');
        if (parts.length > 1) {
            return '<strong>' + parts[0] + ':</strong>' + parts.slice(1).join(':');
        }
        return fact;
    }

    const facts = [
        "Origin in Architecture: Universal design originated in the field of architecture. It was developed by architect Ronald Mace, who himself was a wheelchair user, emphasizing the creation of buildings and environments accessible to all people, regardless of their age, size, or ability.",
        "7 Principles: There are seven principles of universal design, which include equitable use, flexibility in use, simple and intuitive use, perceptible information, tolerance for error, low physical effort, and size and space for approach and use.",
        "Beyond Disability: While often associated with accessibility for people with disabilities, universal design actually benefits everyone. For example, curb cuts on sidewalks, while essential for wheelchairs, are also handy for strollers and luggage.",
        "Influence on Technology: Universal design has significantly influenced the development of technology, leading to features like closed captioning on TVs and voice-activated virtual assistants, which aid users of all abilities.",
        "Global Movement: Universal design is a global movement and has been adopted in many countries as part of their design standards and regulations, particularly in public buildings and transport systems.",
        "Sustainable Design: Universal design aligns with sustainable design principles by promoting the creation of spaces and products that remain usable and relevant across different life stages and abilities, reducing the need for modifications or replacements.",
        "Ongoing Evolution: As society's understanding of diversity and inclusion evolves, so does universal design. It continually adapts to new technologies, materials, and societal needs, making it a dynamic and ever-evolving field."
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('funFact').innerHTML = formatFact(randomFact);
});
