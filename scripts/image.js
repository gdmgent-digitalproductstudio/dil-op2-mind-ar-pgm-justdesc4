const animals = [
    { name: 'tiger', index: 0 },
    { name: 'jaguar', index: 1 },
    { name: 'panda', index: 2 },
    { name: 'giraffe', index: 3 }
];

// Download markers function
const downloadMarkers = async () => {
    const downloadBtn = document.getElementById('downloadMarkersButton');
    const originalText = downloadBtn.querySelector('.button__text').textContent;

    try {
        downloadBtn.disabled = true;
        downloadBtn.querySelector('.button__text').textContent = 'Preparing...';

        const zip = new JSZip();
        const markersFolder = zip.folder('markers');

        const markerFiles = [
            'target-0.jpg',
            'target-1.jpg',
            'target-2.jpg',
            'target-3.jpg'
        ];

        for (const file of markerFiles) {
            const response = await fetch(`./markers/${file}`);
            const blob = await response.blob();
            markersFolder.file(file, blob);
        }

        downloadBtn.querySelector('.button__text').textContent = 'Creating...';

        // Generate zip file
        const content = await zip.generateAsync({ type: 'blob' });

        // Create download link
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'markers.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        downloadBtn.querySelector('.button__text').textContent = 'Downloaded!';
        setTimeout(() => {
            downloadBtn.querySelector('.button__text').textContent = originalText;
            downloadBtn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error('Error downloading markers:', error);
        downloadBtn.querySelector('.button__text').textContent = 'Error!';
        setTimeout(() => {
            downloadBtn.querySelector('.button__text').textContent = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    }
};

const scene = document.querySelector('a-scene');

// Setup download button
const downloadBtn = document.getElementById('downloadMarkersButton');
downloadBtn.addEventListener('click', downloadMarkers);

scene.addEventListener('loaded', () => {
    animals.forEach(animal => {
        const target = document.querySelector(`a-entity[mindar-image-target="targetIndex: ${animal.index}"]`);
        const button = document.getElementById(`${animal.name}Button`);
        const audio = document.getElementById(`${animal.name}Sound`);

        target.addEventListener('targetFound', () => {
            button.style.display = 'block';
        });

        target.addEventListener('targetLost', () => {
            button.style.display = 'none';
        });

        button.addEventListener('click', () => {
            audio.currentTime = 0;
            audio.play();
        });
    });
});