const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img_area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
});

async function fetchColorPalette() {
	const url = 'http://colormind.io/api/';
	const requestBody = {
	  model: "default",
	  input: [[0, 0, 0], "N", "N", "N", "N"]
	};
  
	try {
	  const response = await fetch(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	  });
  
	  if (!response.ok) throw new Error(`Error: ${response.status}`);
	  
	  const data = await response.json();
	  console.log('Color Palette:', data.result);
	  displayColorPalette(data.result); 
	} catch (error) {
	  console.error('Failed to fetch palette:', error);
	}
  }

  function displayColorPalette(colors) {
	const paletteContainer = document.getElementById('palette');
	paletteContainer.innerHTML = ''; 
  
	colors.forEach(color => {
	  const colorDiv = document.createElement('div');
	  colorDiv.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	  colorDiv.classList.add('color-box');
	  paletteContainer.appendChild(colorDiv);
	});
  }
