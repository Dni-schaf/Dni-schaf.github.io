const images = document.querySelectorAll('.dia');
        let currentImage = 0;

        function changeImage() {
            
            setTimeout(() => {
                images[currentImage].classList.remove('active');
                images[currentImage].classList.add('before');
                beforimage = currentImage;
                currentImage = (currentImage + 1) % images.length;
                images[currentImage].classList.remove('next');
                images[currentImage].classList.add('active');
                setTimeout(() => {
                    images[beforimage].classList.remove('before');
                    images[beforimage].classList.add('next');
                }, 1000);

            }, 1000);
        }
        setInterval(changeImage, 3000);
