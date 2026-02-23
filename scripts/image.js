const animals = [
    { name: 'tiger', index: 0 },
    { name: 'jaguar', index: 1 },
    { name: 'panda', index: 2 },
    { name: 'giraffe', index: 3 }
];

document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');

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
});
