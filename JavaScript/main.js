// เลือก element ดาวทั้งหมดมาเก็บไว้
const stars = document.querySelectorAll(".star");
// เอาไว้โชว์ค่าดาวที่กด
const rating = document.getElementById("rating");
// ช่องให้พิม รีวิว
const reviewText = document.getElementById("review");
// ปุ่มกดยืนยัน
const submitBtn = document.getElementById("submit");
// ที่เก็บรีวิวที่ถูกส่งมา
const reviewsContainer = document.getElementById("reviews");

// วนลูปให้ทุกดาวกดได้
stars.forEach((star) => {
	star.addEventListener("click", () => {
		// เอาค่าดาวจาก data-value ที่กดมา
		const value = parseInt(star.getAttribute("data-value"));
		// โชว์ว่ากดกี่ดาว
		rating.innerText = value;

		// ลบสีเก่าของดาวออกก่อน
		stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five"));

		// ใส่สีให้ดาวตามค่าที่กด
		stars.forEach((s, index) => {
			if (index < value) {
				s.classList.add(getStarColorClass(value));
			}
		});

		// ลบคลาส selected เดิมออก
		stars.forEach((s) => s.classList.remove("selected"));
		// ใส่ selected ให้ดาวที่กด
		star.classList.add("selected");
	});
});

// เวลากดยืนยันรีวิว
submitBtn.addEventListener("click", () => {
	const review = reviewText.value; // เอาข้อความรีวิวที่พิม
	const userRating = parseInt(rating.innerText); // เอาค่าดาว

	// เช็คว่ามีพิมรีวิวกับเลือกดาวรึยัง
	if (!userRating || !review) {
		alert("ใส่รีวิวให้ครบก่อนกดยืนยัน");
		return;
	}

	if (userRating > 0) {
		// สร้างกล่อง div เอาไว้เก็บรีวิวใหม่
		const reviewElement = document.createElement("div");
		reviewElement.classList.add("review");
		reviewElement.innerHTML = 
`<p><strong>Rating: ${userRating}/5</strong></p><p>${review}</p>`;
		reviewsContainer.appendChild(reviewElement);

		// รีเซ็ตค่าใหม่หลังจากส่งรีวิวแล้ว
		reviewText.value = "";
		rating.innerText = "0";
		stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five", "selected"));
	}
});

// ฟังก์ชันเลือกสีของดาว ตามจำนวนที่กด
function getStarColorClass(value) {
	switch (value) {
		case 1:
			return "one";
		case 2:
			return "two";
		case 3:
			return "three";
		case 4:
			return "four";
		case 5:
			return "five";
		default:
			return "";
	}
}
