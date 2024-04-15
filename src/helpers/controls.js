// увеличвание скорости непрямолинейно, а с помощью ускорения через кривые бизье 
function easeOutQuad(x) {
	return 1 - (1 - x) * (1 - x);
}

export let controls = {};

// обработчики собывтия на нажатие клавиш
window.addEventListener("keydown", (e) => {
	controls[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
	controls[e.key.toLowerCase()] = false;
});

// максимальное изменение
let maxVelocity = 0.04;
// изменения относительно абсицы X
let jawVelocity = 0;
// изменения относительно ордина Y
let pitchVelocity = 0;
// скорость движения
let planeSpeed = 0.006;
// значение ускорения
export let turbo = 0;

// движение при различных нажатиях на клавиши
export function updatePlaneAxis(x, y, z, planePosition, camera) {
	// изменения движения

	jawVelocity *= 0.95;
	pitchVelocity *= 0.95;

	// ограничение движения скорости
	if (Math.abs(jawVelocity) > maxVelocity)
		jawVelocity = Math.sign(jawVelocity) * maxVelocity;

	if (Math.abs(pitchVelocity) > maxVelocity)
		pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

	if (controls["a"]) {
		jawVelocity += 0.0025;
	}

	if (controls["d"]) {
		jawVelocity -= 0.0025;
	}

	if (controls["w"]) {
		pitchVelocity -= 0.0025;
	}

	if (controls["s"]) {
		pitchVelocity += 0.0025;
	}

	if (controls["r"]) {
		jawVelocity = 0;
		pitchVelocity = 0;
		turbo = 0;
		x.set(1, 0, 0);
		y.set(0, 1, 0);
		z.set(0, 0, 1);
		planePosition.set(0, 3, 7);
	}

	//поворот векторов движения
	// изменяем векторы x и y относительно z
	x.applyAxisAngle(z, jawVelocity);
	y.applyAxisAngle(z, jawVelocity);

	y.applyAxisAngle(x, pitchVelocity);
	z.applyAxisAngle(x, pitchVelocity);

	// нормализация для того чтобы длина не изменилась
	x.normalize();
	y.normalize();
	z.normalize();


	// при нажатии на клавишу shift скорость увеличивается
	if (controls.shift) {
		turbo += 0.025;
	} else {
		turbo *= 0.95;
	}

	//увеличаем постепенно ускорение
	turbo = Math.min(Math.max(turbo, 0), 1);

	let turboSpeed = easeOutQuad(turbo) * 0.02;

	// при нажатии на клавишу shift будет также изменятся камера относительно нажатия на клавишу
	camera.fov = 45 + turboSpeed * 900;
	camera.updateProjectionMatrix();

	// обновляем положения плоскости вдоль оси z
	planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
}