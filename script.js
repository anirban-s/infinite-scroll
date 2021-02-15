const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

// Unsplash API
let count = 5
const apiKey = "R79wTLfY8dgqyd9uS-5UJtzeNJD5uqIHmvjjSxmiA-I"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//  Check if all images were loaded
function imageLoaded() {
	imagesLoaded++
	if (imagesLoaded === totalImages) {
		loader.hidden = true
		ready = true
		count = 30
	}
}

// Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}

// Create Elements for the links
function displayPhotos() {
	imagesLoaded = 0
	totalImages = photosArray.length
	// Run function for each object in photoArray
	photosArray.forEach((photo) => {
		// Create <a> element
		const item = document.createElement("a")
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		})
		// Create <img> element
		const img = document.createElement("img")
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		})
		// Event listener check when each is finished loading
		img.addEventListener("load", imageLoaded)

		// Put the img inside <a> and put both in image container
		item.appendChild(img)
		imageContainer.appendChild(item)
	})
}

//  Get Photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl)
		photosArray = await response.json()
		displayPhotos()
	} catch (error) {
		// Catch Error
	}
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false
		getPhotos()
	}
})

// On Load
getPhotos()
